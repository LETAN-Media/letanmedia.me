import React, { useState } from 'react';

const API_BASE = '/api/geo';

const PRESET_QUERIES = [
  { label: 'LETAN MEDIA', query: 'LETAN MEDIA' },
  { label: 'Letan Media', query: 'Letan Media' },
  { label: 'letanmedia.me', query: 'letanmedia.me' },
  { label: 'letanmedia.site', query: 'letanmedia.site' },
];

export default function WikidataSearch({ draft, onDuplicatesFound }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityDetail, setEntityDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q || q.length < 2) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setSelectedEntity(null);
    setEntityDetail(null);

    try {
      const res = await fetch(`${API_BASE}/wikidata/search?q=${encodeURIComponent(q)}&limit=20`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResults(data.results || []);
      if (data.error) setError(data.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (qid) => {
    setDetailLoading(true);
    setSelectedEntity(qid);
    setEntityDetail(null);

    try {
      const res = await fetch(`${API_BASE}/wikidata/entity/${qid}`);
      if (!res.ok) throw new Error('Failed to fetch entity');
      const data = await res.json();
      setEntityDetail(data.entity);
      if (data.error) setError(data.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="geo-search">
      <section className="geo-section">
        <h2>Tìm kiếm Wikidata</h2>
        <p className="geo-help">
          Tìm thực thể trên Wikidata. Chỉ đọc, không ghi.
        </p>

        <div className="geo-search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tên thực thể, domain, hoặc QID..."
            className="geo-input"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading || query.length < 2}
            className="geo-btn geo-btn-primary"
          >
            {loading ? 'Đang tìm...' : 'Tìm kiếm'}
          </button>
        </div>

        <div className="geo-presets">
          <span className="geo-presets-label">Tìm nhanh:</span>
          {PRESET_QUERIES.map(preset => (
            <button
              key={preset.query}
              onClick={() => {
                setQuery(preset.query);
                handleSearch(preset.query);
              }}
              className="geo-btn geo-btn-preset"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {error && (
        <div className="geo-error-inline">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <section className="geo-section">
          <h2>Kết quả ({results.length})</h2>
          <div className="geo-results-list">
            {results.map(result => (
              <div
                key={result.qid}
                className={`geo-result-item ${selectedEntity === result.qid ? 'selected' : ''}`}
              >
                <div className="geo-result-main">
                  <span className="geo-qid">{result.qid}</span>
                  <span className="geo-result-label">{result.label}</span>
                  <span className="geo-result-desc">{result.description}</span>
                </div>
                <div className="geo-result-actions">
                  <button
                    onClick={() => handleViewDetail(result.qid)}
                    className="geo-btn geo-btn-small"
                    disabled={detailLoading && selectedEntity === result.qid}
                  >
                    {detailLoading && selectedEntity === result.qid ? 'Đang tải...' : 'Xem chi tiết'}
                  </button>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="geo-btn geo-btn-small geo-btn-link"
                  >
                    Mở trên Wikidata
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {entityDetail && (
        <section className="geo-section">
          <h2>Chi tiết {entityDetail.qid}</h2>
          <div className="geo-entity-detail">
            <div className="geo-detail-grid">
              <div className="geo-field">
                <label>Labels</label>
                <div className="geo-value">
                  {Object.entries(entityDetail.labels || {}).map(([lang, label]) => (
                    <div key={lang}>
                      <span className="geo-lang">{lang}:</span> {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="geo-field">
                <label>Descriptions</label>
                <div className="geo-value">
                  {Object.entries(entityDetail.descriptions || {}).map(([lang, desc]) => (
                    <div key={lang}>
                      <span className="geo-lang">{lang}:</span> {desc}
                    </div>
                  ))}
                </div>
              </div>
              <div className="geo-field">
                <label>Aliases</label>
                <div className="geo-value">
                  {Object.entries(entityDetail.aliases || {}).map(([lang, aliases]) => (
                    <div key={lang}>
                      <span className="geo-lang">{lang}:</span> {aliases.join(', ')}
                    </div>
                  ))}
                </div>
              </div>
              <div className="geo-field">
                <label>Sitelinks ({entityDetail.sitelinksCount})</label>
                <div className="geo-value">
                  {Object.keys(entityDetail.sitelinks || {}).slice(0, 10).map(site => (
                    <span key={site} className="geo-tag">{site}</span>
                  ))}
                  {entityDetail.sitelinksCount > 10 && (
                    <span className="geo-more">+{entityDetail.sitelinksCount - 10}</span>
                  )}
                </div>
              </div>
              <div className="geo-field">
                <label>Claims ({Object.keys(entityDetail.claims || {}).length} properties)</label>
                <div className="geo-value">
                  {Object.entries(entityDetail.claims || {}).slice(0, 10).map(([propId, claims]) => (
                    <div key={propId} className="geo-claim-row">
                      <span className="geo-prop-id">{propId}</span>
                      <span className="geo-claim-count">{claims.length} value(s)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {results.length === 0 && !loading && !error && (
        <div className="geo-empty">
          Nhập từ khóa và nhấn Tìm kiếm để bắt đầu
        </div>
      )}
    </div>
  );
}

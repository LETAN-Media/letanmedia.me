import React, { useState } from 'react';

const API_BASE = '/api/geo';

const MATCH_TYPE_LABELS = {
  exact_match: 'Khớp chính xác',
  probable_match: 'Khớp có thể',
  possible_match: 'Có thể trùng',
  no_match: 'Không khớp',
};

const MATCH_TYPE_COLORS = {
  exact_match: '#dc2626',
  probable_match: '#ea580c',
  possible_match: '#ca8a04',
  no_match: '#16a34a',
};

export default function DuplicateDetection({ draft, duplicates, onDuplicatesFound }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastCheck, setLastCheck] = useState(null);

  const handleCheck = async () => {
    if (!draft?.entity) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/duplicates/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: draft.entity }),
      });
      if (!res.ok) throw new Error('Duplicate check failed');
      const data = await res.json();
      onDuplicatesFound(data.duplicates || []);
      setLastCheck(new Date().toISOString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceLabel = (score) => {
    if (score >= 80) return 'Rất cao';
    if (score >= 60) return 'Cao';
    if (score >= 40) return 'Trung bình';
    if (score >= 20) return 'Thấp';
    return 'Rất thấp';
  };

  return (
    <div className="geo-duplicates">
      <section className="geo-section">
        <h2>Phát hiện trùng lặp</h2>
        <p className="geo-help">
          Kiểm tra xem LETAN MEDIA đã có item trên Wikidata chưa.
          So sánh: normalized label, aliases, domains, official website, social handles, descriptions, sitelinks.
        </p>

        <div className="geo-check-actions">
          <button
            onClick={handleCheck}
            disabled={loading || !draft?.entity}
            className="geo-btn geo-btn-primary"
          >
            {loading ? 'Đang kiểm tra...' : 'Kiểm tra trùng lặp'}
          </button>
          {lastCheck && (
            <span className="geo-last-check">
              Kiểm tra lúc: {new Date(lastCheck).toLocaleString('vi-VN')}
            </span>
          )}
        </div>

        {draft?.entity && (
          <div className="geo-entity-info">
            <h3>Đối tượng kiểm tra</h3>
            <div className="geo-grid">
              <div className="geo-field">
                <label>Label</label>
                <div className="geo-value">{draft.entity.name}</div>
              </div>
              <div className="geo-field">
                <label>Aliases</label>
                <div className="geo-value">
                  {(draft.entity.aliases || []).join(', ') || 'Không có'}
                </div>
              </div>
              <div className="geo-field">
                <label>Domains</label>
                <div className="geo-value">
                  {(draft.entity.domains || []).map(d => d.url).join(', ')}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {error && (
        <div className="geo-error-inline">{error}</div>
      )}

      {duplicates.length > 0 && (
        <section className="geo-section">
          <h2>Kết quả ({duplicates.length} kết quả)</h2>
          <div className="geo-duplicate-table">
            <table>
              <thead>
                <tr>
                  <th>QID</th>
                  <th>Label</th>
                  <th>Description</th>
                  <th>Điểm</th>
                  <th>Loại khớp</th>
                  <th>Evidence</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {duplicates.map(dup => (
                  <tr key={dup.qid} className={`geo-match-${dup.matchType}`}>
                    <td>
                      <a
                        href={`https://www.wikidata.org/wiki/${dup.qid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="geo-qid-link"
                      >
                        {dup.qid}
                      </a>
                    </td>
                    <td>{dup.label}</td>
                    <td className="geo-desc-cell">{dup.description}</td>
                    <td>
                      <div className="geo-score-bar">
                        <div
                          className="geo-score-fill"
                          style={{
                            width: `${dup.score}%`,
                            backgroundColor: MATCH_TYPE_COLORS[dup.matchType] || '#666',
                          }}
                        />
                        <span className="geo-score-text">{dup.score}%</span>
                      </div>
                      <div className="geo-confidence">{getConfidenceLabel(dup.score)}</div>
                    </td>
                    <td>
                      <span
                        className="geo-match-badge"
                        style={{ backgroundColor: MATCH_TYPE_COLORS[dup.matchType] || '#666' }}
                      >
                        {MATCH_TYPE_LABELS[dup.matchType] || dup.matchType}
                      </span>
                    </td>
                    <td>
                      <div className="geo-evidence-list">
                        {(dup.evidence || []).map((e, i) => (
                          <span key={i} className="geo-evidence-item">{e}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <a
                        href={dup.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="geo-btn geo-btn-small"
                      >
                        Xem
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {duplicates.length === 0 && !loading && lastCheck && (
        <div className="geo-empty geo-success">
          Không tìm thấy item trùng lặp trên Wikidata
        </div>
      )}
    </div>
  );
}

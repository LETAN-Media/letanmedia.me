import React from 'react';

export default function EntityOverview({ draft, duplicates }) {
  if (!draft) return <div className="geo-empty">Chưa có dữ liệu draft</div>;

  const { entity, proposedStatements, duplicateResults } = draft;

  const domainItems = (entity.domains || []).map(d => (
    <div key={d.url} className="geo-domain-card">
      <div className="geo-domain-url">{d.url}</div>
      <div className="geo-domain-type">{d.label}</div>
    </div>
  ));

  const typeList = (entity.entityTypes || []).map(t => (
    <span key={t} className="geo-tag">{t}</span>
  ));

  const aliasList = (entity.aliases || []).map(a => (
    <span key={a} className="geo-alias">{a}</span>
  ));

  const duplicateItems = duplicates.length > 0 ? (
    <div className="geo-duplicate-list">
      {duplicates.slice(0, 5).map(d => (
        <div key={d.qid} className={`geo-duplicate-item geo-match-${d.matchType}`}>
          <span className="geo-qid">{d.qid}</span>
          <span className="geo-label">{d.label}</span>
          <span className="geo-score">{d.score}%</span>
          <span className="geo-match-type">{d.matchType}</span>
        </div>
      ))}
    </div>
  ) : (
    <span className="geo-none">Chưa kiểm tra</span>
  );

  return (
    <div className="geo-overview">
      <section className="geo-section">
        <h2>Thông tin thực thể</h2>
        <div className="geo-grid">
          <div className="geo-field">
            <label>Tên thực thể</label>
            <div className="geo-value">{entity.name}</div>
          </div>
          <div className="geo-field">
            <label>QID</label>
            <div className="geo-value">{entity.qid || <span className="geo-none">Chưa có</span>}</div>
          </div>
          <div className="geo-field">
            <label>Trạng thái pháp lý</label>
            <div className="geo-value geo-warning-text">{entity.legalStatus}</div>
          </div>
          <div className="geo-field">
            <label>Canonical Domain</label>
            <div className="geo-value">{entity.canonicalDomain || <span className="geo-none">Chưa xác định</span>}</div>
          </div>
          <div className="geo-field">
            <label>Official Website (Wikidata)</label>
            <div className="geo-value">{entity.officialWebsiteWikidata || <span className="geo-none">Chưa có</span>}</div>
          </div>
        </div>
      </section>

      <section className="geo-section">
        <h2>Domain candidates</h2>
        <div className="geo-domain-list">{domainItems}</div>
      </section>

      <section className="geo-section">
        <h2>Entity type candidates</h2>
        <div className="geo-tags">{typeList}</div>
      </section>

      <section className="geo-section">
        <h2>Aliases</h2>
        <div className="geo-aliases">{aliasList.length > 0 ? aliasList : <span className="geo-none">Không có</span>}</div>
      </section>

      <section className="geo-section">
        <h2>Phát hiện trùng lặp</h2>
        {duplicateItems}
      </section>

      <section className="geo-section">
        <h2>Statements dự kiến</h2>
        <div className="geo-grid">
          <div className="geo-field">
            <label>instance of</label>
            <div className="geo-value">
              {(proposedStatements.instanceOf || []).length > 0
                ? proposedStatements.instanceOf.map(i => i.label || i.qid).join(', ')
                : <span className="geo-none">Chưa có</span>}
            </div>
          </div>
          <div className="geo-field">
            <label>official name</label>
            <div className="geo-value">{proposedStatements.officialName || <span className="geo-none">Chưa có</span>}</div>
          </div>
          <div className="geo-field">
            <label>country</label>
            <div className="geo-value">
              {proposedStatements.country?.label || <span className="geo-none">Chưa có</span>}
            </div>
          </div>
          <div className="geo-field">
            <label>official website</label>
            <div className="geo-value">
              {proposedStatements.officialWebsite || <span className="geo-none">Chưa có</span>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';

const ACTION_LABELS = {
  'wikidata.search': 'Tìm kiếm Wikidata',
  'wikidata.getEntity': 'Xem chi tiết entity',
  'duplicates.check': 'Kiểm tra trùng lặp',
  'draft.update': 'Cập nhật draft',
  'source.create': 'Thêm nguồn',
  'source.delete': 'Xóa nguồn',
};

export default function ActivityLog({ logs }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="geo-log">
        <section className="geo-section">
          <h2>Nhật ký hoạt động</h2>
          <div className="geo-empty">Chưa có hoạt động nào</div>
        </section>
      </div>
    );
  }

  return (
    <div className="geo-log">
      <section className="geo-section">
        <h2>Nhật ký hoạt động ({logs.length})</h2>
        <p className="geo-help">
          Backend tự sinh log. Browser không gửi nội dung log tùy ý.
        </p>
        <div className="geo-log-list">
          {logs.map((log) => (
            <div key={log.id} className={`geo-log-item geo-log-${log.result}`}>
              <div className="geo-log-header">
                <span className="geo-log-action">
                  {ACTION_LABELS[log.action] || log.action}
                </span>
                <span className="geo-log-time">
                  {new Date(log.timestamp).toLocaleString('vi-VN')}
                </span>
                <span className={`geo-log-result geo-result-${log.result}`}>
                  {log.result}
                </span>
              </div>
              <div className="geo-log-details">
                {log.targetType && (
                  <span className="geo-log-target">
                    {log.targetType}: {log.targetId}
                  </span>
                )}
                {log.actor && (
                  <span className="geo-log-actor">
                    Actor: {log.actor}
                  </span>
                )}
              </div>
              {log.details && (
                <div className="geo-log-extra">
                  {typeof log.details === 'object'
                    ? Object.entries(log.details).map(([k, v]) => (
                        <span key={k} className="geo-log-detail-item">
                          {k}: {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                        </span>
                      ))
                    : String(log.details)}
                </div>
              )}
              {(log.beforeHash || log.afterHash) && (
                <div className="geo-log-hashes">
                  {log.beforeHash && (
                    <span className="geo-hash">before: {log.beforeHash}</span>
                  )}
                  {log.afterHash && (
                    <span className="geo-hash">after: {log.afterHash}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

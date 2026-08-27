import React, { useState, useEffect, useCallback } from 'react';
import EntityOverview from './components/EntityOverview';
import WikidataSearch from './components/WikidataSearch';
import DuplicateDetection from './components/DuplicateDetection';
import EntityDraft from './components/EntityDraft';
import ActivityLog from './components/ActivityLog';
import './index.css';

const TABS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'search', label: 'Tìm kiếm Wikidata' },
  { id: 'duplicates', label: 'Phát hiện trùng lặp' },
  { id: 'draft', label: 'Bản nháp thực thể' },
  { id: 'log', label: 'Nhật ký' },
];

const API_BASE = '/api/geo';

export default function GeoEntityManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [draft, setDraft] = useState(null);
  const [duplicates, setDuplicates] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDraft = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/entity/draft`);
      if (!res.ok) throw new Error('Failed to fetch draft');
      const data = await res.json();
      setDraft(data.data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchLog = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/activity-log?limit=50`);
      if (!res.ok) throw new Error('Failed to fetch log');
      const data = await res.json();
      setActivityLog(data.logs);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchDraft(), fetchLog()])
      .finally(() => setLoading(false));
  }, [fetchDraft, fetchLog]);

  const handleDraftUpdate = async (updatedDraft) => {
    try {
      const res = await fetch(`${API_BASE}/entity/draft`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDraft),
      });
      if (!res.ok) throw new Error('Failed to save draft');
      setDraft(updatedDraft);
      fetchLog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDuplicatesFound = (results) => {
    setDuplicates(results);
  };

  if (loading) {
    return (
      <div className="geo-loading">
        <div className="geo-spinner" />
        <p>Đang tải GEO Entity Manager...</p>
      </div>
    );
  }

  return (
    <div className="geo-entity-manager">
      <header className="geo-header">
        <h1>LETAN MEDIA GEO Entity Manager</h1>
        <p className="geo-subtitle">
          Wikidata Read-Only · Local Draft · Phase 1A
        </p>
        <div className="geo-warning">
          Người tạo hoặc chỉnh sửa item có liên hệ trực tiếp với LETAN MEDIA.
          Mọi dữ liệu phải trung lập, có nguồn kiểm chứng và không phục vụ quảng cáo.
        </div>
      </header>

      <nav className="geo-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`geo-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === 'log' && activityLog.length > 0 && (
              <span className="geo-badge">{activityLog.length}</span>
            )}
          </button>
        ))}
      </nav>

      {error && (
        <div className="geo-error">
          <span>{error}</span>
          <button onClick={() => setError(null)}>Đóng</button>
        </div>
      )}

      <main className="geo-content">
        {activeTab === 'overview' && (
          <EntityOverview
            draft={draft}
            duplicates={duplicates}
          />
        )}
        {activeTab === 'search' && (
          <WikidataSearch
            draft={draft}
            onDuplicatesFound={handleDuplicatesFound}
          />
        )}
        {activeTab === 'duplicates' && (
          <DuplicateDetection
            draft={draft}
            duplicates={duplicates}
            onDuplicatesFound={handleDuplicatesFound}
          />
        )}
        {activeTab === 'draft' && (
          <EntityDraft
            draft={draft}
            onDraftUpdate={handleDraftUpdate}
          />
        )}
        {activeTab === 'log' && (
          <ActivityLog logs={activityLog} />
        )}
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

const ENTITY_TYPES = [
  'brand',
  'website',
  'digital media project',
  'media project',
  'online platform',
];

export default function EntityDraft({ draft, onDraftUpdate }) {
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (draft) {
      setFormData(JSON.parse(JSON.stringify(draft)));
    }
  }, [draft]);

  if (!formData) {
    return <div className="geo-empty">Đang tải draft...</div>;
  }

  const handleEntityChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      entity: { ...prev.entity, [field]: value },
    }));
    setSaved(false);
  };

  const handleDomainChange = (index, field, value) => {
    const newDomains = [...formData.entity.domains];
    newDomains[index] = { ...newDomains[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      entity: { ...prev.entity, domains: newDomains },
    }));
    setSaved(false);
  };

  const handleTypeToggle = (type) => {
    const current = formData.entity.entityTypes || [];
    const newTypes = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    handleEntityChange('entityTypes', newTypes);
  };

  const handleAliasAdd = () => {
    const alias = prompt('Nhập alias mới:');
    if (alias && alias.trim()) {
      const newAliases = [...(formData.entity.aliases || []), alias.trim()];
      handleEntityChange('aliases', newAliases);
    }
  };

  const handleAliasRemove = (index) => {
    const newAliases = formData.entity.aliases.filter((_, i) => i !== index);
    handleEntityChange('aliases', newAliases);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onDraftUpdate(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset draft về giá trị mặc định?')) {
      setFormData(JSON.parse(JSON.stringify(draft)));
      setSaved(false);
    }
  };

  return (
    <div className="geo-draft">
      <section className="geo-section">
        <h2>Bản nháp thực thể</h2>
        <p className="geo-help">
          Chỉnh sửa draft local-only. Không gửi lên Wikidata.
        </p>

        <div className="geo-draft-status">
          {saved && <span className="geo-saved">Đã lưu</span>}
          {formData.lastUpdated && (
            <span className="geo-last-updated">
              Cập nhật: {new Date(formData.lastUpdated).toLocaleString('vi-VN')}
            </span>
          )}
        </div>
      </section>

      <section className="geo-section">
        <h3>Thông tin cơ bản</h3>
        <div className="geo-form-grid">
          <div className="geo-form-group">
            <label>Tên thực thể *</label>
            <input
              type="text"
              value={formData.entity.name}
              onChange={(e) => handleEntityChange('name', e.target.value)}
              className="geo-input"
            />
          </div>
          <div className="geo-form-group">
            <label>ID draft</label>
            <input
              type="text"
              value={formData.entity.id}
              readOnly
              className="geo-input geo-input-readonly"
            />
          </div>
          <div className="geo-form-group">
            <label>Trạng thái pháp lý</label>
            <input
              type="text"
              value={formData.entity.legalStatus}
              readOnly
              className="geo-input geo-input-readonly geo-warning"
            />
          </div>
          <div className="geo-form-group">
            <label>QID</label>
            <input
              type="text"
              value={formData.entity.qid || ''}
              readOnly
              className="geo-input geo-input-readonly"
              placeholder="Chưa có"
            />
          </div>
        </div>
      </section>

      <section className="geo-section">
        <h3>Domains</h3>
        {(formData.entity.domains || []).map((domain, index) => (
          <div key={domain.url} className="geo-domain-form">
            <div className="geo-form-grid">
              <div className="geo-form-group">
                <label>URL</label>
                <input
                  type="url"
                  value={domain.url}
                  readOnly
                  className="geo-input geo-input-readonly"
                />
              </div>
              <div className="geo-form-group">
                <label>Loại</label>
                <input
                  type="text"
                  value={domain.type}
                  onChange={(e) => handleDomainChange(index, 'type', e.target.value)}
                  className="geo-input"
                />
              </div>
              <div className="geo-form-group">
                <label>Mô tả</label>
                <input
                  type="text"
                  value={domain.label}
                  onChange={(e) => handleDomainChange(index, 'label', e.target.value)}
                  className="geo-input"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="geo-section">
        <h3>Entity type candidates</h3>
        <p className="geo-help">
          Chọn các loại thực thể phù hợp. Không được chọn company, enterprise, legal entity.
        </p>
        <div className="geo-type-grid">
          {ENTITY_TYPES.map(type => (
            <label key={type} className="geo-type-option">
              <input
                type="checkbox"
                checked={(formData.entity.entityTypes || []).includes(type)}
                onChange={() => handleTypeToggle(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="geo-section">
        <h3>Aliases</h3>
        <div className="geo-alias-list">
          {(formData.entity.aliases || []).map((alias, index) => (
            <div key={index} className="geo-alias-item">
              <span>{alias}</span>
              <button
                onClick={() => handleAliasRemove(index)}
                className="geo-btn geo-btn-remove"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleAliasAdd} className="geo-btn geo-btn-add">
          + Thêm alias
        </button>
      </section>

      <section className="geo-section">
        <h3>Canonical Domain</h3>
        <div className="geo-value geo-none">
          Chưa xác định — chờ chủ sở hữu duyệt
        </div>
      </section>

      <section className="geo-section">
        <h3>Official Website (Wikidata)</h3>
        <div className="geo-value geo-none">
          Chưa có — chờ sau khi tạo item
        </div>
      </section>

      <div className="geo-draft-actions">
        <button
          onClick={handleSave}
          disabled={saving}
          className="geo-btn geo-btn-primary"
        >
          {saving ? 'Đang lưu...' : 'Lưu draft'}
        </button>
        <button onClick={handleReset} className="geo-btn geo-btn-secondary">
          Reset
        </button>
      </div>

      {error && <div className="geo-error-inline">{error}</div>}
    </div>
  );
}

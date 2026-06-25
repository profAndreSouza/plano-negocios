import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function IdentityModule() {
  const { activePlan, updateActivePlan } = usePlan();

  if (!activePlan) return null;

  const { identity } = activePlan;

  const handleChange = (field, value) => {
    updateActivePlan((prev) => ({
      identity: {
        ...prev.identity,
        [field]: value
      }
    }));
  };

  const handleSectorChange = (sector) => {
    const sectors = identity.activitySectors || [];
    const updatedSectors = sectors.includes(sector)
      ? sectors.filter((s) => s !== sector)
      : [...sectors, sector];
    
    handleChange('activitySectors', updatedSectors);
  };

  const addPartner = () => {
    const newPartner = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      role: '',
      experience: ''
    };
    handleChange('partners', [...(identity.partners || []), newPartner]);
  };

  const removePartner = (id) => {
    handleChange('partners', (identity.partners || []).filter((p) => p.id !== id));
  };

  const updatePartner = (id, field, value) => {
    const updated = (identity.partners || []).map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    handleChange('partners', updated);
  };

  const theme = identity.theme || { primary: '#0f766e', secondary: '#0284c7' };

  const handleColorChange = (key, val) => {
    handleChange('theme', {
      ...theme,
      [key]: val
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Type validation
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Formato de arquivo não suportado. Envie apenas PNG, JPG ou SVG.');
      return;
    }

    // Size validation (1MB)
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('O tamanho do arquivo excede o limite de 1MB. Envie uma imagem menor.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange('logoUrl', event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const presets = [
    { name: 'Sebrae Teal', primary: '#0f766e', secondary: '#0284c7' },
    { name: 'Ocean Blue', primary: '#0284c7', secondary: '#0369a1' },
    { name: 'Emerald Green', primary: '#10b981', secondary: '#047857' },
    { name: 'Crimson Red', primary: '#ef4444', secondary: '#991b1b' },
    { name: 'Sunset Orange', primary: '#f59e0b', secondary: '#b45309' },
    { name: 'Charcoal Gray', primary: '#475569', secondary: '#1e293b' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Apresentação e Identidade do Negócio */}
      <div className="content-card">
        <div className="card-title-section">
          <h2 className="card-title">Apresentação e Identidade do Negócio</h2>
          <p className="card-subtitle">
            Defina o posicionamento estratégico inicial e os dados cadastrais da empresa.
          </p>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Nome Fantasia da Empresa <span className="required-star">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Aroma & Sabor Café"
              value={identity.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Forma Jurídica</label>
            <select
              className="form-select"
              value={identity.legalForm || ''}
              onChange={(e) => handleChange('legalForm', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="MEI">MEI (Microempreendedor Individual)</option>
              <option value="EI">EI (Empresário Individual)</option>
              <option value="LTDA">Sociedade Limitada (LTDA)</option>
              <option value="SLU">Sociedade Limitada Unipessoal (SLU)</option>
              <option value="SA">Sociedade Anônima (S/A)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Regime Tributário</label>
            <select
              className="form-select"
              value={identity.taxRegime || ''}
              onChange={(e) => handleChange('taxRegime', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Simples Nacional">Simples Nacional</option>
              <option value="Lucro Presumido">Lucro Presumido</option>
              <option value="Lucro Real">Lucro Real</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Setores de Atividade (Marque todos que se aplicam) <span className="required-star">*</span></label>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
            {['Comércio', 'Indústria', 'Prestação de Serviços', 'Agronegócio'].map((sector) => {
              const isChecked = (identity.activitySectors || []).includes(sector);
              return (
                <label key={sector} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                  <input
                    type="checkbox"
                    style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                    checked={isChecked}
                    onChange={() => handleSectorChange(sector)}
                  />
                  {sector}
                </label>
              );
            })}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Missão da Empresa</label>
            <textarea
              className="form-textarea"
              placeholder="Qual a razão de existir da empresa? O que ela entrega de valor?"
              value={identity.mission || ''}
              onChange={(e) => handleChange('mission', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Visão da Empresa</label>
            <textarea
              className="form-textarea"
              placeholder="Onde a empresa quer estar nos próximos 3 a 5 anos?"
              value={identity.vision || ''}
              onChange={(e) => handleChange('vision', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Valores</label>
            <textarea
              className="form-textarea"
              placeholder="Ex: Ética, Transparência, Foco no cliente, Sustentabilidade ambiental..."
              value={identity.values || ''}
              onChange={(e) => handleChange('values', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Diferenciais Competitivos</label>
            <textarea
              className="form-textarea"
              placeholder="O que torna seu negócio unique? Por que os clientes escolherão você e não os concorrentes?"
              value={identity.differentials || ''}
              onChange={(e) => handleChange('differentials', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 2. Identidade Visual e Personalização */}
      <div className="content-card">
        <h3 className="card-title">Identidade Visual e Personalização</h3>
        <p className="card-subtitle">
          Faça o upload do logotipo da sua empresa e personalize a paleta de cores para o Relatório Final.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '20px' }}>
          {/* Logo Upload Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="form-label" style={{ fontWeight: '700' }}>Logotipo da Empresa</span>
            {identity.logoUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-main)' }}>
                <img
                  src={identity.logoUrl}
                  alt="Logo da empresa"
                  style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}
                />
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                  onClick={() => handleChange('logoUrl', '')}
                >
                  Remover Logotipo
                </button>
              </div>
            ) : (
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '140px', border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', backgroundColor: 'var(--bg-main)', transition: 'var(--transition)' }} className="logo-upload-zone">
                <span style={{ fontSize: '28px' }}>📁</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-heading)' }}>Selecionar Logotipo</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PNG, JPG ou SVG (Máx. 1MB)</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/gif"
                  style={{ display: 'none' }}
                  onChange={handleLogoChange}
                />
              </label>
            )}
          </div>

          {/* Color Palettes Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="form-label" style={{ fontWeight: '700' }}>Paleta de Cores do Relatório</span>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Cor Primária</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    className="form-input"
                    style={{ width: '44px', height: '36px', padding: '2px', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
                    value={theme.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '12px', padding: '6px 10px' }}
                    value={theme.primary.toUpperCase()}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Cor Secundária</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    className="form-input"
                    style={{ width: '44px', height: '36px', padding: '2px', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
                    value={theme.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '12px', padding: '6px 10px' }}
                    value={theme.secondary.toUpperCase()}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Presets Row */}
            <div>
              <span className="form-label" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Combinações Sugeridas</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {presets.map((preset) => {
                  const isSelected = theme.primary.toLowerCase() === preset.primary.toLowerCase() && theme.secondary.toLowerCase() === preset.secondary.toLowerCase();
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 10px',
                        borderRadius: '20px',
                        border: isSelected ? '2px solid var(--text-heading)' : '1px solid var(--border)',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '700',
                        transition: 'var(--transition)'
                      }}
                      onClick={() => handleChange('theme', { primary: preset.primary, secondary: preset.secondary })}
                      title={preset.name}
                    >
                      <span style={{ display: 'flex', width: '16px', height: '16px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #ddd' }}>
                        <span style={{ width: '50%', height: '100%', backgroundColor: preset.primary }} />
                        <span style={{ width: '50%', height: '100%', backgroundColor: preset.secondary }} />
                      </span>
                      {preset.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quadro de Sócios */}
      <div className="content-card">
        <div className="section-header-row">
          <div>
            <h3 className="card-title">Quadro de Sócios e Empreendedores</h3>
            <p className="card-subtitle">Registre a equipe gestora, suas funções e experiências profissionais no empreendimento.</p>
          </div>
          <button type="button" className="btn-add-row" onClick={addPartner}>
            + Adicionar Sócio
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {(identity.partners || []).map((partner) => (
            <div key={partner.id} className="builder-item-row">
              <div className="partner-grid">
                <div className="form-group">
                  <label className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nome do sócio"
                    value={partner.name || ''}
                    onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Função / Atribuições</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Diretor Comercial, Barista Chefe..."
                    value={partner.role || ''}
                    onChange={(e) => updatePartner(partner.id, 'role', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Experiência e Competências</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: 5 anos de experiência no varejo, formação em administração..."
                    value={partner.experience || ''}
                    onChange={(e) => updatePartner(partner.id, 'experience', e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn-remove-row"
                onClick={() => removePartner(partner.id)}
                title="Remover sócio"
              >
                &times;
              </button>
            </div>
          ))}

          {(identity.partners || []).length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '14px' }}>
              Nenhum sócio adicionado ainda. Clique no botão acima para registrar os sócios e fundadores.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

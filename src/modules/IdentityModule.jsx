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

  return (
    <div className="content-card">
      <div className="card-title-section">
        <h2 className="card-title">Apresentação e Identidade do Negócio</h2>
        <p className="card-subtitle">
          Defina o posicionamento estratégico inicial e quem são as pessoas à frente da empresa.
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
            placeholder="O que torna seu negócio único? Por que os clientes escolherão você e não os concorrentes?"
            value={identity.differentials || ''}
            onChange={(e) => handleChange('differentials', e.target.value)}
          />
        </div>
      </div>

      <div className="list-builder" style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-heading)' }}>Quadro de Sócios e Empreendedores</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Registre a equipe gestora, suas funções e experiências profissionais.</p>
          </div>
          <button type="button" className="btn-add-row" onClick={addPartner}>
            + Adicionar Sócio
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(identity.partners || []).map((partner) => (
            <div key={partner.id} className="builder-item-row">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px', width: '100%' }}>
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

import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function MarketModule() {
  const { activePlan, updateActivePlan } = usePlan();

  if (!activePlan) return null;

  const { market } = activePlan;

  const handleChange = (field, value) => {
    updateActivePlan((prev) => ({
      market: {
        ...prev.market,
        [field]: value
      }
    }));
  };

  // Competitor operations
  const addCompetitor = () => {
    const newComp = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      price: 'Média',
      quality: 'Média',
      service: 'Média',
      location: 'Média',
      strengths: '',
      weaknesses: ''
    };
    handleChange('competitors', [...(market.competitors || []), newComp]);
  };

  const removeCompetitor = (id) => {
    handleChange('competitors', (market.competitors || []).filter((c) => c.id !== id));
  };

  const updateCompetitor = (id, field, value) => {
    const updated = (market.competitors || []).map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    handleChange('competitors', updated);
  };

  // Supplier operations
  const addSupplier = () => {
    const newSup = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      items: '',
      terms: '',
      quality: 'Média'
    };
    handleChange('suppliers', [...(market.suppliers || []), newSup]);
  };

  const removeSupplier = (id) => {
    handleChange('suppliers', (market.suppliers || []).filter((s) => s.id !== id));
  };

  const updateSupplier = (id, field, value) => {
    const updated = (market.suppliers || []).map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    handleChange('suppliers', updated);
  };

  const ratings = ['Excelente', 'Boa', 'Média', 'Regular', 'Ruim'];

  return (
    <div className="content-card">
      <div className="card-title-section">
        <h2 className="card-title">Análise de Mercado</h2>
        <p className="card-subtitle">
          Estude quem são seus compradores, compare-se com seus principais rivais e escolha parceiros de fornecimento sólidos.
        </p>
      </div>

      {/* Customer profile */}
      <div className="form-group">
        <label className="form-label">
          Perfil e Comportamento dos Clientes <span className="required-star">*</span>
        </label>
        <textarea
          className="form-textarea"
          style={{ minHeight: '120px' }}
          placeholder="Quem são seus compradores (pessoas físicas ou empresas)? Qual a sua renda média, hábitos de consumo, o que valorizam em um produto desse tipo, onde vivem e com que frequência compram?"
          value={market.customerProfile || ''}
          onChange={(e) => handleChange('customerProfile', e.target.value)}
        />
        <span className="form-help-inline">
          Dica do Sebrae: Divida em público B2C (Consumidor Final) ou B2B (Outras Empresas).
        </span>
      </div>

      {/* Competitors Matrix */}
      <div className="list-builder" style={{ marginTop: '16px' }}>
        <div className="section-header-row">
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-heading)' }}>Análise de Concorrência</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Avalie seus principais concorrentes e identifique as suas forças e fraquezas frente ao mercado.</p>
          </div>
          <button type="button" className="btn-add-row" onClick={addCompetitor}>
            + Adicionar Concorrente
          </button>
        </div>

        {(market.competitors || []).length > 0 ? (
          <div className="matrix-table-wrapper">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Nome do Concorrente</th>
                  <th style={{ width: '12%' }}>Preço</th>
                  <th style={{ width: '12%' }}>Qualidade</th>
                  <th style={{ width: '12%' }}>Atendimento</th>
                  <th style={{ width: '12%' }}>Localização</th>
                  <th style={{ width: '28%' }}>Pontos Fortes e Fracos</th>
                  <th style={{ width: '4%', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {(market.competitors || []).map((comp) => (
                  <tr key={comp.id}>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        placeholder="Ex: Café Central"
                        value={comp.name || ''}
                        onChange={(e) => updateCompetitor(comp.id, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="matrix-select"
                        value={comp.price}
                        onChange={(e) => updateCompetitor(comp.id, 'price', e.target.value)}
                      >
                        {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td>
                      <select
                        className="matrix-select"
                        value={comp.quality}
                        onChange={(e) => updateCompetitor(comp.id, 'quality', e.target.value)}
                      >
                        {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td>
                      <select
                        className="matrix-select"
                        value={comp.service}
                        onChange={(e) => updateCompetitor(comp.id, 'service', e.target.value)}
                      >
                        {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td>
                      <select
                        className="matrix-select"
                        value={comp.location}
                        onChange={(e) => updateCompetitor(comp.id, 'location', e.target.value)}
                      >
                        {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td>
                      <textarea
                        className="form-textarea"
                        style={{ minHeight: '40px', padding: '6px 10px', fontSize: '12px' }}
                        placeholder="Ex: Forte na tradição da marca; fraco na entrega delivery..."
                        value={comp.strengths || ''}
                        onChange={(e) => updateCompetitor(comp.id, 'strengths', e.target.value)}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: '18px', fontWeight: '800' }}
                        onClick={() => removeCompetitor(comp.id)}
                        title="Remover concorrente"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '14px' }}>
            Nenhum concorrente cadastrado. Adicione concorrentes para analisar suas forças e fraquezas.
          </div>
        )}
      </div>

      {/* Suppliers */}
      <div className="list-builder" style={{ marginTop: '24px' }}>
        <div className="section-header-row">
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-heading)' }}>Mapeamento de Fornecedores</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Liste os parceiros comerciais chaves que fornecerão mercadorias, insumos ou equipamentos.</p>
          </div>
          <button type="button" className="btn-add-row" onClick={addSupplier}>
            + Adicionar Fornecedor
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(market.suppliers || []).map((sup) => (
            <div key={sup.id} className="builder-item-row">
              <div className="supplier-grid">
                <div className="form-group">
                  <label className="form-label">Nome do Fornecedor / Empresa</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Distruibidora Grão de Ouro Ltda"
                    value={sup.name || ''}
                    onChange={(e) => updateSupplier(sup.id, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Itens / Insumos Fornecidos</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Grãos de café especial verde, xaropes e embalagens"
                    value={sup.items || ''}
                    onChange={(e) => updateSupplier(sup.id, 'items', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Condições de Pagamento e Entrega</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Faturamento em 30 dias, prazo de entrega 3 dias úteis"
                    value={sup.terms || ''}
                    onChange={(e) => updateSupplier(sup.id, 'terms', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Qualidade / Avaliação</label>
                  <select
                    className="form-select"
                    value={sup.quality}
                    onChange={(e) => updateSupplier(sup.id, 'quality', e.target.value)}
                  >
                    {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <button
                type="button"
                className="btn-remove-row"
                onClick={() => removeSupplier(sup.id)}
                title="Remover fornecedor"
              >
                &times;
              </button>
            </div>
          ))}

          {(market.suppliers || []).length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '14px' }}>
              Nenhum fornecedor adicionado ainda. É essencial registrar fornecedores chave para seu planejamento operacional.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

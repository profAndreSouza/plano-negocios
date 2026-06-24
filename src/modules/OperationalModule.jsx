import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function OperationalModule() {
  const { activePlan, updateActivePlan } = usePlan();

  if (!activePlan) return null;

  const { operational } = activePlan;

  const handleChange = (field, value) => {
    updateActivePlan((prev) => ({
      operational: {
        ...prev.operational,
        [field]: value
      }
    }));
  };

  // Process mapping operations
  const addProcess = () => {
    const newProc = {
      id: Math.random().toString(36).substr(2, 9),
      step: (operational.processes || []).length + 1,
      description: '',
      responsible: ''
    };
    handleChange('processes', [...(operational.processes || []), newProc]);
  };

  const removeProcess = (id) => {
    const filtered = (operational.processes || []).filter((p) => p.id !== id);
    // Re-index steps
    const reindexed = filtered.map((p, index) => ({ ...p, step: index + 1 }));
    handleChange('processes', reindexed);
  };

  const updateProcess = (id, field, value) => {
    const updated = (operational.processes || []).map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    handleChange('processes', updated);
  };

  // Personnel operations
  const addPersonnel = () => {
    const newPerson = {
      id: Math.random().toString(36).substr(2, 9),
      role: '',
      salary: 0,
      quantity: 1
    };
    handleChange('personnel', [...(operational.personnel || []), newPerson]);
  };

  const removePersonnel = (id) => {
    handleChange('personnel', (operational.personnel || []).filter((p) => p.id !== id));
  };

  const updatePersonnel = (id, field, value) => {
    const parsedVal = (field === 'salary' || field === 'quantity') ? (Number(value) || 0) : value;
    const updated = (operational.personnel || []).map((p) =>
      p.id === id ? { ...p, [field]: parsedVal } : p
    );
    handleChange('personnel', updated);
  };

  return (
    <div className="content-card">
      <div className="card-title-section">
        <h2 className="card-title">Plano Operacional</h2>
        <p className="card-subtitle">
          Descreva a engenharia do negócio: layout físico, capacidade máxima, processos chave e equipe necessária.
        </p>
      </div>

      {/* Layout & Capacities */}
      <div className="form-group">
        <label className="form-label">Arranjo Físico e Layout</label>
        <textarea
          className="form-textarea"
          style={{ minHeight: '80px' }}
          placeholder="Descreva como o espaço físico de trabalho está dividido (ex: área de vendas separada da produção, estoque no fundo). O layout ajuda a economizar tempo de movimentação?"
          value={operational.layoutDesc || ''}
          onChange={(e) => handleChange('layoutDesc', e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Capacidade Máxima de Produção/Atendimento <span className="required-star">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ex: 500 cafés por dia, 30 consultas médicas/dia"
            value={operational.maxCapacity || ''}
            onChange={(e) => handleChange('maxCapacity', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Estimativa de Produção/Atendimento Inicial <span className="required-star">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ex: 200 cafés por dia nos primeiros 3 meses"
            value={operational.initialProduction || ''}
            onChange={(e) => handleChange('initialProduction', e.target.value)}
          />
        </div>
      </div>

      {/* Processes Table Builder */}
      <div className="list-builder" style={{ marginTop: '16px' }}>
        <div className="section-header-row">
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-heading)' }}>Mapeamento de Processos Operacionais</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Mapeie as etapas operacionais sequenciais mais importantes do dia a dia (o que fazer, como fazer, quem faz).</p>
          </div>
          <button type="button" className="btn-add-row" onClick={addProcess}>
            + Adicionar Processo
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(operational.processes || []).map((proc) => (
            <div key={proc.id} className="builder-item-row" style={{ gridTemplateColumns: '1fr' }}>
              <div className="process-grid">
                
                <div className="form-group">
                  <label className="form-label">Etapa nº</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ textAlign: 'center', fontWeight: '700', backgroundColor: 'var(--bg-main)' }}
                    readOnly
                    value={proc.step}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Descrição das Atividades da Etapa</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Abertura da loja, higienização das máquinas de café e checagem de estoque..."
                    value={proc.description || ''}
                    onChange={(e) => updateProcess(proc.id, 'description', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Responsável</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Atendente, Gerente..."
                    value={proc.responsible || ''}
                    onChange={(e) => updateProcess(proc.id, 'responsible', e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="btn-remove-row"
                  onClick={() => removeProcess(proc.id)}
                  title="Excluir processo"
                  style={{ marginBottom: '0px' }}
                >
                  &times;
                </button>

              </div>
            </div>
          ))}

          {(operational.processes || []).length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '14px' }}>
              Nenhum processo operacional mapeado ainda. Adicione etapas para demonstrar a eficiência do seu negócio.
            </div>
          )}
        </div>
      </div>

      {/* Personnel Builder */}
      <div className="list-builder" style={{ marginTop: '24px' }}>
        <div className="section-header-row">
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-heading)' }}>Necessidade de Recursos Humanos (Funcionários)</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Registre a folha de pagamento da equipe operacional direta. Os valores alimentam os Custos Fixos mensais.</p>
          </div>
          <button type="button" className="btn-add-row" onClick={addPersonnel}>
            + Adicionar Cargo
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(operational.personnel || []).map((person) => {
            const sal = Number(person.salary) || 0;
            const qty = Number(person.quantity) || 0;
            const subtotal = sal * qty;

            return (
              <div key={person.id} className="builder-item-row" style={{ gridTemplateColumns: '1fr' }}>
                <div className="personnel-grid">
                  
                  <div className="form-group">
                    <label className="form-label">Cargo / Função</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ex: Barista, Atendente de Balcão, Auxiliar de Limpeza..."
                      value={person.role || ''}
                      onChange={(e) => updatePersonnel(person.id, 'role', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Salário Base (R$)</label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      className="form-input"
                      placeholder="0,00"
                      value={person.salary || ''}
                      onChange={(e) => updatePersonnel(person.id, 'salary', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Quantidade</label>
                    <input
                      type="number"
                      min="1"
                      className="form-input"
                      value={person.quantity || ''}
                      onChange={(e) => updatePersonnel(person.id, 'quantity', e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ paddingBottom: '8px' }}>
                    <label className="form-label">Custo Total Mensal</label>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)' }}>
                      {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-remove-row"
                    onClick={() => removePersonnel(person.id)}
                    title="Excluir cargo"
                    style={{ marginBottom: '0px' }}
                  >
                    &times;
                  </button>

                </div>
              </div>
            );
          })}

          {(operational.personnel || []).length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '14px' }}>
              Nenhum funcionário cadastrado. Caso você trabalhe sozinho, adicione sua própria retirada de pró-labore aqui.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { usePlan } from '../context/PlanContext';

export default function TimelineModule() {
  const { activePlan, updateActivePlan } = usePlan();

  if (!activePlan) return null;

  // Initialize timeline state if it doesn't exist (defensive design for existing plans)
  const timeline = activePlan.timeline || {
    educational: [
      { key: 'identity', label: '1. Identidade do Negócio', dueDate: '', status: 'pending', notes: '' },
      { key: 'executive', label: '2. Resumo Executivo', dueDate: '', status: 'pending', notes: '' },
      { key: 'market', label: '3. Análise de Mercado', dueDate: '', status: 'pending', notes: '' },
      { key: 'swot', label: '4. Matriz SWOT (FOFA)', dueDate: '', status: 'pending', notes: '' },
      { key: 'marketing', label: '5. Plano de Marketing', dueDate: '', status: 'pending', notes: '' },
      { key: 'operational', label: '6. Plano Operacional', dueDate: '', status: 'pending', notes: '' },
      { key: 'financial', label: '7. Plano Financeiro', dueDate: '', status: 'pending', notes: '' }
    ],
    business: [
      { id: '1', task: 'Pesquisa e validação com fornecedores', duration: '1 mês', responsible: 'Sócios', status: 'planned' },
      { id: '2', task: 'Registro da empresa e licenças', duration: '1 mês', responsible: 'Contador / Sócios', status: 'planned' },
      { id: '3', task: 'Reforma e preparação do espaço físico', duration: '2 meses', responsible: 'Sócios / Empreiteiro', status: 'planned' },
      { id: '4', task: 'Campanha de divulgação e marketing inicial', duration: '1 mês', responsible: 'Sócios / Agência', status: 'planned' },
      { id: '5', task: 'Início oficial das operações e vendas', duration: 'Contínuo', responsible: 'Equipe', status: 'planned' }
    ]
  };

  const [activeSubTab, setActiveSubTab] = useState('business');

  const updateEducational = (index, field, value) => {
    updateActivePlan((prev) => {
      const currentTimeline = prev.timeline || timeline;
      const updatedEdu = [...currentTimeline.educational];
      updatedEdu[index] = { ...updatedEdu[index], [field]: value };
      return {
        timeline: {
          ...currentTimeline,
          educational: updatedEdu
        }
      };
    });
  };

  const addBusinessActivity = () => {
    updateActivePlan((prev) => {
      const currentTimeline = prev.timeline || timeline;
      const newActivity = {
        id: Math.random().toString(36).substr(2, 9),
        task: '',
        duration: '',
        responsible: '',
        status: 'planned'
      };
      return {
        timeline: {
          ...currentTimeline,
          business: [...currentTimeline.business, newActivity]
        }
      };
    });
  };

  const updateBusinessActivity = (id, field, value) => {
    updateActivePlan((prev) => {
      const currentTimeline = prev.timeline || timeline;
      const updatedBiz = currentTimeline.business.map((act) => {
        if (act.id === id) {
          return { ...act, [field]: value };
        }
        return act;
      });
      return {
        timeline: {
          ...currentTimeline,
          business: updatedBiz
        }
      };
    });
  };

  const deleteBusinessActivity = (id) => {
    updateActivePlan((prev) => {
      const currentTimeline = prev.timeline || timeline;
      const updatedBiz = currentTimeline.business.filter((act) => act.id !== id);
      return {
        timeline: {
          ...currentTimeline,
          business: updatedBiz
        }
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Tab Selectors */}
      <div className="tab-control-bar">
        <button
          className={`tab-control-btn ${activeSubTab === 'business' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('business')}
        >
          🏢 Cronograma do Negócio (Roteiro de Implantação)
        </button>
        <button
          className={`tab-control-btn ${activeSubTab === 'educational' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('educational')}
        >
          🎓 Cronograma Educacional (Entregas Acadêmicas)
        </button>
      </div>

      {activeSubTab === 'business' ? (
        <div className="content-card">
          <div className="section-header-row">
            <div>
              <h3 className="card-title">Roteiro de Implantação da Empresa</h3>
              <p className="card-subtitle">
                Mapeie as fases operacionais para abrir as portas da empresa (ex: captação, reforma, compras, testes, data de lançamento).
              </p>
            </div>
            <button className="btn-add-row" onClick={addBusinessActivity}>
              + Adicionar Atividade
            </button>
          </div>

          <div className="report-table-wrapper" style={{ marginTop: '16px' }}>
            <table className="report-table edit-timeline-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Fase / Atividade</th>
                  <th style={{ width: '20%' }}>Duração / Prazo</th>
                  <th style={{ width: '20%' }}>Responsável</th>
                  <th style={{ width: '15%' }}>Status</th>
                  <th style={{ width: '5%', textAlign: 'center' }}></th>
                </tr>
              </thead>
              <tbody>
                {timeline.business.map((act) => (
                  <tr key={act.id}>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        placeholder="Ex: Reforma da Fachada ou Lançamento do site"
                        value={act.task}
                        onChange={(e) => updateBusinessActivity(act.id, 'task', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        placeholder="Ex: 2 semanas / Mês 1"
                        value={act.duration}
                        onChange={(e) => updateBusinessActivity(act.id, 'duration', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        placeholder="Ex: Sócios / Agência"
                        value={act.responsible}
                        onChange={(e) => updateBusinessActivity(act.id, 'responsible', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        value={act.status}
                        onChange={(e) => updateBusinessActivity(act.id, 'status', e.target.value)}
                      >
                        <option value="planned">⚪ Planejado</option>
                        <option value="in_progress">🔵 Em Execução</option>
                        <option value="completed">🟢 Concluído</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn-remove-row"
                        style={{ margin: 0 }}
                        title="Remover Atividade"
                        onClick={() => deleteBusinessActivity(act.id)}
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="content-card">
          <h3 className="card-title">Cronograma de Entrega das Etapas</h3>
          <p className="card-subtitle">
            Defina os prazos e acompanhe o status de preenchimento e validação de cada módulo do plano de negócios com o seu professor.
          </p>

          <div className="report-table-wrapper" style={{ marginTop: '16px' }}>
            <table className="report-table edit-timeline-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Módulo do Plano</th>
                  <th style={{ width: '20%' }}>Data Limite</th>
                  <th style={{ width: '20%' }}>Status</th>
                  <th style={{ width: '30%' }}>Anotações / Feedback do Professor</th>
                </tr>
              </thead>
              <tbody>
                {timeline.educational.map((item, index) => (
                  <tr key={item.key}>
                    <td style={{ fontWeight: '600', color: 'var(--text-heading)' }}>
                      {item.label}
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        value={item.dueDate}
                        onChange={(e) => updateEducational(index, 'dueDate', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        value={item.status}
                        onChange={(e) => updateEducational(index, 'status', e.target.value)}
                      >
                        <option value="pending">🔴 Pendente</option>
                        <option value="in_progress">🟡 Em Andamento</option>
                        <option value="delivered">🟢 Entregue / Concluído</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        placeholder="Ex: Aguardando correção / Nota 10"
                        value={item.notes}
                        onChange={(e) => updateEducational(index, 'notes', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

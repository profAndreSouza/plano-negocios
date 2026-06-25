import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function InnovationModule() {
  const { activePlan, updateActivePlan } = usePlan();

  if (!activePlan) return null;

  // Defensive initialization for existing plans
  const innovation = activePlan.innovation || {
    painMotivator: '',
    expectedImpact: '',
    pillars: {
      businessModel: { selected: [], description: '' },
      technology: { selected: [], description: '' },
      processes: { selected: [], description: '' },
      esg: { selected: [], description: '' }
    }
  };

  const updateField = (field, value) => {
    updateActivePlan((prev) => {
      const currentInno = prev.innovation || innovation;
      return {
        innovation: {
          ...currentInno,
          [field]: value
        }
      };
    });
  };

  const togglePill = (pillarKey, pillValue) => {
    updateActivePlan((prev) => {
      const currentInno = prev.innovation || innovation;
      const pillar = currentInno.pillars[pillarKey] || { selected: [], description: '' };
      const selected = [...pillar.selected];
      
      const idx = selected.indexOf(pillValue);
      if (idx > -1) {
        selected.splice(idx, 1);
      } else {
        selected.push(pillValue);
      }

      return {
        innovation: {
          ...currentInno,
          pillars: {
            ...currentInno.pillars,
            [pillarKey]: {
              ...pillar,
              selected
            }
          }
        }
      };
    });
  };

  const updatePillarDescription = (pillarKey, description) => {
    updateActivePlan((prev) => {
      const currentInno = prev.innovation || innovation;
      const pillar = currentInno.pillars[pillarKey] || { selected: [], description: '' };
      return {
        innovation: {
          ...currentInno,
          pillars: {
            ...currentInno.pillars,
            [pillarKey]: {
              ...pillar,
              description
            }
          }
        }
      };
    });
  };

  const options = {
    businessModel: [
      { value: 'as_a_service', label: 'Venda como Serviço (Assinaturas)' },
      { value: 'sharing_economy', label: 'Economia Compartilhada' },
      { value: 'marketplace', label: 'Marketplace ou Plataformas' }
    ],
    technology: [
      { value: 'ai_agents', label: 'Uso de Agentes de IA' },
      { value: 'hyper_personalization', label: 'Hiperpersonalização / CRM' },
      { value: 'omnichannel', label: 'Operação Omnichannel' }
    ],
    processes: [
      { value: 'operational_efficiency', label: 'Eficiência Operacional / Logística' },
      { value: 'open_innovation', label: 'Inovação Aberta (Parcerias)' },
      { value: 'payment_automation', label: 'Automação de Checkout/Cobrança' }
    ],
    esg: [
      { value: 'circular_economy', label: 'Economia Circular' },
      { value: 'wellness_services', label: 'Serviços de Saúde e Bem-Estar' }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Intro Context Card */}
      <div className="content-card">
        <h3 className="card-title">Inovação e Geração de Valor</h3>
        <p className="card-subtitle">
          Inovar não significa apenas criar tecnologia do zero. Envolve repensar como a empresa gera, entrega e captura valor no mercado. Mapeie as principais frentes de inovação do seu plano.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          <div className="form-group">
            <label className="form-label">
              Dor de Mercado / Oportunidade Motivadora <span className="required-star">*</span>
            </label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Ex: Alta fragmentação de fornecedores que atrasa entregas em 40% ou Dificuldade de pequenos comércios contratarem suporte de marketing especializado..."
              value={innovation.painMotivator || ''}
              onChange={(e) => updateField('painMotivator', e.target.value)}
            />
            <span className="form-help-inline">
              Qual a dor ou desconforto real do mercado que a inovação do seu projeto busca curar?
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">
              Impacto Esperado no Negócio <span className="required-star">*</span>
            </label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Ex: Redução do ciclo de venda de 5 para 1 dia, maior recorrência de faturamento anual ou fidelização do cliente..."
              value={innovation.expectedImpact || ''}
              onChange={(e) => updateField('expectedImpact', e.target.value)}
            />
            <span className="form-help-inline">
              Descreva os benefícios práticos esperados dessa inovação para a atração de clientes e rentabilidade da empresa.
            </span>
          </div>
        </div>
      </div>

      {/* Grid of the 4 Pillars */}
      <div className="innovation-grid-layout">
        
        {/* Pillar 1: Modelo de Negócios */}
        <div className="content-card innovation-pillar-card">
          <div className="innovation-pillar-header">
            <span className="innovation-pillar-icon">💸</span>
            <div>
              <h4 className="innovation-pillar-title">1. Modelo de Negócios e Monetização</h4>
              <p className="innovation-pillar-desc">Repensar a forma de faturamento e geração de receita.</p>
            </div>
          </div>
          
          <div className="innovation-pill-group">
            {options.businessModel.map((opt) => {
              const isSelected = (innovation.pillars.businessModel?.selected || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`innovation-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => togglePill('businessModel', opt.value)}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Detalhamento da Aplicação:</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Descreva como essa inovação de modelo será colocada em prática no seu negócio..."
              value={innovation.pillars.businessModel?.description || ''}
              onChange={(e) => updatePillarDescription('businessModel', e.target.value)}
            />
          </div>
        </div>

        {/* Pillar 2: Inovação Tecnológica */}
        <div className="content-card innovation-pillar-card">
          <div className="innovation-pillar-header">
            <span className="innovation-pillar-icon">🤖</span>
            <div>
              <h4 className="innovation-pillar-title">2. Inovação Tecnológica e Digital</h4>
              <p className="innovation-pillar-desc">Automação inteligente e integração de canais de consumo.</p>
            </div>
          </div>
          
          <div className="innovation-pill-group">
            {options.technology.map((opt) => {
              const isSelected = (innovation.pillars.technology?.selected || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`innovation-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => togglePill('technology', opt.value)}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Detalhamento da Aplicação:</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Explicite o uso de IA, personalização ou integração de canais no seu projeto..."
              value={innovation.pillars.technology?.description || ''}
              onChange={(e) => updatePillarDescription('technology', e.target.value)}
            />
          </div>
        </div>

        {/* Pillar 3: Processos e Gestão */}
        <div className="content-card innovation-pillar-card">
          <div className="innovation-pillar-header">
            <span className="innovation-pillar-icon">🔄</span>
            <div>
              <h4 className="innovation-pillar-title">3. Inovação em Processos e Gestão</h4>
              <p className="innovation-pillar-desc">Agilidade interna, parcerias externas e automação de fluxos.</p>
            </div>
          </div>
          
          <div className="innovation-pill-group">
            {options.processes.map((opt) => {
              const isSelected = (innovation.pillars.processes?.selected || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`innovation-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => togglePill('processes', opt.value)}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Detalhamento da Aplicação:</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Descreva ferramentas de eficiência, parcerias ou automação de checkout..."
              value={innovation.pillars.processes?.description || ''}
              onChange={(e) => updatePillarDescription('processes', e.target.value)}
            />
          </div>
        </div>

        {/* Pillar 4: ESG e Sustentabilidade */}
        <div className="content-card innovation-pillar-card">
          <div className="innovation-pillar-header">
            <span className="innovation-pillar-icon">🌱</span>
            <div>
              <h4 className="innovation-pillar-title">4. Inovação Focada em ESG e Sustentabilidade</h4>
              <p className="innovation-pillar-desc">Ciclo de vida limpo do produto e alinhamento com bem-estar social.</p>
            </div>
          </div>
          
          <div className="innovation-pill-group">
            {options.esg.map((opt) => {
              const isSelected = (innovation.pillars.esg?.selected || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`innovation-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => togglePill('esg', opt.value)}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Detalhamento da Aplicação:</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Descreva a economia circular, redução de resíduos ou saúde do cliente no negócio..."
              value={innovation.pillars.esg?.description || ''}
              onChange={(e) => updatePillarDescription('esg', e.target.value)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

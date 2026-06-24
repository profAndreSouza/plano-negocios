import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function DashboardModule() {
  const { activePlan, calculated, progress, setActiveTab } = usePlan();

  if (!activePlan) return null;

  const formatCurrency = (val) => {
    return (val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Safe percentage helper
  const getPercentage = (part, total) => {
    if (!total || total === 0) return 0;
    return Math.round((part / total) * 100);
  };

  const fixedInvestPct = getPercentage(calculated.fixedInvestmentsTotal, calculated.totalInvestment);
  const preOpInvestPct = getPercentage(calculated.preOperationalTotal, calculated.totalInvestment);
  const workingCapitalPct = getPercentage(calculated.workingCapitalTotal, calculated.totalInvestment);

  // Recommendations generator
  const getRecommendations = () => {
    const recs = [];
    const profit = calculated.netProfit;
    const revenue = calculated.projectedRevenue;
    const payback = calculated.paybackMonths;
    const roi = calculated.roiPct;

    if (revenue === 0) {
      recs.push({
        type: 'info',
        icon: '💡',
        title: 'Comece pelas Projeções de Vendas',
        desc: 'Para ver as projeções financeiras e indicadores, cadastre seus produtos no Módulo 5 (Marketing) e defina a projeção de vendas no Módulo 7 (Financeiro).'
      });
      return recs;
    }

    if (profit <= 0) {
      recs.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Atenção: Operação Deficitária',
        desc: `Sua projeção resulta em prejuízo mensal de ${formatCurrency(Math.abs(profit))}. Sugerimos revisar seus custos fixos, renegociar preços com fornecedores ou aumentar o preço de venda dos produtos.`
      });
    } else {
      recs.push({
        type: 'success',
        icon: '✅',
        title: 'Operação Superavitária!',
        desc: `Excelente! O negócio gera um lucro mensal estimado de ${formatCurrency(profit)} com uma lucratividade de ${calculated.profitabilityPct.toFixed(1)}%.`
      });

      if (calculated.profitabilityPct < 15) {
        recs.push({
          type: 'warning',
          icon: '📉',
          title: 'Lucratividade abaixo da média',
          desc: `Sua lucratividade de ${calculated.profitabilityPct.toFixed(1)}% está abaixo do recomendado para pequenos negócios (15% a 25%). Tente readequar despesas administrativas.`
        });
      }

      if (payback > 0 && payback <= 18) {
        recs.push({
          type: 'success',
          icon: '🚀',
          title: 'Retorno de Investimento Rápido',
          desc: `O payback de ${payback.toFixed(1)} meses é excelente! Você recuperará o capital investido em menos de um ano e meio.`
        });
      } else if (payback > 36) {
        recs.push({
          type: 'warning',
          icon: '⏳',
          title: 'Prazo de Retorno Longo (Payback)',
          desc: `O tempo de retorno de ${payback.toFixed(1)} meses supera 3 anos. Isso representa maior risco para investidores. Tente reduzir investimentos pré-operacionais.`
        });
      }

      if (roi >= 35) {
        recs.push({
          type: 'success',
          icon: '💰',
          title: 'Rentabilidade (ROI) Excelente',
          desc: `A taxa de retorno anual de ${roi.toFixed(1)}% é extremamente atrativa, superando de longe qualquer rendimento de renda fixa do mercado.`
        });
      }
    }

    // SWOT analysis check
    const swot = activePlan.swot;
    const totalSwotItems = (swot.strengths?.length || 0) + (swot.weaknesses?.length || 0) + (swot.opportunities?.length || 0) + (swot.threats?.length || 0);
    if (totalSwotItems < 4) {
      recs.push({
        type: 'info',
        icon: '🎯',
        title: 'Mapeie sua Matriz SWOT',
        desc: 'Você tem poucos itens na análise SWOT (FOFA). Mapear forças e fraquezas ajuda a prever riscos de concorrência e instabilidade do setor.'
      });
    }

    return recs;
  };

  const recommendations = getRecommendations();

  // Progress Bar styling color
  const getProgressColor = (pct) => {
    if (pct === 100) return 'var(--success)';
    if (pct > 30) return 'var(--primary)';
    return 'var(--warning)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. KPIs BAR */}
      <div className="dashboard-grid">
        
        <div className="dashboard-card investment">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Investimento Total</span>
            <div className="dashboard-card-icon">💸</div>
          </div>
          <span className="dashboard-card-value">
            {formatCurrency(calculated.totalInvestment)}
          </span>
          <div className="dashboard-card-meta">
            <span>Giro: {formatCurrency(calculated.workingCapitalTotal)}</span>
          </div>
        </div>

        <div className="dashboard-card revenue">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Faturamento Mensal</span>
            <div className="dashboard-card-icon">📈</div>
          </div>
          <span className="dashboard-card-value">
            {formatCurrency(calculated.projectedRevenue)}
          </span>
          <div className="dashboard-card-meta">
            <span>Lucro bruto: {formatCurrency(calculated.contributionMarginVal)}</span>
          </div>
        </div>

        <div className="dashboard-card profit">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Lucro Líquido Mensal</span>
            <div className="dashboard-card-icon">💰</div>
          </div>
          <span className={`dashboard-card-value ${calculated.netProfit >= 0 ? '' : 'negative'}`} style={{ color: calculated.netProfit < 0 ? 'var(--danger)' : 'var(--success)' }}>
            {formatCurrency(calculated.netProfit)}
          </span>
          <div className="dashboard-card-meta">
            <span>Lucratividade: {calculated.profitabilityPct.toFixed(1)}%</span>
          </div>
        </div>

        <div className="dashboard-card payback">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Retorno (Payback)</span>
            <div className="dashboard-card-icon">⏳</div>
          </div>
          <span className="dashboard-card-value">
            {calculated.netProfit > 0 ? `${calculated.paybackMonths.toFixed(1)} m` : 'N/A'}
          </span>
          <div className="dashboard-card-meta">
            <span>ROI anual: {calculated.roiPct.toFixed(1)}%</span>
          </div>
        </div>

      </div>

      {/* 2. CHARTS & PROGRESS */}
      <div className="charts-row">
        
        {/* Investment Breakdown Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Distribuição do Investimento Inicial</h3>
          </div>
          <div className="chart-body" style={{ minHeight: '180px' }}>
            {calculated.totalInvestment > 0 ? (
              <div className="chart-bar-list">
                <div className="chart-bar-item">
                  <div className="chart-bar-labels">
                    <span>Investimentos Fixos</span>
                    <span>{fixedInvestPct}% ({formatCurrency(calculated.fixedInvestmentsTotal)})</span>
                  </div>
                  <div className="chart-bar-track">
                    <div className="chart-bar-fill" style={{ width: `${fixedInvestPct}%`, backgroundColor: 'var(--secondary)' }} />
                  </div>
                </div>

                <div className="chart-bar-item">
                  <div className="chart-bar-labels">
                    <span>Capital de Giro</span>
                    <span>{workingCapitalPct}% ({formatCurrency(calculated.workingCapitalTotal)})</span>
                  </div>
                  <div className="chart-bar-track">
                    <div className="chart-bar-fill" style={{ width: `${workingCapitalPct}%`, backgroundColor: 'var(--primary)' }} />
                  </div>
                </div>

                <div className="chart-bar-item">
                  <div className="chart-bar-labels">
                    <span>Investimentos Pré-operacionais</span>
                    <span>{preOpInvestPct}% ({formatCurrency(calculated.preOperationalTotal)})</span>
                  </div>
                  <div className="chart-bar-track">
                    <div className="chart-bar-fill" style={{ width: `${preOpInvestPct}%`, backgroundColor: 'var(--warning)' }} />
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center' }}>
                Preencha os investimentos no Plano Financeiro para gerar o gráfico.
              </div>
            )}
          </div>
        </div>

        {/* Plan Section Progress */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Evolução por Módulo</h3>
          </div>
          <div className="chart-body" style={{ minHeight: '180px' }}>
            <div className="chart-bar-list">
              {[
                { label: '1. Identidade do Negócio', tab: 'identity', pct: progress.sections.identity || 0 },
                { label: '2. Resumo Executivo', tab: 'executive', pct: progress.sections.executive || 0 },
                { label: '3. Análise de Mercado', tab: 'market', pct: progress.sections.market || 0 },
                { label: '4. Matriz SWOT (FOFA)', tab: 'swot', pct: progress.sections.swot || 0 },
                { label: '5. Plano de Marketing', tab: 'marketing', pct: progress.sections.marketing || 0 },
                { label: '6. Plano Operacional', tab: 'operational', pct: progress.sections.operational || 0 },
                { label: '7. Plano Financeiro', tab: 'financial', pct: progress.sections.financial || 0 }
              ].map((item, idx) => (
                <div key={idx} className="chart-bar-item" style={{ cursor: 'pointer' }} onClick={() => setActiveTab(item.tab)}>
                  <div className="chart-bar-labels" style={{ fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-heading)', fontWeight: '600' }}>{item.label}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="chart-bar-track" style={{ height: '8px' }}>
                    <div className="chart-bar-fill" style={{ width: `${item.pct}%`, backgroundColor: getProgressColor(item.pct) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 3. RECOMMENDATIONS & VIABILITY ALERTS */}
      <div className="recommendations-card">
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>
          Análise de Viabilidade do Plano de Negócios
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Recomendações e alertas gerados automaticamente baseados na metodologia do Sebrae.
        </p>

        <div className="recommendations-list">
          {recommendations.map((rec, index) => (
            <div key={index} className={`recommendation-item ${rec.type}`}>
              <span className="rec-icon">{rec.icon}</span>
              <div className="rec-text">
                <span className="rec-title">{rec.title}</span>
                <span className="rec-desc">{rec.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

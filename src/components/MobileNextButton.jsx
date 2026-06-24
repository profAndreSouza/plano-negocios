import React from 'react';
import { usePlan } from '../context/PlanContext';

const MODULE_ORDER = [
  'dashboard',
  'identity',
  'executive',
  'market',
  'swot',
  'marketing',
  'operational',
  'financial',
  'report',
];

const MODULE_LABELS = {
  dashboard: 'Painel Geral',
  identity: '1. Identidade do Negócio',
  executive: '2. Resumo Executivo',
  market: '3. Análise de Mercado',
  swot: '4. Matriz SWOT',
  marketing: '5. Plano de Marketing',
  operational: '6. Plano Operacional',
  financial: '7. Plano Financeiro',
  report: 'Relatório Final',
};

export default function MobileNextButton() {
  const { activeTab, setActiveTab } = usePlan();

  const currentIndex = MODULE_ORDER.indexOf(activeTab);
  const nextTab = MODULE_ORDER[currentIndex + 1];

  // No next module (last page) — don't render
  if (!nextTab) return null;

  return (
    <div className="mobile-next-btn-wrapper">
      <button
        className="mobile-next-btn"
        onClick={() => {
          setActiveTab(nextTab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <span>{MODULE_LABELS[nextTab]}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

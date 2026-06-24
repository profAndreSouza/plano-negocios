import React, { useState } from 'react';
import { PlanProvider, usePlan } from './context/PlanContext';
import Sidebar from './components/Sidebar';
import ContextHelp from './components/ContextHelp';
import DashboardModule from './modules/DashboardModule';
import IdentityModule from './modules/IdentityModule';
import ExecutiveModule from './modules/ExecutiveModule';
import MarketModule from './modules/MarketModule';
import SWOTModule from './modules/SWOTModule';
import MarketingModule from './modules/MarketingModule';
import OperationalModule from './modules/OperationalModule';
import FinancialModule from './modules/FinancialModule';
import ReportModule from './modules/ReportModule';
import MobileNextButton from './components/MobileNextButton';

function AppContent() {
  const { activeTab, isHelpOpen, setIsHelpOpen, toasts, activePlan } = usePlan();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!activePlan) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h3>Carregando seus planos de negócios...</h3>
      </div>
    );
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardModule />;
      case 'identity':
        return <IdentityModule />;
      case 'executive':
        return <ExecutiveModule />;
      case 'market':
        return <MarketModule />;
      case 'swot':
        return <SWOTModule />;
      case 'marketing':
        return <MarketingModule />;
      case 'operational':
        return <OperationalModule />;
      case 'financial':
        return <FinancialModule />;
      case 'report':
        return <ReportModule />;
      default:
        return <DashboardModule />;
    }
  };

  const getModuleHeaderInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return { pre: 'Painel Geral', title: 'Status do Empreendimento', desc: 'Resumo executivo de indicadores financeiros, matriz SWOT e progresso geral.' };
      case 'identity':
        return { pre: 'Módulo 1', title: 'Identidade do Negócio', desc: 'Estruture o propósito, a razão jurídica, enquadramentos e sócios fundadores.' };
      case 'executive':
        return { pre: 'Módulo 2', title: 'Resumo Executivo', desc: 'Descreva a oportunidade identificada, problema, solução e diferenciais.' };
      case 'market':
        return { pre: 'Módulo 3', title: 'Análise de Mercado', desc: 'Estudo do público-alvo, benchmarking de concorrentes e parceiros fornecedores.' };
      case 'swot':
        return { pre: 'Módulo 4', title: 'Análise SWOT (FOFA)', desc: 'Mapeie o ambiente interno (forças/fraquezas) e externo (oportunidades/ameaças).' };
      case 'marketing':
        return { pre: 'Módulo 5', title: 'Plano de Marketing', desc: 'Catálogo de itens, estratégias de precificação, canais e divulgação.' };
      case 'operational':
        return { pre: 'Módulo 6', title: 'Plano Operacional', desc: 'Layout físico, capacidade produtiva máxima, processos e quadro de equipe.' };
      case 'financial':
        return { pre: 'Módulo 7', title: 'Plano Financeiro', desc: 'Investimentos, projeção de vendas, despesas recorrentes e DRE automático.' };
      case 'report':
        return { pre: 'Consolidação', title: 'Relatório Final', desc: 'Visualize e exporte o Plano de Negócios completo de acordo com as normas do Sebrae.' };
      default:
        return { pre: 'Builder', title: 'Plano de Negócios', desc: '' };
    }
  };

  const header = getModuleHeaderInfo();

  return (
    <div className="app-container">
      {/* Mobile Top Header */}
      <header className="mobile-top-bar">
        <button 
          className="menu-toggle-btn" 
          onClick={() => setIsSidebarOpen(true)}
          title="Menu de Navegação"
        >
          ☰
        </button>
        <span className="mobile-logo-text">BP Builder</span>
        <button 
          className="mobile-help-toggle" 
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          title="Alternar Ajuda"
        >
          💡
        </button>
      </header>

      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="main-wrapper">
        <main className="content-pane">
          <header className="module-header">
            <div className="module-title-section">
              <span className="module-pre">{header.pre}</span>
              <h1 className="module-title">{header.title}</h1>
              <p className="module-description">{header.desc}</p>
            </div>
            <div className="module-header-actions">
              <button 
                className="help-toggle"
                onClick={() => setIsHelpOpen(!isHelpOpen)}
              >
                {isHelpOpen ? 'Ocultar Ajuda' : '💡 Mostrar Ajuda'}
              </button>
            </div>
          </header>

          <div style={{ flexGrow: 1 }}>
            {renderActiveModule()}
          </div>
          <MobileNextButton />
        </main>
        <ContextHelp />
      </div>

      {/* Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>💾</span>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <PlanProvider>
      <AppContent />
    </PlanProvider>
  );
}

export default App;

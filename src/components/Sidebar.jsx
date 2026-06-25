import React, { useState } from 'react';
import { usePlan } from '../context/PlanContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const {
    plans,
    activePlanId,
    activePlan,
    setActivePlanId,
    createNewPlan,
    deletePlan,
    resetPlan,
    progress,
    activeTab,
    setActiveTab,
    isModalOpen,
    setIsModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = usePlan();

  const { user, signOut } = useAuth();

  const [newPlanName, setNewPlanName] = useState('');

  const menuItems = [
    { id: 'dashboard', label: 'Painel Geral', badge: '📊', isGlobal: true },
    { id: 'identity', label: '1. Identidade do Negócio', badge: '1', key: 'identity' },
    { id: 'executive', label: '2. Resumo Executivo', badge: '2', key: 'executive' },
    { id: 'market', label: '3. Análise de Mercado', badge: '3', key: 'market' },
    { id: 'swot', label: '4. Matriz SWOT (FOFA)', badge: '4', key: 'swot' },
    { id: 'marketing', label: '5. Plano de Marketing', badge: '5', key: 'marketing' },
    { id: 'operational', label: '6. Plano Operacional', badge: '6', key: 'operational' },
    { id: 'financial', label: '7. Plano Financeiro', badge: '7', key: 'financial' },
    { id: 'report', label: 'Relatório Final', badge: '📄', isGlobal: true }
  ];

  const handleCreatePlanSubmit = (e) => {
    e.preventDefault();
    if (newPlanName.trim()) {
      createNewPlan(newPlanName.trim());
      setNewPlanName('');
      setIsModalOpen(false);
    }
  };

  const handleResetClick = () => {
    if (window.confirm('Tem certeza de que deseja apagar todo o progresso do plano atual? Os dados preenchidos serão limpos.')) {
      resetPlan();
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Tem certeza de que deseja excluir permanentemente o plano "${activePlan?.name}"?`)) {
      deletePlan(activePlanId);
    }
  };

  // Helper to determine dot class based on percentage
  const getProgressDotClass = (pct) => {
    if (pct === 100) return 'nav-progress-dot completed';
    if (pct > 0) return 'nav-progress-dot in-progress';
    return 'nav-progress-dot';
  };

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">BP</div>
            <div className="logo-text">Business Plan Builder</div>
            <button 
              className="btn-close-sidebar" 
              onClick={() => setIsSidebarOpen(false)}
              title="Fechar Menu"
            >
              &times;
            </button>
          </div>
          
          <div className="plan-selector-container">
            <div className="plan-select-wrapper">
              <label className="plan-label">Selecione o Empreendimento</label>
              <div className="plan-select-control">
                <select
                  className="plan-dropdown"
                  value={activePlanId}
                  onChange={(e) => {
                    setActivePlanId(e.target.value);
                    setActiveTab('dashboard'); // reset to dashboard on switch
                  }}
                >
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn-new-plan"
                  title="Novo Plano de Negócios"
                  onClick={() => setIsModalOpen(true)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* User Auth Section */}
          <div className="sidebar-auth-section">
            {user ? (
              <div className="sidebar-auth-card authenticated">
                <div className="auth-user-info">
                  <span className="auth-avatar">👤</span>
                  <div className="auth-user-meta">
                    <span className="auth-user-email" title={user.email}>{user.email}</span>
                    <span className="auth-sync-status">☁️ Nuvem Ativa</span>
                  </div>
                </div>
                <button 
                  className="btn-auth-logout" 
                  onClick={() => {
                    signOut();
                  }} 
                  title="Sair da Conta"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="sidebar-auth-card unauthenticated">
                <p className="auth-prompt-text">
                  Salve na nuvem para acessar de qualquer lugar.
                </p>
                <button 
                  className="btn-auth-login" 
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  🔑 Entrar / Cadastrar
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const completionPct = item.isGlobal ? null : (progress.sections[item.key] || 0);

            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <span className="nav-badge-num">{item.badge}</span>
                <span>{item.label}</span>
                {completionPct !== null && (
                  <div 
                    className={getProgressDotClass(completionPct)} 
                    title={`${completionPct}% preenchido`}
                  />
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="global-progress">
            <div className="progress-info">
              <span>Progresso do Plano</span>
              <span>{progress.global}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress.global}%` }}
              />
            </div>
          </div>

          <div className="sidebar-actions">
            <button
              className="btn-sidebar-action"
              style={{ color: 'var(--text-muted)' }}
              onClick={handleResetClick}
              title="Reiniciar os campos do plano atual"
            >
              Limpar
            </button>
            <button
              className="btn-sidebar-action"
              style={{ color: 'var(--danger)' }}
              onClick={handleDeleteClick}
              title="Excluir o plano atual permanentemente"
            >
              Excluir
            </button>
          </div>
        </div>
      </aside>

      {/* New Plan Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Novo Plano de Negócios</h3>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreatePlanSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">
                    Nome do Plano / Empreendimento <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Minha Padaria Artesanal, Tech Solution SaaS..."
                    required
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                    autoFocus
                  />
                  <span className="form-help-inline">
                    Escolha um nome simples para identificar esta simulação de negócio.
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-confirm">
                  Criar Plano
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

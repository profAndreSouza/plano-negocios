import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function FinancialModule() {
  const { activePlan, updateActivePlan, calculated } = usePlan();

  if (!activePlan) return null;

  const { financial, marketing } = activePlan;
  const products = marketing.products || [];

  const handleFinancialChange = (field, value) => {
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        [field]: Number(value) || 0
      }
    }));
  };

  const handleTextChange = (field, value) => {
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        [field]: value
      }
    }));
  };

  // Fixed Investments
  const addFixedInvestment = () => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      value: 0
    };
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        fixedInvestments: [...(prev.financial.fixedInvestments || []), newItem]
      }
    }));
  };

  const removeFixedInvestment = (id) => {
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        fixedInvestments: (prev.financial.fixedInvestments || []).filter((i) => i.id !== id)
      }
    }));
  };

  const updateFixedInvestment = (id, field, value) => {
    const parsedVal = (field === 'quantity' || field === 'value') ? (Number(value) || 0) : value;
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        fixedInvestments: (prev.financial.fixedInvestments || []).map((item) =>
          item.id === id ? { ...item, [field]: parsedVal } : item
        )
      }
    }));
  };

  // Pre-operational Investments
  const addPreOperational = () => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      value: 0
    };
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        preOperational: [...(prev.financial.preOperational || []), newItem]
      }
    }));
  };

  const removePreOperational = (id) => {
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        preOperational: (prev.financial.preOperational || []).filter((i) => i.id !== id)
      }
    }));
  };

  const updatePreOperational = (id, field, value) => {
    const parsedVal = field === 'value' ? (Number(value) || 0) : value;
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        preOperational: (prev.financial.preOperational || []).map((item) =>
          item.id === id ? { ...item, [field]: parsedVal } : item
        )
      }
    }));
  };

  // Sales Projections (Quantities)
  const handleQuantityProjectionChange = (productId, qty) => {
    const parsedQty = Number(qty) || 0;
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        salesProjections: {
          ...(prev.financial.salesProjections || {}),
          [productId]: parsedQty
        }
      }
    }));
  };

  // Other Fixed Costs
  const updateOtherFixedCost = (id, value) => {
    const parsedVal = Number(value) || 0;
    updateActivePlan((prev) => ({
      financial: {
        ...prev.financial,
        otherFixedCosts: (prev.financial.otherFixedCosts || []).map((item) =>
          item.id === id ? { ...item, value: parsedVal } : item
        )
      }
    }));
  };

  const formatCurrency = (val) => {
    return (val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. INVESTIMENTOS INICIAIS */}
      <div className="content-card">
        <div className="card-title-section">
          <h2 className="card-title">1. Investimentos Iniciais</h2>
          <p className="card-subtitle">
            Calcule o capital necessário para estruturar a empresa antes de abrir as portas.
          </p>
        </div>

        {/* Fixed Investments Table */}
        <div className="list-builder">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-heading)' }}>Investimentos Fixos (Máquinas, Móveis, Ferramentas, Tecnologia)</h4>
            <button type="button" className="btn-add-row" onClick={addFixedInvestment}>
              + Adicionar Item Fixo
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(financial.fixedInvestments || []).map((item) => {
              const qty = Number(item.quantity) || 0;
              const val = Number(item.value) || 0;
              const life = Number(item.usefulLife) || 10;
              const sub = qty * val;
              const dep = sub / (life * 12);
              return (
                <div key={item.id} className="builder-item-row" style={{ padding: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1fr 1.2fr', gap: '12px', width: '100%', alignItems: 'end' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Descrição do Item</label>
                      <input
                        type="text"
                        className="form-input"
                        style={{ padding: '8px 10px', fontSize: '13px' }}
                        placeholder="Ex: Máquina de café expresso italiana"
                        value={item.description || ''}
                        onChange={(e) => updateFixedInvestment(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Qtd</label>
                      <input
                        type="number"
                        min="1"
                        className="form-input"
                        style={{ padding: '8px 10px', fontSize: '13px' }}
                        value={item.quantity || ''}
                        onChange={(e) => updateFixedInvestment(item.id, 'quantity', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Unitário (R$)</label>
                      <input
                        type="number"
                        min="0"
                        className="form-input"
                        style={{ padding: '8px 10px', fontSize: '13px' }}
                        placeholder="0,00"
                        value={item.value || ''}
                        onChange={(e) => updateFixedInvestment(item.id, 'value', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Vida Útil (Anos)</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        className="form-input"
                        style={{ padding: '8px 10px', fontSize: '13px' }}
                        value={item.usefulLife !== undefined ? item.usefulLife : 10}
                        onChange={(e) => updateFixedInvestment(item.id, 'usefulLife', e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ paddingBottom: '8px' }}>
                      <label className="form-label" style={{ fontSize: '11px' }}>Subtotal</label>
                      <span style={{ fontWeight: '700', fontSize: '13px' }}>
                        {formatCurrency(sub)}
                      </span>
                    </div>
                    <div className="form-group" style={{ paddingBottom: '8px' }}>
                      <label className="form-label" style={{ fontSize: '11px' }}>Depreciação/Mês</label>
                      <span style={{ fontWeight: '600', fontSize: '12px', color: 'var(--text-muted)' }} title="Valor acumulado reservado mensalmente">
                        {formatCurrency(dep)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-remove-row"
                    style={{ width: '32px', height: '32px', fontSize: '16px', marginBottom: '4px' }}
                    onClick={() => removeFixedInvestment(item.id)}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
            {(financial.fixedInvestments || []).length === 0 && (
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '13px' }}>
                Nenhum investimento fixo adicionado.
              </div>
            )}
          </div>
        </div>

        {/* Pre-operational Investments Table */}
        <div className="list-builder" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-heading)' }}>Investimentos Pré-operacionais (Reformas, Registro, Marketing de Lançamento)</h4>
            <button type="button" className="btn-add-row" onClick={addPreOperational}>
              + Adicionar Item Pré-op
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(financial.preOperational || []).map((item) => (
              <div key={item.id} className="builder-item-row" style={{ padding: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: '16px', width: '100%', alignItems: 'end' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px' }}>Descrição do Custo</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '8px 12px' }}
                      placeholder="Ex: Registro da marca, abertura de CNPJ, pintura do imóvel..."
                      value={item.description || ''}
                      onChange={(e) => updatePreOperational(item.id, 'description', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px' }}>Valor (R$)</label>
                    <input
                      type="number"
                      min="0"
                      className="form-input"
                      style={{ padding: '8px 12px' }}
                      placeholder="0,00"
                      value={item.value || ''}
                      onChange={(e) => updatePreOperational(item.id, 'value', e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-remove-row"
                  style={{ width: '36px', height: '36px' }}
                  onClick={() => removePreOperational(item.id)}
                >
                  &times;
                </button>
              </div>
            ))}
            {(financial.preOperational || []).length === 0 && (
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '13px' }}>
                Nenhum investimento pré-operacional adicionado.
              </div>
            )}
          </div>
        </div>

        {/* Working Capital Form */}
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '12px' }}>Capital de Giro Estimado</h4>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Estoque Inicial Recomendado (R$)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="0,00"
                value={financial.workingCapitalStock || ''}
                onChange={(e) => handleFinancialChange('workingCapitalStock', e.target.value)}
              />
              <span className="form-help-inline">Custo inicial de insumos para os primeiros dias de atividade.</span>
            </div>
            <div className="form-group">
              <label className="form-label">Reserva de Caixa / Giro Mínimo (R$)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="0,00"
                value={financial.workingCapitalCash || ''}
                onChange={(e) => handleFinancialChange('workingCapitalCash', e.target.value)}
              />
              <span className="form-help-inline">Reserva para pagar despesas básicas antes de faturar.</span>
            </div>
          </div>
        </div>

        {/* Sources of Funds Form (from Sebrae Excel template) */}
        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '12px' }}>Fontes de Recursos (Origem do Capital)</h4>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Recursos Próprios (R$)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="0,00"
                value={financial.equityFunds || ''}
                onChange={(e) => handleFinancialChange('equityFunds', e.target.value)}
              />
              <span className="form-help-inline">Capital social aportado diretamente pelos sócios.</span>
            </div>
            <div className="form-group">
              <label className="form-label">Recursos de Terceiros (Empréstimos/Investidores) (R$)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="0,00"
                value={financial.debtFunds || ''}
                onChange={(e) => handleFinancialChange('debtFunds', e.target.value)}
              />
              <span className="form-help-inline">Linhas de crédito comerciais, financiamento.</span>
            </div>
            <div className="form-group">
              <label className="form-label">Outras Fontes (BNDES/Fomento/Subsídio) (R$)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="0,00"
                value={financial.otherFunds || ''}
                onChange={(e) => handleFinancialChange('otherFunds', e.target.value)}
              />
              <span className="form-help-inline">Recursos governamentais de apoio, subvenção.</span>
            </div>
          </div>
        </div>

        {/* Total Investment Summary */}
        {(() => {
          const totalFunds = (financial.equityFunds || 0) + (financial.debtFunds || 0) + (financial.otherFunds || 0);
          const diff = totalFunds - calculated.totalInvestment;
          const showFundingWarning = calculated.totalInvestment > 0 && Math.abs(diff) > 10;

          return (
            <>
              {showFundingWarning && (
                <div 
                  style={{ 
                    marginTop: '16px', 
                    padding: '12px 16px', 
                    backgroundColor: 'var(--warning-light)', 
                    border: '1px solid var(--warning-border)', 
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    color: '#9a3412',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  ⚠️ <strong>Aviso sobre Origem dos Recursos:</strong> A soma dos recursos declarados ({formatCurrency(totalFunds)}) difere do Investimento Total Estimado ({formatCurrency(calculated.totalInvestment)}). 
                  {diff < 0 ? ` Faltam ${formatCurrency(Math.abs(diff))} para cobrir todo o investimento.` : ` Há uma sobra de ${formatCurrency(diff)} em relação ao necessário.`}
                </div>
              )}

              <div 
                style={{ 
                  marginTop: '24px', 
                  padding: '20px', 
                  backgroundColor: 'var(--secondary-light)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid rgba(2,132,199,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--secondary)' }}>INVESTIMENTO TOTAL ESTIMADO</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Soma dos investimentos fixos, pré-operacionais e capital de giro.</p>
                </div>
                <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-heading)' }}>
                  {formatCurrency(calculated.totalInvestment)}
                </span>
              </div>
            </>
          );
        })()}
      </div>

      {/* 2. PROJEÇÃO DE FATURAMENTO E CUSTOS VARIÁVEIS */}
      <div className="content-card">
        <div className="card-title-section">
          <h2 className="card-title">2. Projeção de Faturamento e Custos Variáveis</h2>
          <p className="card-subtitle">
            Estime quantas unidades você planeja vender mensalmente para cada produto cadastrado.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="matrix-table-wrapper">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Nome do Produto/Serviço</th>
                  <th>Preço Unitário de Venda</th>
                  <th>Custo Unitário da Mercadoria (CMV)</th>
                  <th style={{ width: '20%' }}>Volume de Vendas Projetado (Mês)</th>
                  <th style={{ textAlign: 'right' }}>Faturamento Mensal Estimado</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => {
                  const qty = financial.salesProjections[prod.id] || 0;
                  const itemRevenue = qty * Number(prod.salePrice);
                  return (
                    <tr key={prod.id}>
                      <td style={{ fontWeight: '600' }}>{prod.name}</td>
                      <td>{formatCurrency(prod.salePrice)}</td>
                      <td>{formatCurrency(prod.costPrice)}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          className="form-input"
                          style={{ padding: '6px 12px', width: '120px' }}
                          value={qty || ''}
                          placeholder="Qtd vendida"
                          onChange={(e) => handleQuantityProjectionChange(prod.id, e.target.value)}
                        />
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '700' }}>
                        {formatCurrency(itemRevenue)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '14px' }}>
            Nenhum produto cadastrado no Plano de Marketing ainda. Acesse a etapa "5. Plano de Marketing" para registrar seus produtos antes de preencher as projeções de vendas.
          </div>
        )}

        <div className="form-row" style={{ marginTop: '16px' }}>
          <div className="form-group">
            <label className="form-label">Alíquota de Imposto Estimada (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="form-input"
              value={financial.taxRate || ''}
              onChange={(e) => handleFinancialChange('taxRate', e.target.value)}
            />
            <span className="form-help-inline">Ex: Simples Nacional comércio começa em 4%, serviços em 6%.</span>
          </div>

          <div className="form-group">
            <label className="form-label">Comissões de Vendas / Taxas de Cartão (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="form-input"
              value={financial.commissionRate || ''}
              onChange={(e) => handleFinancialChange('commissionRate', e.target.value)}
            />
            <span className="form-help-inline">Ex: Taxa média de cartão de crédito e débito chaves para a operação.</span>
          </div>
        </div>

        <div 
          style={{ 
            marginTop: '16px', 
            padding: '16px', 
            backgroundColor: 'var(--bg-main)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px'
          }}
        >
          <div>
            <span style={{ fontWeight: '700', color: 'var(--text-heading)' }}>Faturamento Mensal Projetado:</span>
            <span style={{ marginLeft: '8px', fontWeight: '800', color: 'var(--primary)' }}>
              {formatCurrency(calculated.projectedRevenue)}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--text-heading)' }}>Custos Variáveis Mensais (CMV + Imposto + Comissões):</span>
            <span style={{ marginLeft: '8px', fontWeight: '800', color: 'var(--danger)' }}>
              {formatCurrency(calculated.totalVariableCosts)}
            </span>
          </div>
        </div>
      </div>

      {/* 3. CUSTOS FIXOS OPERACIONAIS */}
      <div className="content-card">
        <div className="card-title-section">
          <h2 className="card-title">3. Custos Fixos Operacionais</h2>
          <p className="card-subtitle">
            Defina as contas fixas recorrentes que precisam ser pagas mensalmente, independente do volume de vendas.
          </p>
        </div>

        {/* Personnel Payroll & Social Charges Block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          <div 
            style={{ 
              padding: '20px', 
              backgroundColor: 'var(--bg-main)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)' }}>Gastos com Pessoal (Salários + Encargos Trabalhistas)</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cálculo automatizado a partir do pessoal inserido no Plano Operacional.</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              <span>Salários Base Mensais:</span>
              <span style={{ fontWeight: '600' }}>
                {formatCurrency(activePlan.operational.personnel.reduce((sum, p) => sum + (Number(p.salary) * Number(p.quantity) || 0), 0))}
              </span>
            </div>

            <div className="form-group" style={{ gap: '4px' }}>
              <label className="form-label" style={{ fontSize: '12px' }}>Taxa de Encargos Sociais e Trabalhistas (%)</label>
              <input
                type="number"
                step="1"
                min="0"
                className="form-input"
                style={{ padding: '6px 12px', width: '120px' }}
                value={financial.payrollChargesRate !== undefined ? financial.payrollChargesRate : 79}
                onChange={(e) => handleFinancialChange('payrollChargesRate', e.target.value)}
              />
              <span className="form-help-inline" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                O padrão recomendado pelo Sebrae é de <strong>79%</strong> (para cobrir encargos como 13º, férias, FGTS, INSS, rescisão).
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-heading)' }}>Total Pessoal + Encargos:</span>
              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>
                {formatCurrency(calculated.payrollTotal)}
              </span>
            </div>
          </div>

          <div 
            style={{ 
              padding: '20px', 
              backgroundColor: 'var(--bg-main)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              flexDirection: 'column',
              gap: '12px',
              minHeight: '210px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)' }}>Depreciação Mensal de Ativos</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Custo fixo correspondente à perda de valor dos seus bens materiais (calculado pela vida útil em anos).</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total de Bens Fixos Investidos:</span>
                <span>{formatCurrency(calculated.fixedInvestmentsTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-heading)' }}>Reserva de Depreciação Mensal:</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>
                  {formatCurrency(calculated.depreciationTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Fixed Expenses list */}
        <div style={{ marginTop: '16px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '12px' }}>Outras Despesas Fixas Mensais</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {(financial.otherFixedCosts || []).map((item) => (
              <div key={item.id} className="form-group">
                <label className="form-label" style={{ fontSize: '13px', fontWeight: '600' }}>{item.description}</label>
                <input
                  type="number"
                  min="0"
                  className="form-input"
                  style={{ padding: '8px 12px' }}
                  value={item.value || ''}
                  onChange={(e) => updateOtherFixedCost(item.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div 
          style={{ 
            marginTop: '16px', 
            padding: '16px', 
            backgroundColor: 'var(--bg-main)', 
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)' }}>Custo Fixo Mensal Total (Pessoal + Depreciação + Despesas):</span>
          <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-heading)' }}>
            {formatCurrency(calculated.totalFixedCosts)}
          </span>
        </div>
      </div>

      {/* 4. DEMONSTRATIVO DE RESULTADOS (DRE) E MÉTRIAS */}
      <div className="content-card">
        <div className="card-title-section">
          <h2 className="card-title">4. Demonstração do Resultado do Exercício (DRE Simplificado)</h2>
          <p className="card-subtitle">
            O DRE apresenta se o seu negócio é lucrativo com base nas suas projeções mensais.
          </p>
        </div>

        <table className="dre-table">
          <tbody>
            {calculated.dre && calculated.dre.map((row, idx) => {
              let rowClass = 'dre-row-item';
              if (row.type === 'header') rowClass = 'dre-row-header';
              else if (row.type === 'subtotal') rowClass = 'dre-row-subtotal';
              else if (row.type === 'final') {
                rowClass = calculated.netProfit >= 0 ? 'dre-row-final positive' : 'dre-row-final negative';
              }

              return (
                <tr key={idx} className={rowClass}>
                  <td>{row.label}</td>
                  <td className="dre-value">
                    {formatCurrency(row.value)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Live Viability Indicators Grid */}
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '16px' }}>Indicadores de Viabilidade</h3>
          
          <div className="financial-kpis-bar">
            <div className="financial-kpi-card">
              <span className="kpi-card-label">Ponto de Equilíbrio</span>
              <span className="kpi-card-value">
                {formatCurrency(calculated.breakEvenPointVal)}
              </span>
              <span className="kpi-card-desc">Faturamento mínimo para não ter prejuízo</span>
            </div>

            <div className="financial-kpi-card">
              <span className="kpi-card-label">Lucratividade</span>
              <span className={`kpi-card-value ${calculated.profitabilityPct >= 15 ? 'positive' : calculated.profitabilityPct > 0 ? '' : 'negative'}`}>
                {calculated.profitabilityPct.toFixed(1)}%
              </span>
              <span className="kpi-card-desc">Margem líquida do negócio (Recomenda-se &gt; 15%)</span>
            </div>

            <div className="financial-kpi-card">
              <span className="kpi-card-label">Rentabilidade Anual (ROI)</span>
              <span className={`kpi-card-value ${calculated.roiPct >= 20 ? 'positive' : calculated.roiPct > 0 ? '' : 'negative'}`}>
                {calculated.roiPct.toFixed(1)}%
              </span>
              <span className="kpi-card-desc">Retorno anual sobre o investimento total</span>
            </div>

            <div className="financial-kpi-card">
              <span className="kpi-card-label">Prazo de Retorno (Payback)</span>
              <span className="kpi-card-value">
                {calculated.netProfit > 0 
                  ? `${calculated.paybackMonths.toFixed(1)} meses` 
                  : 'N/A'
                }
              </span>
              <span className="kpi-card-desc">Tempo para recuperar o investimento inicial</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

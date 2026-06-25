import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const PlanContext = createContext();

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial template for a new Business Plan
const createBlankPlan = (name) => {
  const id = generateId();
  return {
    id,
    name: name || 'Meu Plano de Negócios',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    identity: {
      name: '',
      mission: '',
      vision: '',
      values: '',
      objectives: '',
      differentials: '',
      activitySectors: [], // e.g. ['servicos', 'comercio']
      legalForm: '',
      taxRegime: '',
      partners: [] // { id, name, role, experience }
    },
    executive: {
      opportunity: '',
      problem: '',
      solution: '',
      targetMarket: '',
      marketPotential: ''
    },
    market: {
      customerProfile: '',
      competitors: [], // { id, name, price, quality, service, location, strengths, weaknesses }
      suppliers: [] // { id, name, items, terms, quality }
    },
    swot: {
      strengths: [], // array of strings
      weaknesses: [],
      opportunities: [],
      threats: []
    },
    marketing: {
      products: [], // { id, name, description, costPrice, salePrice, channel }
      promotions: '',
      channels: '',
      locationRationale: ''
    },
    operational: {
      layoutDesc: '',
      maxCapacity: '',
      initialProduction: '',
      processes: [], // { id, step, description, responsible }
      personnel: [] // { id, role, salary, quantity }
    },
    financial: {
      fixedInvestments: [], // { id, description, quantity, value, usefulLife: 10 }
      preOperational: [], // { id, description, value }
      workingCapitalStock: 0,
      workingCapitalCash: 0,
      equityFunds: 0, // Recursos Próprios
      debtFunds: 0, // Recursos de Terceiros
      otherFunds: 0, // Outros/BNDES
      payrollChargesRate: 79, // default 79% encargos sociais Sebrae
      otherFixedCosts: [
        { id: '1', description: 'Aluguel e condomínio', value: 0 },
        { id: '2', description: 'Água e IPTU', value: 0 },
        { id: '3', description: 'Energia elétrica', value: 0 },
        { id: '4', description: 'Telefone, internet e software', value: 0 },
        { id: '5', description: 'Honorários do contador', value: 0 },
        { id: '6', description: 'Pró-labore dos sócios', value: 0 },
        { id: '7', description: 'Manutenção de equipamentos', value: 0 },
        { id: '8', description: 'Materiais de limpeza e copa', value: 0 },
        { id: '9', description: 'Materiais de escritório', value: 0 },
        { id: '10', description: 'Combustível e locomoção', value: 0 },
        { id: '11', description: 'Taxas diversas e seguros', value: 0 },
        { id: '12', description: 'Outras despesas operacionais', value: 0 }
      ],
      salesProjections: {}, // { [productId]: monthlyQuantity }
      taxRate: 6, // default e.g. 6% (Simples Nacional comércio)
      commissionRate: 0 // default 0%
    }
  };
};

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [activePlanId, setActivePlanId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isHelpOpen, setIsHelpOpen] = useState(true);
  const [toasts, setToasts] = useState([]);

  const { user, loading: authLoading } = useAuth();

  // Load plans from Supabase or localStorage based on Auth State
  useEffect(() => {
    if (authLoading) return;

    const fetchPlansFromSupabase = async (userId) => {
      try {
        const { data, error } = await supabase
          .from('plans')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const fetchedPlans = data.map((row) => ({
            ...row.data,
            id: row.id,
            name: row.name,
            createdAt: row.created_at || row.data.createdAt,
            updatedAt: row.updated_at || row.data.updatedAt
          }));
          setPlans(fetchedPlans);
          setActivePlanId(fetchedPlans[0].id);
        } else {
          // If Supabase database is empty, sync local guest plans to cloud
          const localPlans = JSON.parse(localStorage.getItem('bp_plans') || '[]');
          if (localPlans.length > 0) {
            showToast('Sincronizando seus planos locais com a nuvem...', 'info');
            const upsertPromises = localPlans.map(plan => {
              return supabase.from('plans').upsert({
                id: plan.id,
                user_id: userId,
                name: plan.name,
                data: plan,
                updated_at: new Date().toISOString()
              });
            });
            await Promise.all(upsertPromises);
            setPlans(localPlans);
            setActivePlanId(localPlans[0].id);
            showToast('Planos sincronizados com sucesso!', 'success');
          } else {
            // Create a default first plan on cloud
            const defaultPlan = createBlankPlan('Meu Primeiro Negócio');
            const { error: insertError } = await supabase.from('plans').insert({
              id: defaultPlan.id,
              user_id: userId,
              name: defaultPlan.name,
              data: defaultPlan,
              updated_at: defaultPlan.updatedAt
            });
            if (insertError) throw insertError;
            setPlans([defaultPlan]);
            setActivePlanId(defaultPlan.id);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar planos do Supabase', err);
        showToast('Erro ao carregar dados da nuvem. Exibindo dados locais offline.', 'danger');
        loadLocalStoragePlans();
      }
    };

    const loadLocalStoragePlans = () => {
      const storedPlans = localStorage.getItem('bp_plans');
      if (storedPlans) {
        try {
          const parsed = JSON.parse(storedPlans);
          setPlans(parsed);
          if (parsed.length > 0) {
            setActivePlanId(parsed[0].id);
          }
        } catch (e) {
          console.error('Erro ao ler planos do localStorage', e);
        }
      } else {
        const defaultPlan = createBlankPlan('Meu Primeiro Negócio');
        setPlans([defaultPlan]);
        setActivePlanId(defaultPlan.id);
        localStorage.setItem('bp_plans', JSON.stringify([defaultPlan]));
      }
    };

    if (user) {
      fetchPlansFromSupabase(user.id);
    } else {
      loadLocalStoragePlans();
    }
  }, [user, authLoading]);

  // Show a toast message
  const showToast = (message, type = 'success') => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Active plan reference
  const activePlan = plans.find((p) => p.id === activePlanId) || null;

  // Create a new business plan
  const createNewPlan = async (name) => {
    const newPlan = createBlankPlan(name);
    const updated = [newPlan, ...plans];
    setPlans(updated);
    setActivePlanId(newPlan.id);
    localStorage.setItem('bp_plans', JSON.stringify(updated));

    if (user) {
      try {
        const { error } = await supabase.from('plans').insert({
          id: newPlan.id,
          user_id: user.id,
          name: newPlan.name,
          data: newPlan,
          updated_at: newPlan.updatedAt
        });
        if (error) throw error;
        showToast(`Plano "${name}" criado na nuvem!`);
      } catch (err) {
        console.error('Erro ao criar plano no Supabase', err);
        showToast('Criado localmente. Erro ao salvar na nuvem.', 'warning');
      }
    } else {
      showToast(`Plano "${name}" criado localmente!`);
    }
  };

  // Delete a business plan
  const deletePlan = async (id) => {
    if (plans.length <= 1) {
      showToast('Você deve manter pelo menos um plano de negócios.', 'warning');
      return;
    }
    const planToDelete = plans.find((p) => p.id === id);
    const filtered = plans.filter((p) => p.id !== id);
    setPlans(filtered);
    setActivePlanId(filtered[0].id);
    localStorage.setItem('bp_plans', JSON.stringify(filtered));

    if (user) {
      try {
        const { error } = await supabase.from('plans').delete().eq('id', id);
        if (error) throw error;
        showToast(`Plano "${planToDelete?.name || ''}" excluído da nuvem.`);
      } catch (err) {
        console.error('Erro ao excluir plano no Supabase', err);
        showToast('Excluído localmente. Erro ao remover da nuvem.', 'warning');
      }
    } else {
      showToast('Plano de negócios excluído localmente.');
    }
  };

  // Update active plan data
  const updateActivePlan = async (updater) => {
    if (!activePlanId) return;

    const currentPlan = plans.find(p => p.id === activePlanId);
    if (!currentPlan) return;

    const updatedData = updater(currentPlan);
    const updatedPlan = {
      ...currentPlan,
      ...updatedData,
      updatedAt: new Date().toISOString()
    };

    // Update state and cache
    const updatedPlans = plans.map(p => p.id === activePlanId ? updatedPlan : p);
    setPlans(updatedPlans);
    localStorage.setItem('bp_plans', JSON.stringify(updatedPlans));

    if (user) {
      try {
        const { error } = await supabase.from('plans').upsert({
          id: updatedPlan.id,
          user_id: user.id,
          name: updatedPlan.name || updatedPlan.identity?.name || 'Sem nome',
          data: updatedPlan,
          updated_at: updatedPlan.updatedAt
        });
        if (error) throw error;
      } catch (err) {
        console.error('Erro ao salvar no Supabase', err);
      }
    }
  };

  // Reset current plan
  const resetPlan = async () => {
    if (!activePlan) return;
    const blank = createBlankPlan(activePlan.name);
    blank.id = activePlan.id;

    const updatedPlans = plans.map((p) => (p.id === activePlan.id ? blank : p));
    setPlans(updatedPlans);
    localStorage.setItem('bp_plans', JSON.stringify(updatedPlans));

    if (user) {
      try {
        const { error } = await supabase.from('plans').upsert({
          id: blank.id,
          user_id: user.id,
          name: blank.name,
          data: blank,
          updated_at: blank.updatedAt
        });
        if (error) throw error;
        showToast('Progresso do plano reiniciado na nuvem.', 'info');
      } catch (err) {
        console.error('Erro ao reiniciar plano no Supabase', err);
        showToast('Reiniciado localmente. Erro ao salvar na nuvem.', 'warning');
      }
    } else {
      showToast('Progresso do plano reiniciado localmente.', 'info');
    }
  };

  // Helper function to check filling completeness of each section
  const getProgress = (plan) => {
    if (!plan) return { global: 0, sections: {} };

    const checkFilled = (val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'string') return val.trim().length > 0;
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'number') return val > 0;
      if (typeof val === 'object') return Object.keys(val).length > 0;
      return false;
    };

    const sections = {
      identity: 0,
      executive: 0,
      market: 0,
      swot: 0,
      marketing: 0,
      operational: 0,
      financial: 0
    };

    // Identity progress
    const identityFields = [
      plan.identity.name,
      plan.identity.mission,
      plan.identity.vision,
      plan.identity.values,
      plan.identity.legalForm,
      plan.identity.taxRegime,
      plan.identity.partners
    ];
    const filledIdentity = identityFields.filter(checkFilled).length;
    sections.identity = Math.round((filledIdentity / identityFields.length) * 100);

    // Executive progress
    const execFields = [
      plan.executive.opportunity,
      plan.executive.problem,
      plan.executive.solution,
      plan.executive.targetMarket,
      plan.executive.marketPotential
    ];
    const filledExec = execFields.filter(checkFilled).length;
    sections.executive = Math.round((filledExec / execFields.length) * 100);

    // Market Progress
    const marketFields = [
      plan.market.customerProfile,
      plan.market.competitors,
      plan.market.suppliers
    ];
    const filledMarket = marketFields.filter(checkFilled).length;
    sections.market = Math.round((filledMarket / marketFields.length) * 100);

    // SWOT progress
    const swotCount =
      plan.swot.strengths.length +
      plan.swot.weaknesses.length +
      plan.swot.opportunities.length +
      plan.swot.threats.length;
    sections.swot = swotCount >= 4 ? 100 : Math.round((swotCount / 4) * 100);

    // Marketing progress
    const marketingFields = [
      plan.marketing.products,
      plan.marketing.promotions,
      plan.marketing.channels,
      plan.marketing.locationRationale
    ];
    const filledMarketing = marketingFields.filter(checkFilled).length;
    sections.marketing = Math.round((filledMarketing / marketingFields.length) * 100);

    // Operational progress
    const operationalFields = [
      plan.operational.layoutDesc,
      plan.operational.maxCapacity,
      plan.operational.initialProduction,
      plan.operational.processes,
      plan.operational.personnel
    ];
    const filledOperational = operationalFields.filter(checkFilled).length;
    sections.operational = Math.round((filledOperational / operationalFields.length) * 100);

    // Financial progress
    const financialFields = [
      plan.financial.fixedInvestments,
      plan.financial.preOperational,
      plan.financial.workingCapitalStock || plan.financial.workingCapitalCash,
      Object.keys(plan.financial.salesProjections).length
    ];
    const filledFinancial = financialFields.filter(checkFilled).length;
    sections.financial = Math.round((filledFinancial / financialFields.length) * 100);

    // Global completion average
    const keys = Object.keys(sections);
    const global = Math.round(keys.reduce((sum, key) => sum + sections[key], 0) / keys.length);

    return { global, sections };
  };

  // Financial calculation engine
  const getCalculatedFinancials = (plan) => {
    if (!plan) return {};

    // 1. Fixed Investments
    const fixedInvestmentsTotal = plan.financial.fixedInvestments.reduce(
      (sum, item) => sum + (Number(item.quantity) * Number(item.value) || 0),
      0
    );

    // 2. Pre-operational Investments
    const preOperationalTotal = plan.financial.preOperational.reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0
    );

    // 3. Working Capital
    const workingCapitalTotal =
      (Number(plan.financial.workingCapitalStock) || 0) +
      (Number(plan.financial.workingCapitalCash) || 0);

    // 4. Total Initial Investment
    const totalInvestment = fixedInvestmentsTotal + preOperationalTotal + workingCapitalTotal;

    // 5. Projected Monthly Revenue & Cost of Goods Sold (COGS)
    let projectedRevenue = 0;
    let costOfGoodsSold = 0;

    plan.marketing.products.forEach((product) => {
      const q = Number(plan.financial.salesProjections[product.id]) || 0;
      projectedRevenue += q * (Number(product.salePrice) || 0);
      costOfGoodsSold += q * (Number(product.costPrice) || 0);
    });

    // 6. Variable Costs
    const taxRate = Number(plan.financial.taxRate) || 0;
    const commissionRate = Number(plan.financial.commissionRate) || 0;

    const taxesTotal = projectedRevenue * (taxRate / 100);
    const commissionsTotal = projectedRevenue * (commissionRate / 100);

    const totalVariableCosts = costOfGoodsSold + taxesTotal + commissionsTotal;

    // Contribution Margin
    const contributionMarginVal = projectedRevenue - totalVariableCosts;
    const contributionMarginPct = projectedRevenue > 0 ? (contributionMarginVal / projectedRevenue) * 100 : 0;

    // 7. Fixed Costs
    // Personnel payroll (includes payroll charges rate, e.g., 79% default)
    const payrollChargesRate = plan.financial.payrollChargesRate !== undefined ? plan.financial.payrollChargesRate : 79;
    const basePayrollTotal = plan.operational.personnel.reduce(
      (sum, p) => sum + (Number(p.salary) * Number(p.quantity) || 0),
      0
    );
    const payrollTotal = basePayrollTotal * (1 + payrollChargesRate / 100);

    // Depreciation of Fixed Investments (Calculated monthly based on usefulLife in years, default 10)
    const depreciationTotal = plan.financial.fixedInvestments.reduce((sum, item) => {
      const value = Number(item.value) || 0;
      const quantity = Number(item.quantity) || 0;
      const usefulLife = Number(item.usefulLife) || 10;
      return sum + ((value * quantity) / (usefulLife * 12));
    }, 0);

    // Other fixed costs
    const otherFixedCostsTotal = plan.financial.otherFixedCosts.reduce(
      (sum, item) => sum + (Number(item.value) || 0),
      0
    );

    const totalFixedCosts = payrollTotal + otherFixedCostsTotal + depreciationTotal;

    // 8. Profitability Metrics
    const netProfit = projectedRevenue - totalVariableCosts - totalFixedCosts;
    const profitabilityPct = projectedRevenue > 0 ? (netProfit / projectedRevenue) * 100 : 0;

    // ROI = (Annual Profit / Total Investment) * 100
    const annualProfit = netProfit * 12;
    const roiPct = totalInvestment > 0 ? (annualProfit / totalInvestment) * 100 : 0;

    // Payback Period (in months) = Total Investment / Monthly Net Profit
    const paybackMonths = netProfit > 0 ? totalInvestment / netProfit : 0;

    // Break-even Point = Fixed Costs / Contribution Margin %
    const breakEvenPointVal = contributionMarginPct > 0 ? totalFixedCosts / (contributionMarginPct / 100) : 0;

    // 9. DRE Structure
    const dre = [
      { label: '(+) Receita Bruta de Vendas', value: projectedRevenue, type: 'header' },
      { label: '(-) Custos de Vendas (Matéria-prima/Insumos)', value: costOfGoodsSold, type: 'item' },
      { label: '(-) Tributos sobre Vendas', value: taxesTotal, type: 'item' },
      { label: '(-) Comissões e taxas de comercialização', value: commissionsTotal, type: 'item' },
      { label: '(=) Margem de Contribuição', value: contributionMarginVal, type: 'subtotal' },
      { label: `(-) Gastos com Pessoal (Salários + Encargos de ${payrollChargesRate}%)`, value: payrollTotal, type: 'item' },
      { label: '(-) Depreciação Mensal de Ativos', value: depreciationTotal, type: 'item' },
      { label: '(-) Outros Custos Operacionais Fixos', value: otherFixedCostsTotal, type: 'item' },
      { label: '(=) Lucro Líquido', value: netProfit, type: 'final' }
    ];

    return {
      fixedInvestmentsTotal,
      preOperationalTotal,
      workingCapitalTotal,
      totalInvestment,
      projectedRevenue,
      costOfGoodsSold,
      taxesTotal,
      commissionsTotal,
      totalVariableCosts,
      contributionMarginVal,
      contributionMarginPct,
      payrollTotal,
      depreciationTotal,
      otherFixedCostsTotal,
      totalFixedCosts,
      netProfit,
      profitabilityPct,
      roiPct,
      paybackMonths,
      breakEvenPointVal,
      dre
    };
  };


  const calculated = getCalculatedFinancials(activePlan);
  const progress = getProgress(activePlan);

  return (
    <PlanContext.Provider
      value={{
        plans,
        activePlanId,
        activePlan,
        setActivePlanId,
        createNewPlan,
        deletePlan,
        updateActivePlan,
        resetPlan,
        calculated,
        progress,
        isModalOpen,
        setIsModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        activeTab,
        setActiveTab,
        isHelpOpen,
        setIsHelpOpen,
        toasts
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan deve ser usado dentro de um PlanProvider');
  }
  return context;
};

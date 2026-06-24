import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function MarketingModule() {
  const { activePlan, updateActivePlan } = usePlan();

  if (!activePlan) return null;

  const { marketing } = activePlan;

  const handleChange = (field, value) => {
    updateActivePlan((prev) => ({
      marketing: {
        ...prev.marketing,
        [field]: value
      }
    }));
  };

  const addProduct = () => {
    const newProd = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      costPrice: 0,
      salePrice: 0,
      channel: ''
    };
    handleChange('products', [...(marketing.products || []), newProd]);
  };

  const removeProduct = (id) => {
    const updatedProducts = (marketing.products || []).filter((p) => p.id !== id);
    
    // Also clean up any sales projections for this deleted product
    updateActivePlan((prev) => {
      const updatedProjections = { ...prev.financial.salesProjections };
      delete updatedProjections[id];
      return {
        marketing: {
          ...prev.marketing,
          products: updatedProducts
        },
        financial: {
          ...prev.financial,
          salesProjections: updatedProjections
        }
      };
    });
  };

  const updateProduct = (id, field, value) => {
    // Cast to number for prices
    const parsedVal = (field === 'costPrice' || field === 'salePrice') ? (Number(value) || 0) : value;
    
    const updated = (marketing.products || []).map((p) =>
      p.id === id ? { ...p, [field]: parsedVal } : p
    );
    handleChange('products', updated);
  };

  return (
    <div className="content-card">
      <div className="card-title-section">
        <h2 className="card-title">Plano de Marketing</h2>
        <p className="card-subtitle">
          Esboce sua linha de produtos/serviços, precificação estratégica e as ações promocionais para captar clientes.
        </p>
      </div>

      {/* Products & Services List Builder */}
      <div className="list-builder">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-heading)' }}>Produtos e Serviços Cadastrados <span className="required-star">*</span></h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Cadastre o catálogo inicial. Os valores inseridos serão usados para calcular a projeção financeira.</p>
          </div>
          <button type="button" className="btn-add-row" onClick={addProduct}>
            + Adicionar Produto/Serviço
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(marketing.products || []).map((product) => {
            const cost = Number(product.costPrice) || 0;
            const sale = Number(product.salePrice) || 0;
            const markupVal = sale - cost;
            const marginPct = sale > 0 ? Math.round((markupVal / sale) * 100) : 0;

            return (
              <div key={product.id} className="builder-item-row" style={{ gridTemplateColumns: '1fr' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 1fr 1fr 1fr', gap: '16px', alignItems: 'end' }}>
                  
                  <div className="form-group">
                    <label className="form-label">Nome do Item</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ex: Café Espresso 50ml"
                      value={product.name || ''}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Descrição Breve</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ex: Grãos 100% arábica torra média"
                      value={product.description || ''}
                      onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Custo Unitário (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-input"
                      placeholder="0,00"
                      value={product.costPrice || ''}
                      onChange={(e) => updateProduct(product.id, 'costPrice', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preço de Venda (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-input"
                      placeholder="0,00"
                      value={product.salePrice || ''}
                      onChange={(e) => updateProduct(product.id, 'salePrice', e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ textAlign: 'center', paddingBottom: '8px' }}>
                    <label className="form-label" style={{ justifyContent: 'center' }}>Margem Bruta</label>
                    <span 
                      style={{ 
                        fontSize: '14px', 
                        fontWeight: '700', 
                        color: marginPct >= 40 ? 'var(--success)' : marginPct > 10 ? 'var(--text-main)' : 'var(--danger)'
                      }}
                    >
                      {marginPct}% ({markupVal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                    </span>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1 }} className="form-group">
                      <label className="form-label">Canal de Venda</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Ex: Balcão, App"
                        value={product.channel || ''}
                        onChange={(e) => updateProduct(product.id, 'channel', e.target.value)}
                      />
                    </div>
                    
                    <button
                      type="button"
                      className="btn-remove-row"
                      onClick={() => removeProduct(product.id)}
                      title="Excluir produto"
                      style={{ marginBottom: '0px' }}
                    >
                      &times;
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

          {(marketing.products || []).length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-main)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '14px' }}>
              Nenhum produto ou serviço cadastrado ainda. Clique no botão acima para iniciar seu catálogo.
            </div>
          )}
        </div>
      </div>

      {/* Strategies */}
      <div className="form-row" style={{ marginTop: '16px' }}>
        <div className="form-group">
          <label className="form-label">Estratégias de Divulgação e Promoção</label>
          <textarea
            className="form-textarea"
            placeholder="Como o seu público descobrirá o seu produto? Quais os canais de mídia, cupons de desconto, redes sociais ou ações locais você planeja utilizar?"
            value={marketing.promotions || ''}
            onChange={(e) => handleChange('promotions', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Estrutura de Comercialização / Força de Vendas</label>
          <textarea
            className="form-textarea"
            placeholder="Como o cliente compra e como o produto é entregue? Há vendedores porta a porta, representantes, venda automática no site ou balcão físico?"
            value={marketing.channels || ''}
            onChange={(e) => handleChange('channels', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '16px' }}>
        <label className="form-label">Justificativa da Localização do Empreendimento</label>
        <textarea
          className="form-textarea"
          style={{ minHeight: '80px' }}
          placeholder="Se houver um espaço físico, justifique a escolha do ponto (movimento de pessoas, segurança, acesso a transporte, facilidade para fornecedores, estacionamento)."
          value={marketing.locationRationale || ''}
          onChange={(e) => handleChange('locationRationale', e.target.value)}
        />
      </div>
    </div>
  );
}

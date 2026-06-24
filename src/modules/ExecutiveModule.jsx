import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function ExecutiveModule() {
  const { activePlan, updateActivePlan } = usePlan();

  if (!activePlan) return null;

  const { executive } = activePlan;

  const handleChange = (field, value) => {
    updateActivePlan((prev) => ({
      executive: {
        ...prev.executive,
        [field]: value
      }
    }));
  };

  return (
    <div className="content-card">
      <div className="card-title-section">
        <h2 className="card-title">Resumo Executivo</h2>
        <p className="card-subtitle">
          Escreva uma visão clara e sintetizada do seu modelo de negócios para captar a atenção de investidores e parceiros.
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">
          A Oportunidade de Negócio <span className="required-star">*</span>
        </label>
        <textarea
          className="form-textarea"
          style={{ minHeight: '110px' }}
          placeholder="O que você observou no mercado que indica que este negócio terá sucesso? Qual a brecha comercial?"
          value={executive.opportunity || ''}
          onChange={(e) => handleChange('opportunity', e.target.value)}
        />
        <span className="form-help-inline">
          Exemplo: Aumento da busca por alimentos saudáveis e rápidos para consumo no escritório no centro da cidade.
        </span>
      </div>

      <div className="form-group">
        <label className="form-label">
          O Problema que Você Resolve <span className="required-star">*</span>
        </label>
        <textarea
          className="form-textarea"
          style={{ minHeight: '110px' }}
          placeholder="Qual é a principal dor, necessidade ou frustração que os seus clientes em potencial enfrentam atualmente?"
          value={executive.problem || ''}
          onChange={(e) => handleChange('problem', e.target.value)}
        />
        <span className="form-help-inline">
          Exemplo: A falta de opções de refeições saudáveis e frescas com entrega garantida em menos de 15 minutos na região.
        </span>
      </div>

      <div className="form-group">
        <label className="form-label">
          A Solução Proposta <span className="required-star">*</span>
        </label>
        <textarea
          className="form-textarea"
          style={{ minHeight: '110px' }}
          placeholder="Descreva de forma simples o seu produto ou serviço. Como ele elimina a dor do cliente de forma inovadora?"
          value={executive.solution || ''}
          onChange={(e) => handleChange('solution', e.target.value)}
        />
        <span className="form-help-inline">
          Exemplo: Um serviço de assinaturas diárias de saladas no pote premium embaladas a vácuo, entregues por ciclistas parceiros locais.
        </span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Mercado-Alvo Pretendido <span className="required-star">*</span>
          </label>
          <textarea
            className="form-textarea"
            placeholder="Qual nicho específico você atacará no início? (Quem é o comprador ideal?)"
            value={executive.targetMarket || ''}
            onChange={(e) => handleChange('targetMarket', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Potencial de Crescimento de Mercado <span className="required-star">*</span>
          </label>
          <textarea
            className="form-textarea"
            placeholder="Quais são as projeções de expansão? Há tendências favoráveis que sustentam este crescimento?"
            value={executive.marketPotential || ''}
            onChange={(e) => handleChange('marketPotential', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

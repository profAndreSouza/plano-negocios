import React, { useState } from 'react';
import { usePlan } from '../context/PlanContext';

export default function SWOTModule() {
  const { activePlan, updateActivePlan } = usePlan();
  
  const [strengthInput, setStrengthInput] = useState('');
  const [weaknessInput, setWeaknessInput] = useState('');
  const [opportunityInput, setOpportunityInput] = useState('');
  const [threatInput, setThreatInput] = useState('');

  if (!activePlan) return null;

  const { swot } = activePlan;

  const handleAddItem = (quadrant, val, setVal) => {
    if (!val.trim()) return;
    
    updateActivePlan((prev) => {
      const currentList = prev.swot[quadrant] || [];
      return {
        swot: {
          ...prev.swot,
          [quadrant]: [...currentList, val.trim()]
        }
      };
    });
    setVal('');
  };

  const handleRemoveItem = (quadrant, index) => {
    updateActivePlan((prev) => {
      const currentList = prev.swot[quadrant] || [];
      return {
        swot: {
          ...prev.swot,
          [quadrant]: currentList.filter((_, i) => i !== index)
        }
      };
    });
  };

  return (
    <div className="content-card">
      <div className="card-title-section">
        <h2 className="card-title">Matriz SWOT / Análise FOFA</h2>
        <p className="card-subtitle">
          Analise o ambiente interno (suas forças e fraquezas) e externo (as oportunidades e ameaças do mercado) para traçar estratégias preventivas e corretivas.
        </p>
      </div>

      <div className="swot-container">
        {/* STRENGTHS */}
        <div className="swot-box strengths">
          <div className="swot-header">
            <h3 className="swot-box-title">Forças (Strengths)</h3>
            <span className="swot-badge">Interno</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '-8px' }}>
            Vantagens internas que você tem controle direto (Ex: equipe dedicada, tecnologia própria, boa localização).
          </p>
          <div className="swot-list">
            {(swot.strengths || []).map((item, index) => (
              <div key={index} className="swot-item">
                <span>{item}</span>
                <button
                  className="btn-delete-swot"
                  onClick={() => handleRemoveItem('strengths', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.strengths || []).length === 0 && (
              <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma força listada.
              </div>
            )}
          </div>
          <div className="swot-input-row">
            <input
              type="text"
              className="swot-input"
              placeholder="Ex: Marca registrada forte..."
              value={strengthInput}
              onChange={(e) => setStrengthInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('strengths', strengthInput, setStrengthInput)}
            />
            <button
              className="btn-add-swot"
              onClick={() => handleAddItem('strengths', strengthInput, setStrengthInput)}
            >
              +
            </button>
          </div>
        </div>

        {/* WEAKNESSES */}
        <div className="swot-box weaknesses">
          <div className="swot-header">
            <h3 className="swot-box-title">Fraquezas (Weaknesses)</h3>
            <span className="swot-badge">Interno</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '-8px' }}>
            Desvantagens internas que precisam ser melhoradas ou corrigidas (Ex: equipe inexperiente, orçamento apertado).
          </p>
          <div className="swot-list">
            {(swot.weaknesses || []).map((item, index) => (
              <div key={index} className="swot-item">
                <span>{item}</span>
                <button
                  className="btn-delete-swot"
                  onClick={() => handleRemoveItem('weaknesses', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.weaknesses || []).length === 0 && (
              <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma fraqueza listada.
              </div>
            )}
          </div>
          <div className="swot-input-row">
            <input
              type="text"
              className="swot-input"
              placeholder="Ex: Recursos financeiros iniciais limitados..."
              value={weaknessInput}
              onChange={(e) => setWeaknessInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('weaknesses', weaknessInput, setWeaknessInput)}
            />
            <button
              className="btn-add-swot"
              onClick={() => handleAddItem('weaknesses', weaknessInput, setWeaknessInput)}
            >
              +
            </button>
          </div>
        </div>

        {/* OPPORTUNITIES */}
        <div className="swot-box opportunities">
          <div className="swot-header">
            <h3 className="swot-box-title">Oportunidades (Opportunities)</h3>
            <span className="swot-badge">Externo</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '-8px' }}>
            Fatores externos do mercado que você pode aproveitar para crescer (Ex: novas tecnologias, mudanças de hábito, leis favoráveis).
          </p>
          <div className="swot-list">
            {(swot.opportunities || []).map((item, index) => (
              <div key={index} className="swot-item">
                <span>{item}</span>
                <button
                  className="btn-delete-swot"
                  onClick={() => handleRemoveItem('opportunities', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.opportunities || []).length === 0 && (
              <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma oportunidade listada.
              </div>
            )}
          </div>
          <div className="swot-input-row">
            <input
              type="text"
              className="swot-input"
              placeholder="Ex: Expansão imobiliária na região..."
              value={opportunityInput}
              onChange={(e) => setOpportunityInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('opportunities', opportunityInput, setOpportunityInput)}
            />
            <button
              className="btn-add-swot"
              onClick={() => handleAddItem('opportunities', opportunityInput, setOpportunityInput)}
            >
              +
            </button>
          </div>
        </div>

        {/* THREATS */}
        <div className="swot-box threats">
          <div className="swot-header">
            <h3 className="swot-box-title">Ameaças (Threats)</h3>
            <span className="swot-badge">Externo</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '-8px' }}>
            Acontecimentos externos fora do seu controle que geram riscos ao negócio (Ex: novos concorrentes gigantes, inflação).
          </p>
          <div className="swot-list">
            {(swot.threats || []).map((item, index) => (
              <div key={index} className="swot-item">
                <span>{item}</span>
                <button
                  className="btn-delete-swot"
                  onClick={() => handleRemoveItem('threats', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.threats || []).length === 0 && (
              <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma ameaça listada.
              </div>
            )}
          </div>
          <div className="swot-input-row">
            <input
              type="text"
              className="swot-input"
              placeholder="Ex: Novos regulamentos de licença de funcionamento..."
              value={threatInput}
              onChange={(e) => setThreatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('threats', threatInput, setThreatInput)}
            />
            <button
              className="btn-add-swot"
              onClick={() => handleAddItem('threats', threatInput, setThreatInput)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

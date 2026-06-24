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

      <div className="swot-grid-layout">
        {/* Row 1: Headers */}
        <div className="swot-grid-corner"></div>
        <div className="swot-grid-header positive">Fatores positivos</div>
        <div className="swot-grid-header negative">Fatores negativos</div>

        {/* Row 2: Internos */}
        <div className="swot-grid-row-header">
          <span>Fatores internos</span>
        </div>

        {/* Strengths (S) */}
        <div className="swot-quadrant strengths">
          <div className="quadrant-title-row">
            <span className="quadrant-letter">S</span>
            <div className="quadrant-meta">
              <span className="quadrant-eng">Strengths</span>
              <span className="quadrant-pt">(força)</span>
            </div>
          </div>
          
          <div className="swot-items-list">
            {(swot.strengths || []).map((item, index) => (
              <div key={index} className="swot-item-pill">
                <span>{item}</span>
                <button
                  className="btn-delete-swot-pill"
                  onClick={() => handleRemoveItem('strengths', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.strengths || []).length === 0 && (
              <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma força listada.
              </div>
            )}
          </div>

          <div className="swot-add-pill-row">
            <input
              type="text"
              className="swot-pill-input"
              placeholder="Adicionar força..."
              value={strengthInput}
              onChange={(e) => setStrengthInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('strengths', strengthInput, setStrengthInput)}
            />
            <button
              className="btn-add-swot-pill"
              onClick={() => handleAddItem('strengths', strengthInput, setStrengthInput)}
              title="Adicionar"
            >
              +
            </button>
          </div>
        </div>

        {/* Weaknesses (W) */}
        <div className="swot-quadrant weaknesses">
          <div className="quadrant-title-row">
            <span className="quadrant-letter">W</span>
            <div className="quadrant-meta">
              <span className="quadrant-eng">Weaknesses</span>
              <span className="quadrant-pt">(fraquezas)</span>
            </div>
          </div>

          <div className="swot-items-list">
            {(swot.weaknesses || []).map((item, index) => (
              <div key={index} className="swot-item-pill">
                <span>{item}</span>
                <button
                  className="btn-delete-swot-pill"
                  onClick={() => handleRemoveItem('weaknesses', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.weaknesses || []).length === 0 && (
              <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma fraqueza listada.
              </div>
            )}
          </div>

          <div className="swot-add-pill-row">
            <input
              type="text"
              className="swot-pill-input"
              placeholder="Adicionar fraqueza..."
              value={weaknessInput}
              onChange={(e) => setWeaknessInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('weaknesses', weaknessInput, setWeaknessInput)}
            />
            <button
              className="btn-add-swot-pill"
              onClick={() => handleAddItem('weaknesses', weaknessInput, setWeaknessInput)}
              title="Adicionar"
            >
              +
            </button>
          </div>
        </div>

        {/* Row 3: Externos */}
        <div className="swot-grid-row-header">
          <span>Fatores externos</span>
        </div>

        {/* Opportunities (O) */}
        <div className="swot-quadrant opportunities">
          <div className="quadrant-title-row">
            <span className="quadrant-letter">O</span>
            <div className="quadrant-meta">
              <span className="quadrant-eng">Opportunities</span>
              <span className="quadrant-pt">(oportunidades)</span>
            </div>
          </div>

          <div className="swot-items-list">
            {(swot.opportunities || []).map((item, index) => (
              <div key={index} className="swot-item-pill">
                <span>{item}</span>
                <button
                  className="btn-delete-swot-pill"
                  onClick={() => handleRemoveItem('opportunities', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.opportunities || []).length === 0 && (
              <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma oportunidade listada.
              </div>
            )}
          </div>

          <div className="swot-add-pill-row">
            <input
              type="text"
              className="swot-pill-input"
              placeholder="Adicionar oportunidade..."
              value={opportunityInput}
              onChange={(e) => setOpportunityInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('opportunities', opportunityInput, setOpportunityInput)}
            />
            <button
              className="btn-add-swot-pill"
              onClick={() => handleAddItem('opportunities', opportunityInput, setOpportunityInput)}
              title="Adicionar"
            >
              +
            </button>
          </div>
        </div>

        {/* Threats (T) */}
        <div className="swot-quadrant threats">
          <div className="quadrant-title-row">
            <span className="quadrant-letter">T</span>
            <div className="quadrant-meta">
              <span className="quadrant-eng">Threats</span>
              <span className="quadrant-pt">(ameaças)</span>
            </div>
          </div>

          <div className="swot-items-list">
            {(swot.threats || []).map((item, index) => (
              <div key={index} className="swot-item-pill">
                <span>{item}</span>
                <button
                  className="btn-delete-swot-pill"
                  onClick={() => handleRemoveItem('threats', index)}
                  title="Excluir item"
                >
                  &times;
                </button>
              </div>
            ))}
            {(swot.threats || []).length === 0 && (
              <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                Nenhuma ameaça listada.
              </div>
            )}
          </div>

          <div className="swot-add-pill-row">
            <input
              type="text"
              className="swot-pill-input"
              placeholder="Adicionar ameaça..."
              value={threatInput}
              onChange={(e) => setThreatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem('threats', threatInput, setThreatInput)}
            />
            <button
              className="btn-add-swot-pill"
              onClick={() => handleAddItem('threats', threatInput, setThreatInput)}
              title="Adicionar"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

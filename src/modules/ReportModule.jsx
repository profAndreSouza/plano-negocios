import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function ReportModule() {
  const { activePlan, calculated } = usePlan();

  if (!activePlan) return null;

  const { identity, executive, market, swot, marketing, operational, financial } = activePlan;

  const formatCurrency = (val) => {
    return (val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Print Action Bar (Hidden during print) */}
      <div
        className="content-card report-action-card"
      >
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-heading)' }}>
            Relatório Consolidado Pronto
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Clique no botão ao lado para salvar o Plano de Negócios em formato PDF ou imprimir.
          </p>
        </div>
        <button className="btn-primary" onClick={handlePrint}>
          <span>🖨️</span> Salvar como PDF / Imprimir
        </button>
      </div>

      {/* Printable Report Document */}
      <article className="report-view">

        {/* Cover Page */}
        <section className="report-cover">
          <span className="report-cover-tag">Plano de Negócios</span>
          <h1 className="report-cover-title">
            {identity.name || activePlan.name}
          </h1>
          <p className="report-cover-subtitle">
            Estudo de viabilidade mercadológica, operacional e financeira do empreendimento.
          </p>

          <div className="report-meta-grid">
            <div className="report-meta-item">
              <span className="report-meta-label">Elaborado por:</span>
              <span className="report-meta-val">
                {identity.partners && identity.partners.length > 0
                  ? identity.partners.map((p) => p.name).join(', ')
                  : 'Empreendedor Fundador'
                }
              </span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Data de Emissão:</span>
              <span className="report-meta-val">{formatDate(activePlan.updatedAt)}</span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Setor de Atuação:</span>
              <span className="report-meta-val">
                {identity.activitySectors && identity.activitySectors.length > 0
                  ? identity.activitySectors.join(', ')
                  : 'Não especificado'
                }
              </span>
            </div>
            <div className="report-meta-item">
              <span className="report-meta-label">Enquadramento:</span>
              <span className="report-meta-val">
                {identity.legalForm || 'N/A'} - {identity.taxRegime || 'N/A'}
              </span>
            </div>
          </div>
        </section>

        {/* 1. IDENTIDADE DO NEGÓCIO */}
        <section className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">MÓDULO 1</span>
            <h2 className="report-section-title">Apresentação e Identidade do Negócio</h2>
          </div>

          <div className="report-text-block">
            {identity.mission && (
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--text-heading)' }}>Missão:</strong>
                <p style={{ marginTop: '4px' }}>{identity.mission}</p>
              </div>
            )}

            {identity.vision && (
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--text-heading)' }}>Visão:</strong>
                <p style={{ marginTop: '4px' }}>{identity.vision}</p>
              </div>
            )}

            {identity.values && (
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--text-heading)' }}>Valores:</strong>
                <p style={{ marginTop: '4px' }}>{identity.values}</p>
              </div>
            )}

            {identity.differentials && (
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--text-heading)' }}>Diferenciais Competitivos:</strong>
                <p style={{ marginTop: '4px' }}>{identity.differentials}</p>
              </div>
            )}
          </div>

          {identity.partners && identity.partners.length > 0 && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Quadro de Sócios</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Sócio</th>
                      <th style={{ width: '30%' }}>Função</th>
                      <th style={{ width: '40%' }}>Experiência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {identity.partners.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: '600' }}>{p.name}</td>
                        <td>{p.role}</td>
                        <td>{p.experience}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* 2. RESUMO EXECUTIVO */}
        <section className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">MÓDULO 2</span>
            <h2 className="report-section-title">Resumo Executivo</h2>
          </div>

          <div className="report-text-block" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {executive.opportunity && (
              <div>
                <strong style={{ color: 'var(--text-heading)' }}>Oportunidade de Mercado:</strong>
                <p style={{ marginTop: '4px' }}>{executive.opportunity}</p>
              </div>
            )}

            {executive.problem && (
              <div>
                <strong style={{ color: 'var(--text-heading)' }}>O Problema Identificado:</strong>
                <p style={{ marginTop: '4px' }}>{executive.problem}</p>
              </div>
            )}

            {executive.solution && (
              <div>
                <strong style={{ color: 'var(--text-heading)' }}>A Solução Desenvolvida:</strong>
                <p style={{ marginTop: '4px' }}>{executive.solution}</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {executive.targetMarket && (
                <div>
                  <strong style={{ color: 'var(--text-heading)' }}>Mercado-Alvo:</strong>
                  <p style={{ marginTop: '4px' }}>{executive.targetMarket}</p>
                </div>
              )}
              {executive.marketPotential && (
                <div>
                  <strong style={{ color: 'var(--text-heading)' }}>Potencial de Crescimento:</strong>
                  <p style={{ marginTop: '4px' }}>{executive.marketPotential}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. ANÁLISE DE MERCADO */}
        <section className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">MÓDULO 3</span>
            <h2 className="report-section-title">Análise de Mercado</h2>
          </div>

          {market.customerProfile && (
            <div className="report-text-block">
              <strong style={{ color: 'var(--text-heading)' }}>Perfil do Cliente Comprador:</strong>
              <p style={{ marginTop: '4px' }}>{market.customerProfile}</p>
            </div>
          )}

          {market.competitors && market.competitors.length > 0 && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Matriz Competitiva</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Concorrente</th>
                      <th>Preço</th>
                      <th>Qualidade</th>
                      <th>Atendimento</th>
                      <th>Localização</th>
                      <th>Pontos Fortes/Fracos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {market.competitors.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: '600' }}>{c.name}</td>
                        <td>{c.price}</td>
                        <td>{c.quality}</td>
                        <td>{c.service}</td>
                        <td>{c.location}</td>
                        <td style={{ fontSize: '12px' }}>{c.strengths}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {market.suppliers && market.suppliers.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Fornecedores Estratégicos</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Fornecedor</th>
                      <th>Insumos Fornecidos</th>
                      <th>Condições de Entrega/Pgto</th>
                      <th>Qualidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {market.suppliers.map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: '600' }}>{s.name}</td>
                        <td>{s.items}</td>
                        <td>{s.terms}</td>
                        <td>{s.quality}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* 4. SWOT MATRIX */}
        <section className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">MÓDULO 4</span>
            <h2 className="report-section-title">Análise Estratégica SWOT (FOFA)</h2>
          </div>

          <div className="swot-grid-layout" style={{ marginTop: '20px' }}>
            {/* Row 1: Headers */}
            <div className="swot-grid-corner"></div>
            <div className="swot-grid-header positive">Fatores positivos</div>
            <div className="swot-grid-header negative">Fatores negativos</div>

            {/* Row 2: Internos */}
            <div className="swot-grid-row-header">
              <span>Fatores internos</span>
            </div>

            {/* Strengths (S) */}
            <div className="swot-quadrant strengths" style={{ minHeight: '180px' }}>
              <div className="quadrant-title-row">
                <span className="quadrant-letter">S</span>
                <div className="quadrant-meta">
                  <span className="quadrant-eng">Strengths</span>
                  <span className="quadrant-pt">(força)</span>
                </div>
              </div>
              
              <div className="swot-items-list" style={{ maxHeight: 'none' }}>
                {swot.strengths && swot.strengths.length > 0 ? (
                  swot.strengths.map((item, i) => (
                    <div key={i} className="swot-item-pill">
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                    Nenhuma força listada.
                  </div>
                )}
              </div>
            </div>

            {/* Weaknesses (W) */}
            <div className="swot-quadrant weaknesses" style={{ minHeight: '180px' }}>
              <div className="quadrant-title-row">
                <span className="quadrant-letter">W</span>
                <div className="quadrant-meta">
                  <span className="quadrant-eng">Weaknesses</span>
                  <span className="quadrant-pt">(fraquezas)</span>
                </div>
              </div>

              <div className="swot-items-list" style={{ maxHeight: 'none' }}>
                {swot.weaknesses && swot.weaknesses.length > 0 ? (
                  swot.weaknesses.map((item, i) => (
                    <div key={i} className="swot-item-pill">
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                    Nenhuma fraqueza listada.
                  </div>
                )}
              </div>
            </div>

            {/* Row 3: Externos */}
            <div className="swot-grid-row-header">
              <span>Fatores externos</span>
            </div>

            {/* Opportunities (O) */}
            <div className="swot-quadrant opportunities" style={{ minHeight: '180px' }}>
              <div className="quadrant-title-row">
                <span className="quadrant-letter">O</span>
                <div className="quadrant-meta">
                  <span className="quadrant-eng">Opportunities</span>
                  <span className="quadrant-pt">(oportunidades)</span>
                </div>
              </div>

              <div className="swot-items-list" style={{ maxHeight: 'none' }}>
                {swot.opportunities && swot.opportunities.length > 0 ? (
                  swot.opportunities.map((item, i) => (
                    <div key={i} className="swot-item-pill">
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                    Nenhuma oportunidade listada.
                  </div>
                )}
              </div>
            </div>

            {/* Threats (T) */}
            <div className="swot-quadrant threats" style={{ minHeight: '180px' }}>
              <div className="quadrant-title-row">
                <span className="quadrant-letter">T</span>
                <div className="quadrant-meta">
                  <span className="quadrant-eng">Threats</span>
                  <span className="quadrant-pt">(ameaças)</span>
                </div>
              </div>

              <div className="swot-items-list" style={{ maxHeight: 'none' }}>
                {swot.threats && swot.threats.length > 0 ? (
                  swot.threats.map((item, i) => (
                    <div key={i} className="swot-item-pill">
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '13px', textAlign: 'center', margin: 'auto 0' }}>
                    Nenhuma ameaça listada.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 5. PLANO DE MARKETING */}
        <section className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">MÓDULO 5</span>
            <h2 className="report-section-title">Plano de Marketing</h2>
          </div>

          {marketing.products && marketing.products.length > 0 && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Catálogo de Produtos e Precificação</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Produto/Serviço</th>
                      <th>Descrição</th>
                      <th>Custo Unit.</th>
                      <th>Preço de Venda</th>
                      <th>Margem Unitária</th>
                      <th>Canal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketing.products.map((p) => {
                      const cost = Number(p.costPrice) || 0;
                      const sale = Number(p.salePrice) || 0;
                      const sub = sale - cost;
                      const pct = sale > 0 ? Math.round((sub / sale) * 100) : 0;
                      return (
                        <tr key={p.id}>
                          <td style={{ fontWeight: '600' }}>{p.name}</td>
                          <td>{p.description}</td>
                          <td>{formatCurrency(p.costPrice)}</td>
                          <td>{formatCurrency(p.salePrice)}</td>
                          <td style={{ fontWeight: '600' }}>
                            {pct}% ({formatCurrency(sub)})
                          </td>
                          <td>{p.channel}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="report-text-block" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {marketing.promotions && (
              <div>
                <strong style={{ color: 'var(--text-heading)' }}>Estratégias de Divulgação:</strong>
                <p style={{ marginTop: '4px' }}>{marketing.promotions}</p>
              </div>
            )}

            {marketing.channels && (
              <div>
                <strong style={{ color: 'var(--text-heading)' }}>Canais de Comercialização:</strong>
                <p style={{ marginTop: '4px' }}>{marketing.channels}</p>
              </div>
            )}

            {marketing.locationRationale && (
              <div>
                <strong style={{ color: 'var(--text-heading)' }}>Critério de Localização:</strong>
                <p style={{ marginTop: '4px' }}>{marketing.locationRationale}</p>
              </div>
            )}
          </div>
        </section>

        {/* 6. PLANO OPERACIONAL */}
        <section className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">MÓDULO 6</span>
            <h2 className="report-section-title">Plano Operacional</h2>
          </div>

          <div className="report-text-block" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {operational.layoutDesc && (
              <div>
                <strong style={{ color: 'var(--text-heading)' }}>Arranjo Físico (Layout):</strong>
                <p style={{ marginTop: '4px' }}>{operational.layoutDesc}</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {operational.maxCapacity && (
                <div>
                  <strong style={{ color: 'var(--text-heading)' }}>Capacidade Produtiva Máxima:</strong>
                  <p style={{ marginTop: '4px' }}>{operational.maxCapacity}</p>
                </div>
              )}
              {operational.initialProduction && (
                <div>
                  <strong style={{ color: 'var(--text-heading)' }}>Capacidade Inicial Estimada:</strong>
                  <p style={{ marginTop: '4px' }}>{operational.initialProduction}</p>
                </div>
              )}
            </div>
          </div>

          {operational.processes && operational.processes.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Processos Operacionais Chave</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th style={{ width: '10%', textAlign: 'center' }}>Etapa</th>
                      <th style={{ width: '65%' }}>Atividades Realizadas</th>
                      <th style={{ width: '25%' }}>Responsável</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operational.processes.map((proc) => (
                      <tr key={proc.id}>
                        <td style={{ textAlign: 'center', fontWeight: '700' }}>{proc.step}</td>
                        <td>{proc.description}</td>
                        <td>{proc.responsible}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {operational.personnel && operational.personnel.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Quadro de Equipe e Pessoal</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Cargo/Função</th>
                      <th>Salário Base</th>
                      <th style={{ textAlign: 'center' }}>Quantidade</th>
                      <th style={{ textAlign: 'right' }}>Total Mensal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operational.personnel.map((person) => (
                      <tr key={person.id}>
                        <td style={{ fontWeight: '600' }}>{person.role}</td>
                        <td>{formatCurrency(person.salary)}</td>
                        <td style={{ textAlign: 'center' }}>{person.quantity}</td>
                        <td style={{ textAlign: 'right', fontWeight: '700' }}>
                          {formatCurrency((Number(person.salary) * Number(person.quantity)))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* 7. PLANO FINANCEIRO E VIABILIDADE */}
        <section className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">MÓDULO 7</span>
            <h2 className="report-section-title">Plano Financeiro e Demonstrativo de Viabilidade</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '20px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Detalhamento do Investimento Inicial</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <tbody>
                    <tr>
                      <td>Investimento Fixo (Máquinas, Móveis, Ferramentas)</td>
                      <td style={{ fontWeight: '700', textAlign: 'right' }}>{formatCurrency(calculated.fixedInvestmentsTotal)}</td>
                    </tr>
                    <tr>
                      <td>Investimentos Pré-operacionais (Abertura, Reformas)</td>
                      <td style={{ fontWeight: '700', textAlign: 'right' }}>{formatCurrency(calculated.preOperationalTotal)}</td>
                    </tr>
                    <tr>
                      <td>Capital de Giro (Estoque Inicial e Caixa Reserva)</td>
                      <td style={{ fontWeight: '700', textAlign: 'right' }}>{formatCurrency(calculated.workingCapitalTotal)}</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--bg-main)', fontWeight: '800' }}>
                      <td>INVESTIMENTO TOTAL ESTIMADO</td>
                      <td style={{ textAlign: 'right', color: 'var(--primary)' }}>{formatCurrency(calculated.totalInvestment)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginTop: '20px', marginBottom: '8px' }}>Origem dos Recursos (Fontes de Financiamento)</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <tbody>
                    <tr>
                      <td>Recursos Próprios (Sócios/Investimento Direto)</td>
                      <td style={{ fontWeight: '700', textAlign: 'right' }}>{formatCurrency(financial.equityFunds)}</td>
                    </tr>
                    <tr>
                      <td>Recursos de Terceiros (Empréstimos Bancários)</td>
                      <td style={{ fontWeight: '700', textAlign: 'right' }}>{formatCurrency(financial.debtFunds)}</td>
                    </tr>
                    <tr>
                      <td>Outras Fontes (Editais / BNDES / Fomento)</td>
                      <td style={{ fontWeight: '700', textAlign: 'right' }}>{formatCurrency(financial.otherFunds)}</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--bg-main)', fontWeight: '800' }}>
                      <td>TOTAL RECURSOS CAPTADOS</td>
                      <td style={{ textAlign: 'right' }}>{formatCurrency((financial.equityFunds || 0) + (financial.debtFunds || 0) + (financial.otherFunds || 0))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>Indicadores de Desempenho e Viabilidade</h4>
              <div className="report-table-wrapper">
                <table className="report-table">
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ fontWeight: '700' }}>Ponto de Equilíbrio (Break-Even)</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px' }}>
                          Faturamento mínimo que a empresa precisa alcançar para não operar no vermelho.
                        </div>
                      </td>
                      <td style={{ fontWeight: '700', textAlign: 'right', verticalAlign: 'middle' }}>{formatCurrency(calculated.breakEvenPointVal)}</td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ fontWeight: '700' }}>Lucratividade Mensal (%)</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px' }}>
                          Representa a porcentagem que sobra livre como lucro líquido de tudo o que é faturado.
                        </div>
                      </td>
                      <td style={{ fontWeight: '700', textAlign: 'right', verticalAlign: 'middle' }}>{calculated.profitabilityPct.toFixed(1)}%</td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ fontWeight: '700' }}>Rentabilidade Anual (ROI)</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px' }}>
                          Percentual de retorno do capital total investido por ano. Indica a atratividade do negócio.
                        </div>
                      </td>
                      <td style={{ fontWeight: '700', textAlign: 'right', verticalAlign: 'middle' }}>{calculated.roiPct.toFixed(1)}%</td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ fontWeight: '700' }}>Prazo de Retorno (Payback)</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '2px' }}>
                          Tempo de retorno, em meses, para que o investidor consiga reaver o aporte inicial feito.
                        </div>
                      </td>
                      <td style={{ fontWeight: '700', textAlign: 'right', verticalAlign: 'middle' }}>
                        {calculated.netProfit > 0 ? `${calculated.paybackMonths.toFixed(1)} meses` : 'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-heading)', marginBottom: '8px' }}>DRE Simplificado (Demonstrativo de Resultado do Exercício)</h4>
            <div className="report-table-wrapper">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Etapas do Resultado Operacional</th>
                    <th style={{ textAlign: 'right', width: '22%' }}>Projeção Mensal</th>
                    <th style={{ textAlign: 'right', width: '22%' }}>Projeção Anual</th>
                  </tr>
                </thead>
                <tbody>
                  {calculated.dre && calculated.dre.map((row, idx) => {
                    const isTotal = row.type === 'header' || row.type === 'subtotal' || row.type === 'final';
                    return (
                      <tr key={idx} style={{ fontWeight: isTotal ? '700' : 'normal', backgroundColor: isTotal ? 'var(--bg-main)' : 'white' }}>
                        <td>{row.label}</td>
                        <td style={{ textAlign: 'right', fontWeight: '700' }}>{formatCurrency(row.value)}</td>
                        <td style={{ textAlign: 'right', fontWeight: '700' }}>{formatCurrency(row.value * 12)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. CRÉDITOS E REFERÊNCIAS */}
        <section className="report-section" style={{ borderBottom: 'none', pageBreakInside: 'avoid', marginTop: '20px' }}>
          <div style={{ padding: '24px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Referências Metodológicas e Créditos
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
              Este Plano de Negócios foi gerado de acordo com as orientações técnicas, taxonomia, conceitos e estruturas de tabelas do manual oficial
              <strong> "Como Elaborar um Plano de Negócios" (Sebrae, 2021)</strong>.
              As regras de viabilidade econômico-financeira de investimento, cálculo de encargos trabalhistas a 79%, DRE operacional e estimativas de payback
              seguem estritamente as melhores práticas de planejamento ensinadas pelo Sebrae para micro e pequenas empresas brasileiras.
            </p>
            <span style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginTop: '16px', color: 'var(--text-heading)' }}>
              © Business Plan Builder. Desenvolvido em conformidade com o ecossistema Sebrae de orientação empresarial.
            </span>
          </div>
        </section>

      </article>

    </div>
  );
}

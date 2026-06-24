import React from 'react';
import { usePlan } from '../context/PlanContext';

export default function ContextHelp() {
  const { activeTab, isHelpOpen, setIsHelpOpen } = usePlan();

  if (!isHelpOpen) return null;

  const helpData = {
    dashboard: {
      title: 'Painel Geral',
      concept: 'Aqui você acompanha o progresso de cada etapa e vê em tempo real a viabilidade do negócio.',
      guidelines: [
        'Complete todas as 7 etapas numeradas no menu lateral para obter dados financeiros precisos.',
        'A viabilidade de seu plano é calculada com base nas suas projeções de vendas, custos e investimentos.',
        'Fique atento aos alertas: caso o payback seja muito longo ou a lucratividade esteja negativa, revise suas despesas ou preços de venda.'
      ],
      example: 'Um bom plano de negócios deve ter pelo menos 80% das seções preenchidas antes de ser apresentado a terceiros.'
    },
    identity: {
      title: '1. Identidade do Negócio',
      concept: 'Define o DNA da empresa: quem você é, onde quer chegar e quais os valores que guiam o negócio.',
      guidelines: [
        'Missão: O propósito da empresa (Por que ela existe? O que faz pelos clientes?).',
        'Visão: Onde a empresa quer chegar em médio e longo prazo.',
        'Valores: Os princípios éticos e comportamentais inegociáveis.',
        'Sócios: Liste os sócios e registre quais atribuições e conhecimentos práticos cada um traz para somar à operação.'
      ],
      example: 'Missão de uma cafeteria orgânica: "Oferecer momentos de pausa acolhedores através de cafés artesanais cultivados com respeito ao meio ambiente e ao pequeno produtor."'
    },
    executive: {
      title: '2. Resumo Executivo',
      concept: 'O cartão de visitas do seu negócio. Deve ser sucinto, cativante e explicar claramente a oportunidade percebida.',
      guidelines: [
        'Oportunidade: Qual brecha ou necessidade de mercado motivou você a criar este negócio?',
        'Problema: Qual a principal dor ou desconforto do cliente hoje?',
        'Solução: Como o seu produto ou serviço cura essa dor de forma excelente?',
        'Diferenciais: O que você faz que concorrente nenhum consegue copiar facilmente.'
      ],
      example: 'Problema: "Moradores do bairro X gastam 30 minutos de trânsito para encontrar pães artesanais de fermentação natural de alta qualidade." Solução: "Uma padaria local focada em fermentação natural e entrega rápida via aplicativo no bairro X."'
    },
    market: {
      title: '3. Análise de Mercado',
      concept: 'Compreender as forças externas que cercam o negócio: quem compra, quem compete e quem fornece.',
      guidelines: [
        'Público-alvo: Não defina apenas demografia. Entenda o comportamento: o que eles valorizam? Qual a frequência de compra?',
        'Concorrentes: Identifique concorrentes diretos (que vendem o mesmo produto) e indiretos. Avalie preço, qualidade e atendimento.',
        'Fornecedores: Liste quem fornecerá matéria-prima ou equipamentos. Evite depender de um único parceiro para não correr riscos de abastecimento.'
      ],
      example: 'Concorrente Direto: "Supermercado local" (Preço: Baixo | Qualidade: Média | Ponto Forte: Variedade | Ponto Fraco: Sem atendimento personalizado).'
    },
    swot: {
      title: '4. Matriz SWOT (FOFA)',
      concept: 'Uma ferramenta clássica de gestão estratégica. Avalia o ambiente interno (Forças e Fraquezas) e externo (Oportunidades e Ameaças).',
      guidelines: [
        'Forças (Interno - Você controla): Vantagens internas (ex: receita própria, equipe qualificada, tecnologia exclusiva).',
        'Fraquezas (Interno - Você controla): Pontos fracos internos que precisam ser melhorados (ex: marca desconhecida, orçamento apertado).',
        'Oportunidades (Externo - Você NÃO controla): Tendências de mercado positivas (ex: crescimento do mercado orgânico, nova linha de metrô perto).',
        'Ameaças (Externo - Você NÃO controla): Riscos externos (ex: inflação alta, novos impostos para o setor, entrada de concorrente multinacional).'
      ],
      example: 'Força: "Localização de alto tráfego de pedestres." Ameaça: "Aumento projetado no preço dos insumos importados devido à oscilação cambial."'
    },
    marketing: {
      title: '5. Plano de Marketing',
      concept: 'Como seu produto será posicionado no mercado e como você fará os clientes comprarem de você.',
      guidelines: [
        'Preço de Venda: Deve cobrir todos os custos variáveis, impostos, custos fixos rateados e ainda gerar a margem de lucro desejada.',
        'Canais de Venda: Onde o cliente compra? (Loja física, e-commerce, redes sociais, marketplace).',
        'Estratégias de Divulgação: Como eles descobrem que você existe? (Tráfego pago, parcerias locais, panfletagem, marketing de conteúdo).'
      ],
      example: 'Preço: Se o custo de produção de um bolo é R$ 15,00, definir o preço de venda em R$ 45,00 garante uma margem bruta de 66.6% para ajudar a cobrir custos operacionais fixos.'
    },
    operational: {
      title: '6. Plano Operacional',
      concept: 'A estrutura física e processual. O "como fazer" no dia a dia da empresa.',
      guidelines: [
        'Layout físico: Como o espaço físico será distribuído para maximizar a produtividade e o conforto do cliente.',
        'Capacidade Máxima: Quanto a sua empresa consegue produzir ou atender se operar no limite de tempo e espaço?',
        'Processos Operacionais: O passo a passo sequencial da operação, desde o pedido até a entrega/pós-venda.',
        'Equipe: Quem fará o trabalho? Liste os cargos necessários, a quantidade de pessoas e a estimativa de salários.'
      ],
      example: 'Processo chave da cafeteria: "1. Receber cliente e registrar pedido no terminal -> 2. Transmitir ao barista -> 3. Preparar bebida e empratar doce -> 4. Servir na mesa em até 6 minutos -> 5. Checkout no caixa."'
    },
    financial: {
      title: '7. Plano Financeiro',
      concept: 'Traduz o plano em números. Determina a viabilidade econômica do negócio.',
      guidelines: [
        'Investimentos Fixos: Equipamentos, móveis e ferramentas necessários para iniciar.',
        'Capital de Giro: Caixa necessário para manter a empresa rodando enquanto as contas não se pagam. Inclui estoque inicial.',
        'Projeção de Faturamento: Informe a quantidade mensal estimada de vendas para cada produto.',
        'Custos Operacionais Fixos: Aluguel, contas públicas, mensalidades de sistemas, honorários contábeis e impostos fixos.'
      ],
      example: 'Investimento Fixo: R$ 50.000 em máquinas. Pre-operacional: R$ 5.000 em registros e pintura da loja. Giro: R$ 15.000 em caixa e estoque de ingredientes. Investimento Inicial Total = R$ 70.000.'
    },
    report: {
      title: 'Relatório Final',
      concept: 'Consolida todos os dados em um relatório formal pronto para impressão ou exportação em formato PDF.',
      guidelines: [
        'Revise todas as seções e corrija erros gramaticais ou dados financeiros inconsistentes.',
        'Para gerar o PDF, clique no botão "Salvar como PDF / Imprimir" e, na janela do sistema, escolha "Salvar como PDF" como impressora de destino.',
        'Certifique-se de que a opção "Gráficos de segundo plano" está ativada nas configurações de impressão para preservar as cores do relatório.'
      ],
      example: 'Apresente este relatório impresso ou em PDF para gerentes de banco (obtenção de crédito), investidores-anjo ou potenciais sócios.'
    }
  };

  const help = helpData[activeTab] || helpData.dashboard;

  return (
    <div className="help-pane">
      <div className="help-header">
        <div className="help-title-wrapper">
          <span className="help-icon">💡</span>
          <h4 className="help-title">{help.title}</h4>
        </div>
        <button
          className="btn-close-help"
          title="Ocultar painel de ajuda"
          onClick={() => setIsHelpOpen(false)}
        >
          &times;
        </button>
      </div>

      <div className="help-content">
        <div className="help-section">
          <span className="help-section-title">O que é</span>
          <p>{help.concept}</p>
        </div>

        <div className="help-section">
          <span className="help-section-title">Como preencher</span>
          <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {help.guidelines.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="help-section">
          <span className="help-section-title">Exemplo Prático</span>
          <div className="help-example-box">
            {help.example}
          </div>
        </div>
      </div>
    </div>
  );
}

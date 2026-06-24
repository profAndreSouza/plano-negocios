# Business Plan Builder

O **Business Plan Builder** é uma plataforma web moderna e interativa de tema claro desenvolvida para auxiliar empreendedores a planejar, simular e estruturar planos de negócios completos. O sistema foi construído em estrita conformidade com o manual metodológico oficial **"Como Elaborar um Plano de Negócios" (Sebrae, 2021)**.

A aplicação transforma o processo tradicional de planejamento (geralmente feito em planilhas e documentos extensos e desconexos) em uma jornada fluida, visual e integrada, permitindo o salvamento reativo de progresso e simulações simultâneas de viabilidade.

---

## 🚀 Funcionalidades Principais

O sistema é dividido em **9 módulos integrados**:

1. **📊 Painel Geral (Dashboard):** Centraliza os principais indicadores de viabilidade financeira (Investimento Inicial, Faturamento, Lucro Líquido e Payback) com gráficos circulares/barras SVG de distribuição de aportes e progresso de preenchimento, fornecendo recomendações de viabilidade automatizadas com base no desempenho do plano.
2. **1️⃣ Identidade do Negócio:** Cadastro dos pilares estratégicos (Missão, Visão, Valores, Diferenciais Competitivos), definição de setores de atividade, regimes jurídicos e enquadramentos tributários, além de um quadro dinâmico de sócios fundadores.
3. **2️⃣ Resumo Executivo:** Espaço estruturado para o empreendedor resumir a oportunidade identificada, problema de mercado, solução inovadora, mercado-alvo e potencial de escalabilidade.
4. **3️⃣ Análise de Mercado:** Estudo aprofundado do público-alvo, matriz comparativa de concorrentes (preço, qualidade, atendimento e localização) e mapeamento de fornecedores estratégicos.
5. **4️⃣ Matriz SWOT (FOFA):** Quadro visual e interativo em grade 2x2 para listagem dinâmica de Forças, Fraquezas, Oportunidades e Ameaças.
6. **5️⃣ Plano de Marketing:** Catálogo de produtos e serviços com controle unitário de custo de mercadoria, preço de venda sugerido, cálculo automático de margem bruta e definição de canais e estratégias promocionais.
7. **6️⃣ Plano Operacional:** Desenho de processos diários sequenciais, descrição de layout físico, capacidade máxima/inicial e cadastro do quadro de pessoal operacional.
8. **7️⃣ Plano Financeiro (Simulador de Viabilidade):** 
   - **Tabelas de Investimento:** Cadastro dinâmico de Investimentos Fixos (com controle de anos de vida útil e depreciação mensal automática) e Investimentos Pré-operacionais.
   - **Giro e Recursos:** Controle de capital de giro (estoque e caixa mínimo) e distribuição de fontes de captação (Recursos Próprios, Terceiros e Outros/BNDES), com alertas de inconformidade reativos.
   - **Custos Operacionais Expandidos:** 12 contas fixas (aluguel, água/IPTU, energia, contador, pró-labore, etc.), integração da folha salarial com o acréscimo automático de **79% em encargos sociais** (padrão Sebrae) e depreciação mensal de ativos.
   - **Demonstrativo DRE & Indicadores:** Exibição da DRE mensal e atualização em tempo real de Ponto de Equilíbrio, Lucratividade, ROI Anual e Prazo de Retorno (Payback).
9. **📄 Relatório Final & Exportação:** Compilação formal de todas as informações em uma página de relatório limpa e executiva, com uma folha de estilos `@media print` otimizada para salvar em PDF de forma perfeita (ocultando menus, botões e barras laterais).

---

## 🛠️ Tecnologias Utilizadas

- **Core:** React.js (iniciado via Vite)
- **Linguagem:** JavaScript (ES6+)
- **Estilização:** Vanilla CSS (Design system centralizado em `src/index.css` com variáveis customizadas para facilitar manutenção)
- **Persistência:** Local Storage (auto-salvamento silencioso a cada modificação nos formulários)
- **Segurança da Execução:** Configuração do servidor de desenvolvimento configurada para ignorar o monitoramento de planilhas locais abertas em segundo plano (evitando falhas por arquivos bloqueados pelo Excel).

---

## 📁 Estrutura de Pastas Chave

```text
/src
  /components
    Sidebar.jsx           # Navegação, planos e progresso
    ContextHelp.jsx       # Dicas metodológicas e exemplos do Sebrae
  /modules
    DashboardModule.jsx   # Gráficos, KPIs e recomendações
    IdentityModule.jsx    # Módulo 1 (Identidade e Sócios)
    ExecutiveModule.jsx   # Módulo 2 (Resumo)
    MarketModule.jsx      # Módulo 3 (Clientes, Concorrentes e Fornecedores)
    SWOTModule.jsx        # Módulo 4 (FOFA)
    MarketingModule.jsx   # Módulo 5 (Catálogo de Itens)
    OperationalModule.jsx # Módulo 6 (Layout, Equipe e Processos)
    FinancialModule.jsx   # Módulo 7 (Investimento, Giro, DRE, Dicas)
    ReportModule.jsx      # Módulo 9 (Visão de Impressão e Créditos)
  /context
    PlanContext.jsx       # Motor financeiro e estado reativo
  App.jsx                 # Controlador do fluxo de abas
  index.css               # Estilos globais e variáveis de design
  main.jsx
```

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (v24 ou superior recomendado)
- npm (v11 ou superior)

### Instalação
1. Clone ou baixe este repositório no seu workspace.
2. Abra um terminal na pasta raiz e instale as dependências:
   ```bash
   npm install
   ```

### Executar em Desenvolvimento
Para rodar a aplicação localmente com HMR (Hot Module Replacement):
1. Inicie o servidor Vite:
   ```bash
   npm run dev
   ```
2. Acesse a aplicação abrindo a URL informada no terminal em seu navegador (geralmente [http://localhost:5173](http://localhost:5173)).

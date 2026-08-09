# Redesign visual premium — Imóveis GMBS

## Objetivo

Atualizar exclusivamente a apresentação visual do sistema existente para uma identidade dark premium alinhada à Imóveis GMBS. A mudança deve aumentar consistência, legibilidade, percepção de valor e qualidade responsiva sem modificar o funcionamento do produto.

## Limite obrigatório de escopo

Esta é uma alteração somente de interface. A implementação não pode:

- criar, remover ou renomear funcionalidades;
- criar ou remover telas, rotas ou fluxos;
- alterar handlers, estados, filtros, cálculos ou exportações;
- alterar regras de negócio, modelos, dados ou conteúdo funcional;
- alterar banco de dados, APIs, autenticação ou integrações;
- transformar elementos estáticos em novas ações;
- adicionar dependências sem necessidade estritamente visual e previamente justificada.

Os componentes poderão receber apenas mudanças de marcação e classes necessárias ao novo visual, preservando os mesmos destinos, eventos, valores e comportamentos.

## Superfícies existentes abrangidas

O redesign cobre todas as telas e componentes já presentes:

- login;
- painel;
- corretores, cadastro e detalhe de corretor;
- negócios e cadastro de negócio;
- pagamentos;
- relatórios;
- layout principal, sidebar e navegação móvel;
- cabeçalhos, cards, tabelas, filtros, inputs, selects, botões, badges, avatares e estados vazios existentes.

Nenhuma superfície nova será criada.

## Direção visual

A interface terá uma estética imobiliária premium, sóbria e contemporânea, próxima de um produto financeiro proprietário. O vermelho será um destaque controlado, não um preenchimento dominante.

### Tokens de cor

- **Preto profundo:** `#08090D` — fundo principal.
- **Dark estrutural:** `#111318` — sidebar e superfícies primárias.
- **Grafite elevado:** `#1A1D23` — cards, campos e superfícies elevadas.
- **Linha:** `#2B2F36` — bordas e divisores.
- **Vermelho GMBS:** `#E31C24` — ações primárias, foco, item ativo e indicadores relevantes.
- **Texto principal:** `#F5F5F5` — títulos e conteúdo de alta prioridade.
- **Texto secundário:** `#A5A7AD` — legendas, rótulos e conteúdo auxiliar.

As cores semânticas de sucesso, alerta e estados existentes continuam distintas do vermelho de marca para preservar compreensão.

### Tipografia

A hierarquia atual será refinada para transmitir precisão e sofisticação:

- títulos com personalidade, peso e contraste controlados;
- corpo legível e neutro para operação diária;
- números financeiros com algarismos tabulares;
- rótulos compactos com espaçamento consistente.

Não serão alterados textos ou nomes funcionais. Caracteres portugueses corrompidos serão corrigidos apenas quando a corrupção estiver realmente salva no código-fonte.

### Estrutura e componentes

- **Sidebar:** superfície escura fixa, marca GMBS clara, navegação com seleção vermelha discreta e bloco de usuário visualmente separado.
- **Navegação móvel:** barra compacta e legível, com os mesmos destinos atuais e área de toque adequada.
- **Topos de página:** hierarquia consistente entre contexto, título e ação existente.
- **Cards:** fundo grafite, bordas finas, sombras e iluminação muito sutis, raios consistentes e maior clareza dos indicadores.
- **Tabelas e listas:** cabeçalhos claros, divisores discretos, estados de hover e adaptação responsiva sem esconder dados essenciais.
- **Botões:** variantes primária, secundária e discreta visualmente consistentes, mantendo todos os eventos atuais.
- **Campos:** superfícies escuras, rótulos legíveis, placeholder contido e foco vermelho acessível.
- **Badges:** contraste semântico consistente e dimensões compactas.
- **Login:** mesma submissão e navegação atuais, com composição visual alinhada ao restante do sistema.

## Assinatura visual

A identidade será marcada por linhas arquitetônicas discretas e iluminação vermelha localizada, evocando plantas de imóveis e precisão financeira. Esse recurso será usado somente em pontos de destaque, sobretudo login e painel, para evitar aparência genérica ou excesso decorativo.

## Responsividade e acessibilidade

- Preservar o comportamento desktop e móvel das rotas existentes.
- Garantir leitura e operação em telas estreitas.
- Manter foco visível por teclado.
- Respeitar `prefers-reduced-motion`.
- Manter contraste adequado para textos, campos e controles.
- Evitar animações que atrasem ou interfiram nas ações.

## Estratégia de implementação

1. Consolidar tokens globais de cor, tipografia, foco, superfícies e movimento.
2. Atualizar os componentes compartilhados para propagar a identidade de forma consistente.
3. Ajustar cada tela existente, reutilizando os mesmos componentes, dados e handlers.
4. Revisar responsividade e estados interativos em todas as rotas.
5. Comparar o diff para confirmar que nenhuma lógica funcional foi alterada.
6. Executar lint e build completos.

## Critérios de aceitação

- Todas as rotas existentes continuam disponíveis.
- Todas as ações, filtros, formulários, cálculos e exportações mantêm o comportamento anterior.
- Nenhuma funcionalidade, rota, dependência funcional, API ou regra de negócio é adicionada ou removida.
- O dourado do redesign anterior deixa de ser a identidade dominante e o vermelho `#E31C24` passa a ser o accent principal.
- Sidebar, navegação móvel, cards, tabelas, botões, inputs e páginas seguem o mesmo sistema visual.
- A interface permanece utilizável em desktop e mobile.
- Lint e build são executados; eventuais falhas preexistentes são separadas de regressões causadas pelo redesign.

## Validação de escopo

Antes da entrega, o diff será revisado com foco especial em arquivos de dados e lógica. Qualquer alteração que não seja estritamente visual será removida, exceto correções de codificação textual confirmadas no código-fonte.

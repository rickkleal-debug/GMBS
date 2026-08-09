# GMBS Premium Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar a identidade dark premium vermelha da Imóveis GMBS em todas as telas existentes, sem alterar qualquer comportamento funcional.

**Architecture:** A implementação começa pelos tokens globais do Tailwind e pelos componentes compartilhados, fazendo a identidade propagar para as páginas sem duplicar estilos. Em seguida, cada superfície existente recebe apenas ajustes de classes e marcação decorativa, e o diff final é auditado para impedir mudanças em lógica, dados, handlers ou rotas.

**Tech Stack:** Next.js 16.3, React 19.2, TypeScript, Tailwind CSS 4, ESLint 9.

## Global Constraints

- O vermelho GMBS deve ser exatamente `#E31C24` e funcionar como accent, não como preenchimento dominante.
- Fundos e superfícies devem usar `#08090D`, `#111318`, `#1A1D23` e bordas `#2B2F36`.
- Texto principal deve usar `#F5F5F5`; texto secundário deve usar `#A5A7AD`.
- Não criar, remover ou renomear funcionalidades, telas, rotas ou fluxos.
- Não alterar handlers, estados, filtros, cálculos, exportações, modelos, dados, APIs, autenticação, integrações ou regras de negócio.
- Não adicionar dependências.
- Correções de caracteres portugueses só são permitidas quando a corrupção estiver confirmada no arquivo-fonte.
- Manter foco por teclado, `prefers-reduced-motion`, contraste e responsividade.

---

## File Map

- `app/globals.css`: tokens de cor, tipografia, superfícies, foco, seleção, movimento e utilitários decorativos globais.
- `app/layout.tsx`: fontes, metadados e classes estruturais globais; nenhuma mudança de fluxo.
- `app/(app)/layout.tsx`: composição visual da área autenticada e fundo arquitetônico decorativo.
- `components/sidebar.tsx`: marca, navegação lateral e estado ativo.
- `components/mobile-nav.tsx`: navegação compacta em telas menores.
- `components/page-header.tsx`: hierarquia de contexto, título e ação existente.
- `components/stat-card.tsx`: padrão visual dos indicadores.
- `components/avatar.tsx`: acabamento visual dos avatares existentes.
- `components/pill.tsx`: badges semânticos existentes.
- `app/login/page.tsx`: composição visual do login, mantendo `onSubmit` e `router.push` intactos.
- `app/(app)/page.tsx`: painel e seus cards/listas existentes.
- `app/(app)/corretores/page.tsx`, `app/(app)/corretores/novo/page.tsx`, `app/(app)/corretores/[id]/page.tsx`: lista, formulário e detalhe existentes.
- `app/(app)/negocios/page.tsx`, `app/(app)/negocios/novo/page.tsx`: tabela, filtros e formulário existentes.
- `app/(app)/pagamentos/page.tsx`: cards e listas de pagamentos existentes.
- `app/(app)/relatorios/page.tsx`: filtros, gráficos CSS, exportação e tabela existentes.

---

### Task 1: Establish the GMBS visual foundation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: classes Tailwind já utilizadas pelas páginas (`bg-ink`, `bg-panel`, `text-gold`, `border-hairline` e equivalentes).
- Produces: os mesmos nomes de tokens, remapeados para a paleta GMBS, evitando alterações funcionais nas páginas consumidoras.

- [ ] **Step 1: Record the baseline checks**

Run:

```powershell
npm run lint
npm run build
```

Expected: registrar separadamente qualquer falha preexistente antes das mudanças.

- [ ] **Step 2: Replace the global color tokens without changing their public class names**

Implementar em `app/globals.css` o seguinte núcleo de tokens:

```css
:root {
  --ink: #08090d;
  --panel: #111318;
  --panel-raised: #1a1d23;
  --hairline: #2b2f36;
  --gold: #e31c24;
  --gold-soft: #ff5960;
  --gold-dim: #7d2025;
  --ivory: #f5f5f5;
  --slate: #a5a7ad;
  --slate-dim: #6f737c;
}
```

Manter aliases `gold` temporariamente porque todas as páginas já os consomem; eles passam a representar o vermelho GMBS, sem alterar APIs de componentes ou lógica.

- [ ] **Step 3: Add the restrained architectural signature**

Adicionar classes puramente decorativas para grade linear, brilho vermelho localizado, sombra de card, focus ring e motion reduzido. Os pseudo-elementos devem usar `pointer-events: none` e não introduzir controles.

- [ ] **Step 4: Refine global font roles and metadata encoding**

Manter as três funções tipográficas existentes (display, texto e valores tabulares), ajustando somente pesos/classes. Confirmar que `title`, `description` e `lang="pt-BR"` permanecem semanticamente iguais.

- [ ] **Step 5: Verify the foundation**

Run:

```powershell
npm run lint
```

Expected: zero novos erros comparados à linha de base.

- [ ] **Step 6: Commit the foundation**

```powershell
git add app/globals.css app/layout.tsx
git commit -m "style: establish GMBS premium theme"
```

---

### Task 2: Restyle the shared application shell

**Files:**
- Modify: `app/(app)/layout.tsx`
- Modify: `components/sidebar.tsx`
- Modify: `components/mobile-nav.tsx`
- Modify: `components/page-header.tsx`
- Modify: `components/stat-card.tsx`
- Modify: `components/avatar.tsx`
- Modify: `components/pill.tsx`

**Interfaces:**
- Consumes: tokens globais da Task 1 e as props atuais de cada componente.
- Produces: as mesmas assinaturas `Sidebar()`, `MobileNav()`, `PageHeader(props)`, `StatCard(props)`, `Avatar(props)`, `StatusPagamentoPill(props)` e `StatusCorretorPill(props)`.

- [ ] **Step 1: Capture current component contracts**

Run:

```powershell
rg -n "export function|onClick|href=|usePathname|ReactNode" components 'app/(app)/layout.tsx'
```

Expected: salvar mentalmente as props, links e handlers que o diff final deverá preservar.

- [ ] **Step 2: Restyle the desktop shell**

Atualizar apenas classes e elementos decorativos de `app/(app)/layout.tsx` e `components/sidebar.tsx`: sidebar de 272px, borda discreta, marca GMBS, seleção ativa com accent vermelho e área do usuário elevada. Preservar exatamente `NAV`, seus `href`, `usePathname` e o link de saída.

- [ ] **Step 3: Restyle the mobile navigation**

Manter os cinco destinos existentes e o cálculo `active`; aplicar superfície translúcida, safe spacing, estado ativo vermelho e áreas de toque consistentes.

- [ ] **Step 4: Unify shared components**

Aplicar aos componentes compartilhados:

```text
PageHeader: eyebrow vermelho discreto, título claro, espaçamento responsivo.
StatCard: superfície elevada, borda fina, brilho localizado apenas quando accent=true.
Avatar: fundo grafite, aro sutil e iniciais legíveis.
Pills: sucesso e estado inativo semânticos; pendente com accent vermelho contido.
```

Não modificar props, condições ou textos.

- [ ] **Step 5: Audit component behavior**

Run:

```powershell
git diff --word-diff=porcelain -- 'app/(app)/layout.tsx' components
npm run lint
```

Expected: alterações funcionais ausentes; lint sem novos erros.

- [ ] **Step 6: Commit the shared shell**

```powershell
git add 'app/(app)/layout.tsx' components/sidebar.tsx components/mobile-nav.tsx components/page-header.tsx components/stat-card.tsx components/avatar.tsx components/pill.tsx
git commit -m "style: refine GMBS application shell"
```

---

### Task 3: Apply the visual system to every existing screen

**Files:**
- Modify: `app/login/page.tsx`
- Modify: `app/(app)/page.tsx`
- Modify: `app/(app)/corretores/page.tsx`
- Modify: `app/(app)/corretores/novo/page.tsx`
- Modify: `app/(app)/corretores/[id]/page.tsx`
- Modify: `app/(app)/negocios/page.tsx`
- Modify: `app/(app)/negocios/novo/page.tsx`
- Modify: `app/(app)/pagamentos/page.tsx`
- Modify: `app/(app)/relatorios/page.tsx`

**Interfaces:**
- Consumes: componentes compartilhados e tokens das Tasks 1–2.
- Produces: as mesmas páginas, rotas, links, formulários, filtros, cálculos, exportações e estados atuais com apresentação consistente.

- [ ] **Step 1: Inventory functional expressions before editing**

Run:

```powershell
rg -n "onSubmit|onClick|onChange|useState|useMemo|router\.|href=|exportarCSV|reduce\(|filter\(|sort\(" app
```

Expected: usar a saída como checklist invariável durante o redesign.

- [ ] **Step 2: Restyle the login page**

Preservar integralmente `onSubmit`, `setCarregando`, `setTimeout`, `router.push`, valores e atributos dos campos. Alterar somente classes e marcação decorativa para painel institucional preto/grafite, glow vermelho localizado, card de autenticação elevado e acabamento responsivo.

- [ ] **Step 3: Restyle dashboard and finance cards**

Aplicar superfícies, espaçamentos, bordas, hierarquia numérica, hover e iluminação consistente em `app/(app)/page.tsx`. Não alterar `MES_ATUAL`, `MES_ANTERIOR`, filtros, `reduce`, ranking, ordenações ou links.

- [ ] **Step 4: Restyle list and table screens**

Atualizar somente classes de corretores, negócios, pagamentos e relatórios. Padronizar barra de filtros, tabela, linhas, cabeçalho, ações e estados vazios. Manter todos os `useState`, `useMemo`, filtros, `onClick`, `href`, `marcarComoPago`, `exportarCSV` e `window.print` inalterados.

- [ ] **Step 5: Restyle forms and detail screen**

Padronizar labels, inputs, selects, agrupamentos, botões e painéis das páginas `novo` e `[id]`. Preservar atributos de formulário, opções, valores padrão, submissão, navegação e dados exibidos.

- [ ] **Step 6: Check responsive layouts**

Executar o projeto e inspecionar as rotas em aproximadamente 390px, 768px e 1440px:

```powershell
npm run dev
```

Expected: ausência de sobreposição; tabelas continuam acessíveis; ações permanecem visíveis; navegação desktop/mobile troca no breakpoint existente.

- [ ] **Step 7: Audit behavior and lint**

Run:

```powershell
rg -n "onSubmit|onClick|onChange|useState|useMemo|router\.|href=|exportarCSV|reduce\(|filter\(|sort\(" app
git diff --word-diff=porcelain -- app
npm run lint
```

Expected: inventário funcional equivalente ao Step 1 e zero novos erros de lint.

- [ ] **Step 8: Commit the page styling**

```powershell
git add app/login/page.tsx 'app/(app)'
git commit -m "style: apply premium theme across existing screens"
```

---

### Task 4: Final scope, quality, and build verification

**Files:**
- Inspect: all tracked and untracked project files
- Modify: only visual files listed above if verification exposes a visual regression

**Interfaces:**
- Consumes: completed visual system.
- Produces: evidence that the redesign builds and remains functionally scoped.

- [ ] **Step 1: Audit prohibited files and dependencies**

Run:

```powershell
git diff -- package.json package-lock.json lib next.config.ts
git status --short
```

Expected: nenhuma mudança causada pelo redesign em dependências, dados, tipos, formatação de negócio ou configuração funcional.

- [ ] **Step 2: Audit routes and functional expressions**

Run:

```powershell
Get-ChildItem app -Recurse -Filter page.tsx | Select-Object -ExpandProperty FullName
rg -n "onSubmit|onClick|onChange|useState|useMemo|router\.|href=|exportarCSV|reduce\(|filter\(|sort\(" app
```

Expected: todas as rotas e expressões funcionais originais continuam presentes.

- [ ] **Step 3: Run the complete linter**

Run:

```powershell
npm run lint
```

Expected: exit code 0.

- [ ] **Step 4: Run the production build**

Run:

```powershell
npm run build
```

Expected: exit code 0 e todas as rotas existentes compiladas.

- [ ] **Step 5: Perform final visual inspection**

Inspecionar login, painel, corretores, detalhe/cadastro, negócios/cadastro, pagamentos e relatórios em desktop e mobile. Confirmar foco visível, contraste, scroll de tabela, navegação e ausência de controles novos.

- [ ] **Step 6: Review the final diff**

Run:

```powershell
git diff --check
git diff --stat
git status --short
```

Expected: nenhuma falha de whitespace e alterações limitadas à apresentação e documentação aprovada.

- [ ] **Step 7: Commit final verification fixes if needed**

```powershell
git add app components
git commit -m "style: finalize responsive GMBS redesign"
```

Não criar commit se nenhuma correção final tiver sido necessária.

# Campus Fix

Aplicação móvel para reportar e acompanhar ocorrências de manutenção no campus: problemas em salas, edifícios e equipamentos. A pessoa cria uma ocorrência (com ou sem leitura de QR code), anexa uma foto e acompanha o estado até a resolução.

Projeto desenvolvido na unidade curricular de IPC.

## Stack

- [Expo](https://docs.expo.dev/) SDK 58 + React Native 0.88
- TypeScript (modo `strict`)
- [Expo Router](https://docs.expo.dev/router/introduction/): navegação baseada em arquivos
- `react-native-svg` + `react-native-svg-transformer`: ícones e logótipos em SVG
- Fontes Roboto e Roboto Condensed (`@expo-google-fonts`)

## Como rodar

Pré-requisitos: Node.js 22 ou superior e npm.

```bash
npm install
npx expo start
```

No terminal do Expo:

- `w`: abre no navegador
- `i`: abre no iOS Simulator (macOS com Xcode)
- `a`: abre no emulador Android
- ou leia o QR code com o app **Expo Go** no celular

Se algo estranho acontecer depois de mudar configurações, limpe o cache:

```bash
npx expo start --clear
```

### Outros comandos

```bash
npx tsc --noEmit        # verificação de tipos
npx expo lint           # lint
npx expo install <pkg>  # instalar dependências compatíveis com o SDK
npx expo-doctor         # diagnosticar problemas de configuração
```

> Use sempre `npx expo install` em vez de `npm install` para bibliotecas do app: ele escolhe a versão compatível com o SDK do Expo.

## Estrutura

```
src/
├── app/                # telas (Expo Router): cada arquivo é uma rota
│   ├── _layout.tsx     # layout raiz: carrega as fontes e define o Stack
│   └── index.tsx       # tela inicial (showcase do design system)
├── components/         # componentes do design system, um por pasta
├── theme/              # tokens: cores, tipografia, espaçamentos e raios
└── assets/
    ├── icons/          # ícones SVG 24×24 (usam currentColor)
    └── images/         # logótipos e ilustrações
```

Só arquivos de tela vão em `src/app/`. Componentes, hooks e utilitários ficam fora dessa pasta.

O alias `@/` aponta para `src/`:

```ts
import { colors, spacing } from '@/theme';
import { Icon } from '@/components/Icon';
```

## Design system

Os componentes seguem o arquivo do Figma [Campus Fix](https://www.figma.com/design/2YfjPZzyriNGH3EsJvKHIq/Campus-Fix), na página **Design System**.

### Tokens (`src/theme`)

| Arquivo | Conteúdo |
|---|---|
| `colors.ts` | marca (`#8b1a2e`), texto, superfícies, bordas e cores de estado (pendente, em resolução, concluído, erro) |
| `typography.ts` | estilos de texto: `pageTitle`, `sectionTitle`, `body`, `button`, `label`, `overline`… |
| `spacing.ts` | espaçamentos `xs` (4) a `4xl` (64) e raios `sm`, `md`, `lg`, `full` |

Use sempre os tokens em vez de valores fixos:

```tsx
<View style={{ padding: spacing.l, backgroundColor: colors.surface.subtle, borderRadius: radius.md }}>
    <Text style={[typography.body, { color: colors.text.primary }]}>Olá</Text>
</View>
```

### Ícones

Ícones exportados do Figma, disponíveis pelo componente `Icon` (a lista completa está em `iconNames`):

```tsx
<Icon name="search" />
<Icon name="pending" size={20} color={colors.status.pending} />
```

Para adicionar um ícone novo: exporte-o do Figma como SVG para `src/assets/icons/`, troque a cor do traço por `currentColor` e registre-o em `src/components/Icon/Icon.tsx`.

### Componentes

Cada componente fica em `src/components/<Nome>/` e pode ser importado de `@/components`:

```tsx
import { Button, StatusBadge, TextField } from '@/components';
```

A tela inicial (`src/app/index.tsx`) é um catálogo com todos os componentes, variantes e estados. Abra o app para vê-los.

**Botões e ações**

| Componente | Para quê | Props principais |
|---|---|---|
| `Button` | botão primário ou secundário | `title`, `variant` (`primary` \| `secondary`), `size` (`sm` \| `md` \| `lg` \| `xl`), `icon`, `disabled` |
| `ArrowButton` | botão mobile com rótulo à esquerda e seta à direita | `title`, `variant`, `icon` |
| `ActionTile` | blocos grandes da página inicial (reportar / ler QR code) | `variant` (`report` \| `qr-code`), `size` |
| `ActionCard` | cartão "Acompanhar ocorrência" | `title`, `icon` |
| `TextLink` | link de texto ("Esqueci a palavra-passe") | `title`, `onPress` |
| `BackButton` | seta de voltar (mobile) | `onPress` |
| `IconButton` | fechar modal, lanterna, alternar câmara | `icon`, `variant` (`outline` \| `subtle`), `selected` |
| `IconToggle` | botão de ícone que liga/desliga (ex.: filtro) | `icon`, `active` |
| `UploadButton` | anexar foto | `variant` (`full` \| `compact`), `label` |

**Estado e dados**

| Componente | Para quê | Props principais |
|---|---|---|
| `StatusBadge` | etiqueta de estado da ocorrência | `status` (`pending` \| `in-progress` \| `done` \| `error`) |
| `StatCard` | cartão de estatística | `label`, `value`, `caption`, `variant` |
| `SummaryCard` | resumo dos dados da ocorrência | `items`, `title` |
| `ResultSymbol` | símbolo de sucesso/cancelamento | `variant` (`confirmation` \| `cancellation`) |
| `StarRating` | avaliação de 1 a 5 estrelas | `value`, `onChange`, `size` |

**Formulários**

| Componente | Para quê | Props principais |
|---|---|---|
| `TextField` | campo de texto, palavra-passe ou área de texto | `value`, `onChangeText`, `label`, `variant` (`text` \| `password` \| `textarea`), `error`, `helperText` |
| `FieldLabel` | rótulo de campo | `children` |
| `Select` | lista suspensa (escola, categoria, piso, sala) | `options`, `value`, `onChange`, `label` |
| `SelectOption` | item de lista selecionável | `label`, `selected`, `onPress` |
| `LanguageSwitch` | seletor PT \| EN | `value`, `onChange` |

**Navegação e estrutura**

| Componente | Para quê | Props principais |
|---|---|---|
| `AppHeader` | cabeçalho mobile | `variant` (`logo` \| `logo-logout` \| `back-logo` \| `back-title`), `title`, `onBack`, `onLogout` |
| `BottomTabBar` | barra de abas inferior (Pesquisa, Início, Reportar) | `active`, `onChange` |
| `LanguageFooter` | rodapé com botão de idioma | `open`, `onOpenChange`, `language`, `onChangeLanguage` |
| `TopNav` | menu do topo (web) | `active`, `onChange`, `items`, `language`, `onChangeLanguage` |
| `ConfirmModal` | modal de confirmação (`ConfirmDialog` é só o cartão) | `visible`, `title`, `message`, `onConfirm`, `onCancel` |
| `QrFrame` | moldura do leitor de QR code | `size`, `children` (pré-visualização da câmara) |
| `Logo` | logótipo | `variant` (`full` \| `campus-fix` \| `campus-fix-shadow`), `width` ou `height` |

Os componentes são controlados: o estado (valor selecionado, aba ativa, modal aberto) fica na tela que os usa, e eles só avisam mudanças pelos callbacks (`onChange`, `onPress`…).

## Convenções

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/pt-br/), por exemplo `feat: adiciona componente Button`, `fix: corrige cor do badge`, `chore: atualiza dependências`, `docs: atualiza README`.
- **Código**: 4 espaços, aspas simples, `StyleSheet.create`, exports nomeados.
- **Textos da interface**: em português, como no Figma.

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

25 ícones exportados do Figma, disponíveis pelo componente `Icon`:

```tsx
<Icon name="search" />
<Icon name="pending" size={20} color={colors.status.pending} />
```

Para adicionar um ícone novo: exporte-o do Figma como SVG para `src/assets/icons/`, troque a cor do traço por `currentColor` e registre-o em `src/components/Icon/Icon.tsx`.

### Componentes

Cada componente fica em `src/components/<Nome>/` e todos aparecem na tela inicial (`src/app/index.tsx`), que serve de catálogo. Abra o app para ver todas as variantes e estados.

## Convenções

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/pt-br/), por exemplo `feat: adiciona componente Button`, `fix: corrige cor do badge`, `chore: atualiza dependências`, `docs: atualiza README`.
- **Código**: 4 espaços, aspas simples, `StyleSheet.create`, exports nomeados.
- **Textos da interface**: em português, como no Figma.

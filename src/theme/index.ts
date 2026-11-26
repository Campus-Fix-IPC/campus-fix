import { colors } from './colors';

export * from './colors';
export * from './spacing';
export * from './typography';

// Sombra padrão (token efeito/sombra)
export const shadow = {
    boxShadow: `0px 2px 8px ${colors.shadow}`,
} as const;

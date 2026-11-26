import { Platform, StyleSheet } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

// Estados de borda dos campos (Figma › Espaçamentos e bordas › Borda de campo 535:930)
// e medidas comuns dos campos de formulário (Formulario/* e Botão de seleção).
export const FIELD_HEIGHT = 56;
export const FIELD_PADDING_X = 20;
const BORDER_NORMAL = 1.5;
const BORDER_ACTIVE = 2;

// Na coluna WEB do Figma os campos usam a superfície subtil; no mobile, a superfície do campo.
export const fieldBackground = Platform.OS === 'web' ? colors.surface.subtle : colors.surface.field;

export const fieldStyles = StyleSheet.create({
    // Estado "Normal"
    base: {
        minHeight: FIELD_HEIGHT,
        borderWidth: BORDER_NORMAL,
        borderColor: colors.border.field,
        borderRadius: radius.md,
        paddingHorizontal: FIELD_PADDING_X,
        backgroundColor: fieldBackground,
    },
    // Estado "Ativo": 2 px na cor da marca (compensa o padding para o conteúdo não saltar)
    active: {
        borderWidth: BORDER_ACTIVE,
        borderColor: colors.brand.primary,
        paddingHorizontal: FIELD_PADDING_X - (BORDER_ACTIVE - BORDER_NORMAL),
    },
    // Estado "Foco" (teclado): contorno 2 px afastado 2 px
    focusRing: {
        outlineWidth: 2,
        outlineStyle: 'solid',
        outlineColor: colors.brand.primary,
        outlineOffset: 2,
    },
    error: {
        borderColor: colors.status.error,
    },
    disabled: {
        opacity: 0.5,
    },
    helperText: {
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 21,
        color: colors.text.secondary,
        marginTop: spacing.xs / 2,
    },
    errorText: {
        color: colors.status.error,
    },
});

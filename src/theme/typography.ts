import type { TextStyle } from 'react-native';

const text = (fontFamily: string, fontSize: number, lineHeight: number, extra: TextStyle = {}): TextStyle => ({
    fontFamily,
    fontSize,
    lineHeight: Math.round(fontSize * lineHeight),
    ...extra,
});

export const fonts = {
    regular: 'Roboto_400Regular',
    medium: 'Roboto_500Medium',
    semibold: 'Roboto_600SemiBold',
    bold: 'Roboto_700Bold',
    condensedBold: 'RobotoCondensed_700Bold',
} as const;

export const typography = {
    display: { fontFamily: fonts.bold, fontSize: 96, lineHeight: 104 },
    pageTitle: text(fonts.bold, 24, 1.25),
    sectionTitle: text(fonts.bold, 20, 1.3),
    subtitle: text(fonts.regular, 15, 1.4),
    body: text(fonts.regular, 15, 1.5),
    bodyStrong: text(fonts.semibold, 15, 1.5),
    button: text(fonts.semibold, 15, 1.2),
    label: text(fonts.semibold, 13, 1.3),
    condensed: text(fonts.condensedBold, 15, 1.4),
    overline: text(fonts.medium, 14, 1.3, { letterSpacing: 8, textTransform: 'uppercase' }),
} satisfies Record<string, TextStyle>;

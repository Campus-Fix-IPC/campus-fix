import { Image, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';

import LogoCampusFix from '@/assets/images/logo-campus-fix.svg';

// Imagens raster via require(): o projeto não declara módulos *.png / *.jpg para o TypeScript.
// Figma › Logotipos (535:1772)
// - 'full': Logótipo/Completo · UPB + Campus Fix (535:1778) — imagem raster 900 × 740
// - 'campus-fix': Logótipo Campus Fix (535:1783) — vetor 382.986 × 346
// - 'campus-fix-shadow': "logotipo pequeno sombra" usado no cabeçalho mobile (535:1727)
export type LogoVariant = 'full' | 'campus-fix' | 'campus-fix-shadow';

const logos = {
    full: {
        source: require('@/assets/images/logo-full.jpg') as ImageSourcePropType,
        width: 900,
        height: 740,
        defaultHeight: 520,
        label: 'Universidade Politécnica de Bragança · Campus Fix',
    },
    'campus-fix': {
        source: null,
        width: 382.986,
        height: 346,
        defaultHeight: 346,
        label: 'Campus Fix',
    },
    'campus-fix-shadow': {
        source: require('@/assets/images/logo-campus-fix-shadow.png') as ImageSourcePropType,
        width: 256,
        height: 230,
        defaultHeight: 42,
        label: 'Campus Fix',
    },
} as const;

type Props = {
    variant?: LogoVariant;
    // Indicar apenas uma das dimensões; a outra é calculada para manter a proporção.
    width?: number;
    height?: number;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

export function getLogoSize(variant: LogoVariant, width?: number, height?: number) {
    const logo = logos[variant];
    const ratio = logo.width / logo.height;
    if (width != null) {
        return { width, height: width / ratio };
    }
    const h = height ?? logo.defaultHeight;
    return { width: h * ratio, height: h };
}

export function Logo({ variant = 'campus-fix', width, height, accessibilityLabel, style }: Props) {
    const logo = logos[variant];
    const size = getLogoSize(variant, width, height);

    return (
        <View
            accessible
            accessibilityRole="image"
            accessibilityLabel={accessibilityLabel ?? logo.label}
            style={[size, style]}
        >
            {logo.source == null ? (
                <LogoCampusFix width={size.width} height={size.height} />
            ) : (
                <Image source={logo.source} style={size} resizeMode="contain" />
            )}
        </View>
    );
}

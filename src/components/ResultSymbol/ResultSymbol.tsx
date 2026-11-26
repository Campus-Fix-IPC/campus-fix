import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import ResultCheck from '@/assets/icons/result-check.svg';
import ResultClose from '@/assets/icons/result-close.svg';
import { colors, radius } from '@/theme';

// Figma: Símbolo de resultado/Confirmação 535:1831, Símbolo de resultado/Cancelamento 535:1837
export type ResultSymbolVariant = 'confirmation' | 'cancellation';

type Props = {
    variant: ResultSymbolVariant;
    size?: number;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

const CONFIG = {
    confirmation: {
        Svg: ResultCheck,
        color: colors.status.success,
        background: colors.status.successBg,
        label: 'Concluída',
    },
    cancellation: {
        Svg: ResultClose,
        color: colors.status.error,
        background: colors.status.errorBg,
        label: 'Interrompida',
    },
} as const;

export function ResultSymbol({ variant, size = 100, accessibilityLabel, style }: Props) {
    const { Svg, color, background, label } = CONFIG[variant];
    const iconSize = Math.round(size * 0.4);

    return (
        <View
            accessible
            accessibilityRole="image"
            accessibilityLabel={accessibilityLabel ?? label}
            style={[styles.container, { width: size, height: size, backgroundColor: background }, style]}
        >
            <Svg width={iconSize} height={iconSize} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
});

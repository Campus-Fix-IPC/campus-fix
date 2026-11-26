import { useState, type FC } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import MyReportsLarge from '@/assets/icons/my-reports-large.svg';
import { colors, radius, spacing, typography } from '@/theme';

type Props = {
    title: string;
    onPress?: () => void;
    // SVG importado diretamente (por omissão, o ícone "Minhas ocorrências" 72 px)
    icon?: FC<SvgProps>;
    iconSize?: number;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

// Cartão de ação da página inicial mobile (Figma 535:1412 "Acompanhar ocorrência")
export function ActionCard({
    title,
    onPress,
    icon: Svg = MyReportsLarge,
    iconSize = 72,
    disabled = false,
    accessibilityLabel,
    style,
}: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel ?? title}
            accessibilityState={{ disabled }}
            style={({ pressed }) => [
                styles.card,
                !disabled && hovered && !pressed && styles.hover,
                !disabled && pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Svg width={iconSize} height={iconSize} color={colors.brand.primary} />
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 165,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.m,
        paddingHorizontal: spacing.xl,
        backgroundColor: colors.surface.page,
        borderWidth: 4,
        borderColor: colors.brand.primary,
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
    hover: {
        backgroundColor: colors.brand.softBg,
    },
    pressed: {
        backgroundColor: colors.brand.pressedBg,
    },
    title: {
        ...typography.sectionTitle,
        color: colors.brand.primary,
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});

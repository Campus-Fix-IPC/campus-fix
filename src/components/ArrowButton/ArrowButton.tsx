import { useState } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import ArrowRightThin from '@/assets/icons/arrow-right-thin.svg';
import { renderButtonIcon, type ButtonIcon } from '@/components/Button';
import { colors, fonts, radius, spacing } from '@/theme';

type Props = {
    title: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary';
    // Ícone à direita (por omissão, a seta)
    icon?: ButtonIcon;
    iconSize?: number;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

// Botão mobile com rótulo à esquerda e ícone à direita (Figma 535:1543)
export function ArrowButton({
    title,
    onPress,
    variant = 'primary',
    icon = ArrowRightThin,
    iconSize = 19,
    disabled = false,
    accessibilityLabel,
    style,
}: Props) {
    const [hovered, setHovered] = useState(false);
    const isPrimary = variant === 'primary';
    const contentColor = isPrimary ? colors.text.inverse : colors.text.primary;

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
                styles.base,
                isPrimary ? styles.primary : styles.secondary,
                !disabled && hovered && !pressed && (isPrimary ? styles.primaryHover : styles.secondaryHover),
                !disabled && pressed && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
                disabled && styles.disabled,
                style,
            ]}
        >
            <Text numberOfLines={1} style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
                {title}
            </Text>
            {renderButtonIcon(icon, iconSize, contentColor)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.s,
        paddingHorizontal: 20,
        borderRadius: radius.md,
    },
    primary: {
        backgroundColor: colors.brand.primary,
        borderWidth: 1,
        borderColor: colors.brand.primaryDark,
    },
    primaryHover: {
        backgroundColor: colors.brand.primaryDark,
        borderColor: colors.brand.primaryDark,
    },
    primaryPressed: {
        backgroundColor: colors.brand.primaryPressed,
        borderColor: colors.brand.primaryPressed,
    },
    secondary: {
        backgroundColor: colors.surface.field,
        borderWidth: 1.5,
        borderColor: colors.border.field,
    },
    secondaryHover: {
        backgroundColor: colors.surface.fieldHover,
        borderColor: colors.border.fieldHover,
    },
    secondaryPressed: {
        backgroundColor: colors.surface.fieldPressed,
        borderColor: colors.border.field,
    },
    label: {
        flex: 1,
        fontSize: 17,
    },
    primaryLabel: {
        fontFamily: fonts.bold,
        lineHeight: 24,
        color: colors.text.inverse,
    },
    secondaryLabel: {
        fontFamily: fonts.medium,
        lineHeight: 20,
        color: colors.text.primary,
    },
    disabled: {
        opacity: 0.5,
    },
});

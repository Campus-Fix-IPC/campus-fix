import { useState, type FC } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { Icon, type IconName } from '@/components/Icon';
import { colors, fonts, radius, spacing } from '@/theme';

// Ícone de um botão: nome registado em <Icon> ou um SVG importado diretamente
export type ButtonIcon = IconName | FC<SvgProps>;

export function renderButtonIcon(icon: ButtonIcon, size: number, color: string) {
    if (typeof icon === 'string') {
        return <Icon name={icon} size={size} color={color} />;
    }
    const Svg = icon;
    return <Svg width={size} height={size} color={color} />;
}

export type ButtonVariant = 'primary' | 'secondary';
// sm = 44 (mobile, modal) · md = 48 (web) · lg = 56 (secundário web) · xl = 68 (destaque)
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type Props = {
    title: string;
    onPress?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ButtonIcon;
    iconSize?: number;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

const heights: Record<ButtonSize, number> = { sm: 44, md: 48, lg: 56, xl: 68 };

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = variant === 'primary' ? 'md' : 'lg',
    icon,
    iconSize = variant === 'primary' ? 16 : 22,
    disabled = false,
    accessibilityLabel,
    style,
}: Props) {
    const [hovered, setHovered] = useState(false);
    const isPrimary = variant === 'primary';
    const isCompact = size === 'sm';
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
                { height: heights[size] },
                isPrimary ? styles.primary : styles.secondary,
                isPrimary ? null : isCompact ? styles.secondaryCompact : null,
                isCompact ? styles.compact : isPrimary ? styles.primaryPadding : styles.secondaryPadding,
                !disabled && hovered && !pressed && (isPrimary ? styles.primaryHover : styles.secondaryHover),
                !disabled && pressed && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
                disabled && styles.disabled,
                style,
            ]}
        >
            {icon ? (
                <View style={[styles.iconSlot, isPrimary ? styles.iconSlotPrimary : null]}>
                    {renderButtonIcon(icon, iconSize, contentColor)}
                </View>
            ) : null}
            <Text numberOfLines={1} style={[isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.md,
        overflow: 'hidden',
    },
    // Botão primário (Figma 535:1615 / 535:1622 / 535:1629)
    primary: {
        backgroundColor: colors.brand.primary,
        borderWidth: 1,
        borderColor: colors.brand.primaryDark,
        gap: 10,
    },
    primaryPadding: {
        paddingLeft: 20,
        paddingRight: spacing.xl,
    },
    primaryHover: {
        backgroundColor: colors.brand.primaryDark,
        borderColor: colors.brand.primaryDark,
    },
    primaryPressed: {
        backgroundColor: colors.brand.primaryPressed,
        borderColor: colors.brand.primaryPressed,
    },
    primaryLabel: {
        fontFamily: fonts.bold,
        fontSize: 17,
        lineHeight: 24,
        color: colors.text.inverse,
    },
    // Botão secundário (Figma 535:1495 / 535:1501 / 535:1507)
    secondary: {
        backgroundColor: colors.surface.subtle,
        borderWidth: 1.5,
        borderColor: colors.border.field,
        gap: spacing.m,
    },
    secondaryCompact: {
        backgroundColor: colors.surface.field,
    },
    secondaryPadding: {
        paddingHorizontal: spacing['2xl'],
    },
    secondaryHover: {
        backgroundColor: colors.surface.fieldHover,
        borderColor: colors.border.fieldHover,
    },
    secondaryPressed: {
        backgroundColor: colors.surface.fieldPressed,
        borderColor: colors.border.field,
    },
    secondaryLabel: {
        fontFamily: fonts.medium,
        fontSize: 17,
        lineHeight: 20,
        color: colors.text.primary,
    },
    // Variante compacta mobile 44 px (Figma 535:1608 / 535:1487)
    compact: {
        minWidth: 142,
        paddingHorizontal: 11,
    },
    iconSlot: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSlotPrimary: {
        minWidth: 20,
        minHeight: 20,
    },
    disabled: {
        opacity: 0.5,
    },
});

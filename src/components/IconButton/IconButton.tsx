import { useState } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IconName } from '@/components/Icon/Icon';
import { colors, radius } from '@/theme';

// Figma: Botão fechar modal 535:1348 (variant 'outline'),
// Controlo de câmara 535:1361 — Lanterna 535:1362 / Alternar câmara 535:1364 (variant 'subtle')
export type IconButtonVariant = 'outline' | 'subtle';

type Props = {
    icon: IconName;
    accessibilityLabel: string;
    onPress?: () => void;
    variant?: IconButtonVariant;
    /** Estado ligado (ex.: lanterna acesa). Quando definido, o botão comporta-se como toggle. */
    selected?: boolean;
    disabled?: boolean;
    size?: number;
    style?: StyleProp<ViewStyle>;
};

export function IconButton({
    icon,
    accessibilityLabel,
    onPress,
    variant = 'outline',
    selected,
    disabled = false,
    size = 56,
    style,
}: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ disabled, selected }}
            disabled={disabled}
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.base,
                { width: size, height: size },
                variant === 'outline' ? styles.outline : styles.subtle,
                (hovered || selected) && styles.hovered,
                pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Icon name={icon} size={24} color={selected ? colors.brand.primary : colors.text.primary} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    outline: {
        backgroundColor: colors.surface.field,
        borderWidth: 1.5,
        borderColor: colors.border.field,
        borderRadius: radius.md,
    },
    subtle: {
        backgroundColor: colors.surface.subtle,
        borderWidth: 1,
        borderColor: colors.border.default,
        // Figma usa 7px neste controlo (sem token equivalente)
        borderRadius: 7,
    },
    hovered: {
        backgroundColor: colors.brand.softBg,
        borderColor: colors.brand.primary,
    },
    pressed: {
        backgroundColor: colors.brand.pressedBg,
        borderColor: colors.brand.primaryDark,
    },
    disabled: {
        opacity: 0.5,
    },
});

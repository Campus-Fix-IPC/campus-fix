import { useState } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IconName } from '@/components/Icon/Icon';
import { colors, radius } from '@/theme';

// Figma: Botão de idioma (ícone) 535:1323 — Estado Normal 535:1324 / Ativo 535:1326
type Props = {
    icon: IconName;
    accessibilityLabel: string;
    active?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export function IconToggle({ icon, accessibilityLabel, active = false, disabled = false, onPress, style }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ selected: active, expanded: active, disabled }}
            disabled={disabled}
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.base,
                hovered && !active && styles.hovered,
                active && styles.active,
                pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Icon name={icon} size={24} color={active ? colors.brand.primary : colors.text.primary} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hovered: {
        backgroundColor: colors.surface.fieldHover,
    },
    active: {
        backgroundColor: colors.brand.softBg,
    },
    pressed: {
        backgroundColor: colors.brand.pressedBg,
    },
    disabled: {
        opacity: 0.5,
    },
});

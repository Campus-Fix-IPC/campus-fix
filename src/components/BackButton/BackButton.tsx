import { useState } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from '@/components/Icon';
import { colors, radius, spacing } from '@/theme';

type Props = {
    onPress?: () => void;
    disabled?: boolean;
    accessibilityLabel?: string;
    color?: string;
    style?: StyleProp<ViewStyle>;
};

// Botão "voltar" só com ícone, usado no cabeçalho mobile (Figma 535:1466 "Botão secundário/Voltar Mobile").
// Na web usar <Button variant="secondary" icon={ChevronLeft} title="Voltar" /> (Figma 535:1456).
export function BackButton({
    onPress,
    disabled = false,
    accessibilityLabel = 'Voltar',
    color = colors.text.primary,
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
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ disabled }}
            hitSlop={spacing.s}
            style={({ pressed }) => [
                styles.button,
                !disabled && hovered && !pressed && styles.hover,
                !disabled && pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Icon name="back" size={24} color={color} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.full,
    },
    hover: {
        backgroundColor: colors.surface.fieldHover,
    },
    pressed: {
        backgroundColor: colors.surface.fieldPressed,
    },
    disabled: {
        opacity: 0.5,
    },
});

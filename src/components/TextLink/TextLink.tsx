import { useState } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, typography } from '@/theme';

type Props = {
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

// Link de texto (Figma 535:1433 "Link/Esqueci a palavra-passe")
export function TextLink({ title, onPress, disabled = false, accessibilityLabel, style }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            accessibilityRole="link"
            accessibilityLabel={accessibilityLabel ?? title}
            accessibilityState={{ disabled }}
            style={[styles.container, disabled && styles.disabled, style]}
        >
            {({ pressed }) => (
                <Text
                    style={[
                        styles.label,
                        !disabled && hovered && styles.hover,
                        !disabled && pressed && styles.pressed,
                    ]}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    label: {
        ...typography.button,
        color: colors.brand.primary,
    },
    hover: {
        textDecorationLine: 'underline',
    },
    pressed: {
        color: colors.brand.primaryPressed,
    },
    disabled: {
        opacity: 0.5,
    },
});

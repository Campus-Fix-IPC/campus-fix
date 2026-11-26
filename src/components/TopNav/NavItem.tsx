import { useState } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, spacing, typography } from '@/theme';

// Figma › Item do menu (535:1665): Estado=Normal (535:1666) / Hover (535:1668) / Ativo (535:1670)
type Props = {
    label: string;
    active?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export function NavItem({ label, active = false, onPress, style }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.item,
                !active && (hovered || pressed) && styles.hovered,
                active && styles.active,
                style,
            ]}
        >
            {({ pressed }) => (
                <Text
                    style={[
                        active ? styles.labelActive : styles.label,
                        (active || hovered || pressed) && styles.labelBrand,
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    // Normal: padding 16; Hover/Ativo: 16/16/13 + borda inferior 3px → altura constante
    item: {
        paddingTop: spacing.l,
        paddingHorizontal: spacing.l,
        paddingBottom: 13,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    hovered: {
        backgroundColor: colors.surface.subtle,
        borderBottomColor: colors.border.default,
    },
    active: {
        borderBottomColor: colors.brand.primary,
    },
    label: {
        ...typography.body,
        color: colors.text.primary,
    },
    labelActive: {
        ...typography.bodyStrong,
    },
    labelBrand: {
        color: colors.brand.primary,
    },
});

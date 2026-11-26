import { useState } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IconName } from '@/components/Icon';
import { colors, radius } from '@/theme';

// Figma › Destino de navegação (535:1685): Destino=Pesquisa/Início/Reportar × Estado=Normal/Ativo
export type TabDestination = 'search' | 'home' | 'report';

export const tabDestinations: Record<TabDestination, { icon: IconName; label: string }> = {
    search: { icon: 'search', label: 'Pesquisa' },
    home: { icon: 'home', label: 'Início' },
    report: { icon: 'create-report', label: 'Reportar' },
};

type Props = {
    destination: TabDestination;
    active?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export function TabItem({ destination, active = false, onPress, style }: Props) {
    const [hovered, setHovered] = useState(false);
    const { icon, label } = tabDestinations[destination];

    return (
        <Pressable
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: active }}
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.item,
                active && styles.active,
                hovered && !active && styles.hovered,
                pressed && styles.pressed,
                style,
            ]}
        >
            <Icon name={icon} size={24} color={active ? colors.brand.primary : colors.text.secondary} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 48,
        minWidth: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.md,
        overflow: 'hidden',
    },
    active: {
        backgroundColor: colors.brand.softBg,
    },
    hovered: {
        backgroundColor: colors.surface.subtle,
    },
    pressed: {
        backgroundColor: colors.brand.pressedBg,
    },
});

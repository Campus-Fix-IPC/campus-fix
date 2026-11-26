import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

import { TabItem, type TabDestination } from './TabItem';

// Figma › Navegação / Principal (535:1699): Ativo=Pesquisa (535:1700) / Início (535:1704) / Reportar (535:1708)
const order: TabDestination[] = ['search', 'home', 'report'];

const BAR_HEIGHT = 72;

type Props = {
    active: TabDestination;
    onChange: (destination: TabDestination) => void;
    // Acrescenta o inset inferior (home indicator) ao padding. Desligar se o ecrã já o tratar.
    safeArea?: boolean;
    style?: StyleProp<ViewStyle>;
};

export function BottomTabBar({ active, onChange, safeArea = true, style }: Props) {
    const insets = useSafeAreaInsets();
    const bottomInset = safeArea ? insets.bottom : 0;

    return (
        <View
            accessibilityRole="tablist"
            style={[
                styles.bar,
                { minHeight: BAR_HEIGHT + bottomInset, paddingBottom: spacing.s + bottomInset },
                style,
            ]}
        >
            {order.map((destination) => (
                <TabItem
                    key={destination}
                    destination={destination}
                    active={destination === active}
                    onPress={() => onChange(destination)}
                    style={styles.item}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.s,
        paddingHorizontal: spacing.m,
        paddingTop: spacing.s,
        backgroundColor: colors.surface.page,
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
    },
    item: {
        flex: 1,
    },
});

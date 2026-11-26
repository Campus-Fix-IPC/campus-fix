import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IconName } from '@/components/Icon';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import { Logo } from '@/components/Logo';
import { colors, radius, spacing, typography } from '@/theme';

import { NavItem } from './NavItem';

// Figma › Menu do topo (535:1650) — desenhado a 1440px com 120px de margem lateral.
// Aqui o conteúdo é limitado a 1200px e centrado, por isso a 1440px fica igual ao Figma
// e em ecrãs mais estreitos a barra encolhe (margem mínima de 24px).
export type TopNavItem<K extends string = string> = {
    key: K;
    label: string;
};

export const defaultTopNavItems: TopNavItem[] = [
    { key: 'reports', label: 'Ocorrências' },
    { key: 'my-reports', label: 'Minhas ocorrências' },
    { key: 'search', label: 'Pesquisar ocorrências' },
];

type Props<K extends string> = {
    active: K;
    onChange: (key: K) => void;
    items?: TopNavItem<K>[];
    language: string;
    onChangeLanguage: (language: string) => void;
    onNotificationsPress?: () => void;
    onProfilePress?: () => void;
    onLogoPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

const CONTENT_MAX_WIDTH = 1200;
// Seletor de idioma no menu do topo é uma instância reduzida (172 → 141.647 px) do componente 535:1314.
const LANGUAGE_SWITCH_SCALE = 141.647 / 172;

export function TopNav<K extends string = string>({
    active,
    onChange,
    items = defaultTopNavItems as TopNavItem<K>[],
    language,
    onChangeLanguage,
    onNotificationsPress,
    onProfilePress,
    onLogoPress,
    style,
}: Props<K>) {
    return (
        <View style={[styles.root, style]}>
            <View style={[styles.row, styles.mainBar]}>
                <View style={[styles.content, styles.mainContent]}>
                    <Pressable
                        accessibilityRole={onLogoPress ? 'link' : 'header'}
                        accessibilityLabel="Campus Fix"
                        disabled={!onLogoPress}
                        onPress={onLogoPress}
                        style={styles.brand}
                    >
                        <Logo variant="campus-fix" width={47.901} />
                        <Text style={styles.brandText}>Campus Fix</Text>
                    </Pressable>

                    <View style={styles.actions}>
                        <View style={styles.languageSlot}>
                            <LanguageSwitch
                                value={language}
                                onChange={onChangeLanguage}
                                style={styles.languageSwitch}
                            />
                        </View>
                        <ActionButton icon="notifications" accessibilityLabel="Notificações" onPress={onNotificationsPress} />
                        <ActionButton icon="profile" accessibilityLabel="Perfil" onPress={onProfilePress} />
                    </View>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.content}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        accessibilityRole="tablist"
                        style={styles.navScroll}
                        contentContainerStyle={styles.navItems}
                    >
                        {items.map((item) => (
                            <NavItem
                                key={item.key}
                                label={item.label}
                                active={item.key === active}
                                onPress={() => onChange(item.key)}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

type ActionButtonProps = {
    icon: IconName;
    accessibilityLabel: string;
    onPress?: () => void;
};

function ActionButton({ icon, accessibilityLabel, onPress }: ActionButtonProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            hitSlop={spacing.s}
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.actionButton,
                hovered && styles.actionHovered,
                pressed && styles.actionPressed,
            ]}
        >
            <Icon name={icon} size={24} color={hovered ? colors.brand.primary : colors.text.primary} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        backgroundColor: colors.surface.page,
    },
    row: {
        width: '100%',
        paddingHorizontal: spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.default,
    },
    mainBar: {
        height: 72,
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        maxWidth: CONTENT_MAX_WIDTH,
        alignSelf: 'center',
    },
    mainContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.l,
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.m,
    },
    brandText: {
        ...typography.sectionTitle,
        color: colors.text.primary,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    // Ocupa o tamanho reduzido; o seletor (172 × 56) é centrado e escalado para caber.
    languageSlot: {
        width: 172 * LANGUAGE_SWITCH_SCALE,
        height: 56 * LANGUAGE_SWITCH_SCALE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageSwitch: {
        alignSelf: 'center',
        backgroundColor: colors.surface.subtle,
        transform: [{ scale: LANGUAGE_SWITCH_SCALE }],
    },
    actionButton: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.sm,
    },
    actionHovered: {
        backgroundColor: colors.surface.subtle,
    },
    actionPressed: {
        backgroundColor: colors.surface.fieldPressed,
    },
    // Os itens têm 16px de padding: recuo de -16px para alinhar o texto com o logótipo (Figma: pl 104 vs 120).
    navScroll: {
        marginLeft: -spacing.l,
    },
    navItems: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: spacing.s,
    },
});

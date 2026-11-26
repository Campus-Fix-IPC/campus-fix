import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { colors, fonts, radius, spacing } from '@/theme';

// Figma › Cabeçalho / Principal (535:1725)
// - 'logo'        Tipo=Logo (535:1726)
// - 'logo-logout' Tipo=Logo+Sair (535:1728)
// - 'back-logo'   Tipo=Voltar+Logo (535:1733)
// - 'back-title'  Tipo=Voltar+Título (535:1740)
export type AppHeaderVariant = 'logo' | 'logo-logout' | 'back-logo' | 'back-title';

type Props = {
    variant?: AppHeaderVariant;
    // Usado apenas em 'back-title'.
    title?: string;
    onBack?: () => void;
    onLogout?: () => void;
    // Acrescenta o inset superior (status bar / notch) ao padding. Desligar se o ecrã já o tratar.
    safeArea?: boolean;
    style?: StyleProp<ViewStyle>;
};

const BUTTON_SIZE = 36;
const LOGO_HEIGHT = 42;

export function AppHeader({ variant = 'logo', title = '', onBack, onLogout, safeArea = true, style }: Props) {
    const insets = useSafeAreaInsets();
    const topInset = safeArea ? insets.top : 0;
    const hasBack = variant === 'back-logo' || variant === 'back-title';
    const contentHeight = variant === 'back-title' ? 72 : 74;

    return (
        <View
            style={[
                styles.header,
                { minHeight: contentHeight + topInset, paddingTop: spacing.l + topInset },
                variant === 'logo' ? styles.centered : styles.spaced,
                style,
            ]}
        >
            {hasBack ? (
                <HeaderButton icon="back" accessibilityLabel="Voltar" onPress={onBack} />
            ) : variant === 'logo-logout' ? (
                <View style={styles.spacer} />
            ) : null}

            {variant === 'back-title' ? (
                <Text accessibilityRole="header" numberOfLines={1} style={styles.title}>
                    {title}
                </Text>
            ) : (
                <Logo variant="campus-fix-shadow" height={LOGO_HEIGHT} />
            )}

            {variant === 'logo-logout' ? (
                <HeaderButton icon="logout" accessibilityLabel="Sair" onPress={onLogout} />
            ) : hasBack ? (
                <View style={styles.spacer} />
            ) : null}
        </View>
    );
}

type HeaderButtonProps = {
    icon: IconName;
    accessibilityLabel: string;
    onPress?: () => void;
};

function HeaderButton({ icon, accessibilityLabel, onPress }: HeaderButtonProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            hitSlop={4}
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.button,
                hovered && styles.buttonHovered,
                pressed && styles.buttonPressed,
            ]}
        >
            <Icon name={icon} size={24} color={colors.text.primary} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: spacing.l,
        backgroundColor: colors.surface.page,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.default,
    },
    centered: {
        justifyContent: 'center',
    },
    spaced: {
        justifyContent: 'space-between',
    },
    spacer: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
    },
    title: {
        flex: 1,
        // Figma: 16px SemiBold (sem token tipográfico equivalente)
        fontFamily: fonts.semibold,
        fontSize: 16,
        color: colors.text.primary,
        textAlign: 'center',
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonHovered: {
        backgroundColor: colors.surface.fieldHover,
    },
    buttonPressed: {
        backgroundColor: colors.surface.fieldPressed,
    },
});

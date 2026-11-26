import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconToggle } from '@/components/IconToggle';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import { colors, radius } from '@/theme';

// Figma › Rodapé / Idioma (535:1760): Estado=Fechado (535:1761) / Aberto (535:1763)
// Clicar no globo abre o seletor PT | EN por cima do conteúdo; clicar no globo ou numa língua fecha.
type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    language: string;
    onChangeLanguage: (language: string) => void;
    // Acrescenta o inset inferior (home indicator) ao padding. Desligar se o ecrã já o tratar.
    safeArea?: boolean;
    style?: StyleProp<ViewStyle>;
};

const FOOTER_HEIGHT = 59;
// Figma: menu em top -65 com 56px de altura → 9px acima do rodapé.
const MENU_GAP = 9;

export function LanguageFooter({
    open,
    onOpenChange,
    language,
    onChangeLanguage,
    safeArea = true,
    style,
}: Props) {
    const insets = useSafeAreaInsets();
    const bottomInset = safeArea ? insets.bottom : 0;

    const handleChange = (value: string) => {
        onChangeLanguage(value);
        onOpenChange(false);
    };

    return (
        <View
            style={[
                styles.footer,
                { height: FOOTER_HEIGHT + bottomInset, paddingBottom: bottomInset },
                open && styles.footerOpen,
                style,
            ]}
        >
            <IconToggle
                icon="language"
                accessibilityLabel="Idioma"
                active={open}
                onPress={() => onOpenChange(!open)}
            />

            {open && (
                <View style={[styles.menu, { bottom: FOOTER_HEIGHT + bottomInset + MENU_GAP }]}>
                    <LanguageSwitch value={language} onChange={handleChange} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 20,
        backgroundColor: colors.surface.page,
        borderTopWidth: 1,
        borderTopColor: colors.border.default,
    },
    // Garante que o menu (posicionado acima do rodapé) fica por cima do conteúdo do ecrã.
    footerOpen: {
        zIndex: 10,
    },
    // Figma: drop-shadow 0 6 8 efeito/sombra.
    menu: {
        position: 'absolute',
        left: 10,
        borderRadius: radius.full,
        boxShadow: `0px 6px 8px ${colors.shadow}`,
    },
});

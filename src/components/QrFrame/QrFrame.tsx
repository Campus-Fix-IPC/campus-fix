import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import QrFrameIcon from '@/assets/icons/qr-frame.svg';
import { colors, radius } from '@/theme';

// Figma: Leitor de QR / Enquadramento 550:932 (264×264, marcador 172×172, ícone 72×72)
const BASE_SIZE = 264;
const MARKER_RATIO = 172 / BASE_SIZE;
const ICON_RATIO = 72 / BASE_SIZE;

type Props = {
    size?: number;
    /** Conteúdo de fundo (ex.: pré-visualização da câmara), desenhado por baixo do marcador. */
    children?: ReactNode;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

export function QrFrame({ size = BASE_SIZE, children, accessibilityLabel = 'Área de leitura do código QR', style }: Props) {
    const markerSize = Math.round(size * MARKER_RATIO);
    const iconSize = Math.round(size * ICON_RATIO);

    return (
        <View
            accessible
            accessibilityRole="image"
            accessibilityLabel={accessibilityLabel}
            style={[styles.container, { width: size, height: size }, style]}
        >
            {children != null && <View style={StyleSheet.absoluteFill}>{children}</View>}
            <View style={[styles.marker, { width: markerSize, height: markerSize }]}>
                <QrFrameIcon width={iconSize} height={iconSize} color={colors.text.secondary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface.subtle,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface.page,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: radius.md,
        overflow: 'hidden',
    },
});

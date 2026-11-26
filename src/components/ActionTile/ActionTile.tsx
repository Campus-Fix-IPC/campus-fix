import { useState, type FC } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import CreateReportLarge from '@/assets/icons/create-report-large.svg';
import QrCodeLarge from '@/assets/icons/qr-code-large.svg';
import { colors, radius, spacing } from '@/theme';

export type ActionTileVariant = 'report' | 'qr-code';

const tiles: Record<ActionTileVariant, { icon: FC<SvgProps>; label: string }> = {
    report: { icon: CreateReportLarge, label: 'Reportar ocorrência sem QR code' },
    'qr-code': { icon: QrCodeLarge, label: 'Reportar ocorrência com QR code' },
};

type Props = {
    variant: ActionTileVariant;
    onPress?: () => void;
    size?: number;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

// Bloco de ação da página inicial mobile (Figma 535:1533 › 535:1534 / 535:1536)
export function ActionTile({ variant, onPress, size = 165, disabled = false, accessibilityLabel, style }: Props) {
    const [hovered, setHovered] = useState(false);
    const { icon: Svg, label } = tiles[variant];
    const iconSize = Math.round((size * 88) / 165);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityState={{ disabled }}
            style={({ pressed }) => [
                styles.tile,
                { width: size, height: size },
                !disabled && hovered && !pressed && styles.hover,
                !disabled && pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Svg width={iconSize} height={iconSize} color={colors.text.inverse} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tile: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.l,
        backgroundColor: colors.brand.primary,
        borderWidth: 1,
        borderColor: colors.brand.primaryDark,
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
    hover: {
        backgroundColor: colors.brand.primaryDark,
    },
    pressed: {
        backgroundColor: colors.brand.primaryPressed,
        borderColor: colors.brand.primaryPressed,
    },
    disabled: {
        opacity: 0.5,
    },
});

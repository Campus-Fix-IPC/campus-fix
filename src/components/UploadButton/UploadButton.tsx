import { useState } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import UploadIcon from '@/assets/icons/upload.svg';
import { colors, fonts, radius, spacing } from '@/theme';

// Figma: Botão de upload/Anexar Foto 535:1335 (web), Anexar Foto Mobile 535:1340,
// Estados Normal / Hover / Pressionado 535:1372 / 535:1378 / 535:1384
export type UploadButtonVariant = 'full' | 'compact';

type Props = {
    onPress?: () => void;
    label?: string;
    /** 'full' = botão com texto (web), 'compact' = quadrado 56×56 só com ícone (mobile). */
    variant?: UploadButtonVariant;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

export function UploadButton({
    onPress,
    label = 'Anexar Foto',
    variant = 'full',
    disabled = false,
    accessibilityLabel,
    style,
}: Props) {
    const [hovered, setHovered] = useState(false);
    const compact = variant === 'compact';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.base,
                compact ? styles.compact : styles.full,
                hovered && styles.hovered,
                pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <UploadIcon width={22} height={22} color={colors.text.primary} />
            {!compact && <Text style={styles.label}>{label}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: colors.border.field,
        borderRadius: radius.md,
        overflow: 'hidden',
    },
    full: {
        width: 200,
        gap: spacing.m,
        backgroundColor: colors.surface.subtle,
    },
    compact: {
        width: 56,
        backgroundColor: colors.surface.field,
    },
    hovered: {
        backgroundColor: colors.brand.softBg,
        borderColor: colors.brand.primary,
    },
    pressed: {
        backgroundColor: colors.brand.pressedBg,
        borderColor: colors.brand.primaryDark,
    },
    disabled: {
        opacity: 0.5,
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 17,
        lineHeight: 24,
        color: colors.text.primary,
    },
});

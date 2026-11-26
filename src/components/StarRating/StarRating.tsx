import { useState } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import Star from '@/assets/icons/star.svg';
import StarSmall from '@/assets/icons/star-small.svg';
import { colors, spacing } from '@/theme';

// Cores da estrela vazia (tamanho normal) sem token correspondente no design system
const emptyStarBorder = '#e7e3e0';
const emptyStarIcon = '#a49d99';

export type StarRatingSize = 'md' | 'sm';

type Props = {
    // 0 = sem avaliação; 1–5 = número de estrelas preenchidas
    value: number;
    onChange?: (value: number) => void;
    max?: number;
    size?: StarRatingSize;
    readOnly?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

type StarProps = {
    index: number;
    filled: boolean;
    size: StarRatingSize;
    interactive: boolean;
    disabled: boolean;
    onPress: () => void;
};

// Estrela de avaliação: Vazia / Preenchida / Pequena vazia (Figma 535:1225)
function StarButton({ index, filled, size, interactive, disabled, onPress }: StarProps) {
    const [hovered, setHovered] = useState(false);
    const isSmall = size === 'sm';
    const Svg = isSmall ? StarSmall : Star;
    const iconSize = isSmall ? 20 : 24;
    const highlighted = filled || (interactive && hovered);
    const iconColor = filled ? colors.text.inverse : isSmall ? colors.border.default : emptyStarIcon;

    return (
        <Pressable
            onPress={onPress}
            disabled={!interactive || disabled}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            accessibilityRole="radio"
            accessibilityLabel={index === 1 ? '1 estrela' : `${index} estrelas`}
            accessibilityState={{ checked: filled, disabled }}
            style={({ pressed }) => [
                styles.star,
                isSmall ? styles.starSmall : styles.starMedium,
                filled && styles.starFilled,
                !filled && highlighted && styles.starHover,
                interactive && pressed && styles.starPressed,
            ]}
        >
            <Svg width={iconSize} height={iconSize} color={iconColor} />
        </Pressable>
    );
}

export function StarRating({
    value,
    onChange,
    max = 5,
    size = 'md',
    readOnly = false,
    disabled = false,
    accessibilityLabel = 'Avaliação',
    style,
}: Props) {
    const interactive = !readOnly && !!onChange;

    return (
        <View
            accessibilityRole="radiogroup"
            accessibilityLabel={accessibilityLabel}
            style={[styles.row, disabled && styles.disabled, style]}
        >
            {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
                <StarButton
                    key={n}
                    index={n}
                    filled={n <= value}
                    size={size}
                    interactive={interactive}
                    disabled={disabled}
                    onPress={() => onChange?.(n)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.s,
    },
    star: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: colors.surface.field,
        overflow: 'hidden',
    },
    starMedium: {
        width: 48,
        height: 48,
        borderWidth: 1.5,
        borderColor: emptyStarBorder,
    },
    starSmall: {
        width: 36,
        height: 36,
        borderWidth: 1,
        borderColor: colors.border.default,
    },
    starFilled: {
        backgroundColor: colors.brand.primary,
        borderColor: colors.brand.primary,
    },
    starHover: {
        backgroundColor: colors.brand.softBg,
    },
    starPressed: {
        backgroundColor: colors.brand.primaryPressed,
        borderColor: colors.brand.primaryPressed,
    },
    disabled: {
        opacity: 0.5,
    },
});

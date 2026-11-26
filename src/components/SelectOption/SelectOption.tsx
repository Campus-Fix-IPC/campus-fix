import { useState } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import CheckIcon from '@/assets/icons/check.svg';
import { colors, fonts, spacing } from '@/theme';

type Props = {
    label: string;
    selected?: boolean;
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
};

// Seletor/Opção (Figma 535:1116) — Normal 535:1117 / Selecionada 535:1119
export function SelectOption({ label, selected = false, onPress, disabled = false, style }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            accessibilityRole="menuitem"
            accessibilityLabel={label}
            accessibilityState={{ selected, disabled }}
            style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                !selected && hovered && styles.optionHover,
                pressed && (selected ? styles.optionSelectedPressed : styles.optionPressed),
                disabled && styles.optionDisabled,
                style,
            ]}
        >
            <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
                {label}
            </Text>
            {selected ? <CheckIcon width={18} height={18} color={colors.brand.primary} /> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    option: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.s,
        paddingHorizontal: spacing.m,
        borderRadius: 6,
        backgroundColor: colors.surface.page,
    },
    optionSelected: {
        backgroundColor: colors.brand.softBg,
    },
    // Hover/pressionado não estão desenhados para a opção: feedback discreto com tokens existentes
    optionHover: {
        backgroundColor: colors.surface.subtle,
    },
    optionPressed: {
        backgroundColor: colors.surface.fieldHover,
    },
    optionSelectedPressed: {
        backgroundColor: colors.brand.pressedBg,
    },
    optionDisabled: {
        opacity: 0.5,
    },
    label: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 17,
        lineHeight: 20,
        color: colors.text.primary,
    },
    labelSelected: {
        fontFamily: fonts.semibold,
        color: colors.brand.primary,
    },
});

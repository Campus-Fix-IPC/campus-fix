import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import CheckSelected from '@/assets/icons/check-selected.svg';
import { colors, fonts, radius, spacing } from '@/theme';

// Figma: Seletor de idioma PT | EN 535:1314

export type LanguageOption<T extends string = string> = {
    value: T;
    label: string;
    accessibilityLabel?: string;
};

const DEFAULT_OPTIONS: LanguageOption[] = [
    { value: 'pt', label: 'PT', accessibilityLabel: 'Português' },
    { value: 'en', label: 'EN', accessibilityLabel: 'English' },
];

type Props<T extends string> = {
    value: T;
    onChange: (value: T) => void;
    options?: LanguageOption<T>[];
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
};

export function LanguageSwitch<T extends string = string>({
    value,
    onChange,
    options = DEFAULT_OPTIONS as LanguageOption<T>[],
    disabled = false,
    accessibilityLabel = 'Idioma',
    style,
}: Props<T>) {
    return (
        <View accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel} style={[styles.container, style]}>
            {options.map((option) => (
                <LanguageSegment
                    key={option.value}
                    option={option}
                    selected={option.value === value}
                    disabled={disabled}
                    onPress={() => onChange(option.value)}
                />
            ))}
        </View>
    );
}

type SegmentProps<T extends string> = {
    option: LanguageOption<T>;
    selected: boolean;
    disabled: boolean;
    onPress: () => void;
};

function LanguageSegment<T extends string>({ option, selected, disabled, onPress }: SegmentProps<T>) {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            accessibilityRole="radio"
            accessibilityLabel={option.accessibilityLabel ?? option.label}
            accessibilityState={{ checked: selected, disabled }}
            disabled={disabled}
            onPress={selected ? undefined : onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={({ pressed }) => [
                styles.segment,
                selected ? styles.segmentSelected : styles.segmentAvailable,
                !selected && hovered && styles.segmentHovered,
                !selected && pressed && styles.segmentPressed,
                disabled && styles.disabled,
            ]}
        >
            {selected && <CheckSelected width={18} height={18} color={colors.text.inverse} />}
            <Text style={selected ? styles.labelSelected : styles.labelAvailable}>{option.label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        gap: spacing.xs,
        height: 56,
        // 1px border + 3px padding = 4px inset (Figma: padding 4 with an inner stroke)
        padding: 3,
        borderWidth: 1,
        borderColor: colors.border.field,
        borderRadius: radius.full,
        backgroundColor: colors.surface.field,
        overflow: 'hidden',
    },
    segment: {
        height: 48,
        borderRadius: radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.s,
    },
    segmentSelected: {
        width: 88,
        backgroundColor: colors.brand.primary,
    },
    segmentAvailable: {
        width: 72,
    },
    segmentHovered: {
        backgroundColor: colors.surface.fieldHover,
    },
    segmentPressed: {
        backgroundColor: colors.brand.pressedBg,
    },
    labelSelected: {
        fontFamily: fonts.bold,
        fontSize: 17,
        color: colors.text.inverse,
    },
    labelAvailable: {
        fontFamily: fonts.medium,
        fontSize: 17,
        color: colors.text.primary,
    },
    disabled: {
        opacity: 0.5,
    },
});

import { useId, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import ChevronDown from '@/assets/icons/chevron-down.svg';
import { SelectOption } from '@/components/SelectOption';
import { FIELD_HEIGHT, FieldLabel, fieldStyles } from '@/components/TextField';
import { colors, fonts, radius, spacing } from '@/theme';

export type SelectItem<T extends string | number> = {
    label: string;
    value: T;
    disabled?: boolean;
};

type Props<T extends string | number> = {
    options: SelectItem<T>[];
    value: T | null;
    onChange: (value: T) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    error?: string;
    disabled?: boolean;
    // Opcional: controlar a abertura a partir de fora (ex.: fechar outros seletores)
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    maxMenuHeight?: number;
    style?: StyleProp<ViewStyle>;
};

const MENU_GAP = spacing.s;

// Seletor (Seletor/Escola 535:1159, Categoria 535:1177, Piso 535:1192, Sala 535:1207 — Fechado/Aberto)
// com o Botão de seleção (535:1280 — Normal/Aberto/Hover/Pressionado) e o Menu de opções.
export function Select<T extends string | number>({
    options,
    value,
    onChange,
    label,
    placeholder = 'Selecionar',
    helperText,
    error,
    disabled = false,
    open: openProp,
    onOpenChange,
    maxMenuHeight = 280,
    style,
}: Props<T>) {
    const [openState, setOpenState] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focusVisible, setFocusVisible] = useState(false);
    const pointerDown = useRef(false);
    const labelId = useId();

    const open = openProp ?? openState;
    const selected = options.find((option) => option.value === value);
    const message = error ?? helperText;

    const setOpen = (next: boolean) => {
        if (openProp === undefined) {
            setOpenState(next);
        }
        onOpenChange?.(next);
    };

    const handleSelect = (next: T) => {
        onChange(next);
        setOpen(false);
    };

    return (
        <View style={[styles.container, open && styles.containerOpen, disabled && fieldStyles.disabled, style]}>
            {label ? <FieldLabel nativeID={labelId}>{label}</FieldLabel> : null}
            <View>
                <Pressable
                    onPress={() => setOpen(!open)}
                    disabled={disabled}
                    onHoverIn={() => setHovered(true)}
                    onHoverOut={() => setHovered(false)}
                    onPressIn={() => {
                        pointerDown.current = true;
                    }}
                    onFocus={() => setFocusVisible(!pointerDown.current)}
                    onBlur={() => {
                        pointerDown.current = false;
                        setFocusVisible(false);
                    }}
                    accessibilityRole="combobox"
                    accessibilityLabel={label ? `${label}: ${selected?.label ?? placeholder}` : selected?.label ?? placeholder}
                    accessibilityLabelledBy={label ? labelId : undefined}
                    accessibilityState={{ expanded: open, disabled }}
                    style={({ pressed }) => [
                        fieldStyles.base,
                        styles.trigger,
                        hovered && styles.triggerHover,
                        pressed && styles.triggerPressed,
                        open && styles.triggerOpen,
                        error ? fieldStyles.error : null,
                        focusVisible && fieldStyles.focusRing,
                    ]}
                >
                    <Text style={styles.value} numberOfLines={1}>
                        {selected?.label ?? placeholder}
                    </Text>
                    <ChevronDown width={20} height={20} color={open ? colors.brand.primary : colors.text.primary} />
                </Pressable>
                {open ? (
                    <View style={styles.menu} accessibilityRole="menu">
                        <ScrollView style={{ maxHeight: maxMenuHeight }} nestedScrollEnabled keyboardShouldPersistTaps="handled">
                            {options.map((option) => (
                                <SelectOption
                                    key={String(option.value)}
                                    label={option.label}
                                    selected={option.value === value}
                                    disabled={option.disabled}
                                    onPress={() => handleSelect(option.value)}
                                />
                            ))}
                        </ScrollView>
                    </View>
                ) : null}
            </View>
            {message ? <Text style={[fieldStyles.helperText, error ? fieldStyles.errorText : null]}>{message}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        gap: spacing.s,
    },
    // O menu abre por cima do conteúdo seguinte
    containerOpen: {
        zIndex: 1000,
    },
    trigger: {
        height: FIELD_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.s,
    },
    triggerHover: {
        backgroundColor: colors.surface.fieldHover,
        borderColor: colors.border.fieldHover,
    },
    triggerPressed: {
        backgroundColor: colors.surface.fieldPressed,
        borderColor: colors.text.primary,
    },
    triggerOpen: {
        borderColor: colors.brand.primary,
    },
    value: {
        flexShrink: 1,
        fontFamily: fonts.medium,
        fontSize: 17,
        color: colors.text.primary,
    },
    menu: {
        position: 'absolute',
        top: FIELD_HEIGHT + MENU_GAP,
        left: 0,
        right: 0,
        padding: spacing.s,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: radius.md,
        backgroundColor: colors.surface.page,
        boxShadow: `0px 6px 16px 0px ${colors.shadow}`,
        overflow: 'hidden',
    },
});

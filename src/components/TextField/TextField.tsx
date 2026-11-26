import { useId, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    type NativeSyntheticEvent,
    type StyleProp,
    type TargetedEvent,
    type TextInputProps,
    type ViewStyle,
} from 'react-native';

import { colors, fonts, spacing } from '@/theme';

import { FieldLabel } from './FieldLabel';
import { fieldStyles } from './fieldStyles';

export type TextFieldVariant = 'text' | 'password' | 'textarea';

type Props = Omit<TextInputProps, 'value' | 'onChangeText' | 'editable' | 'multiline' | 'secureTextEntry' | 'style'> & {
    value: string;
    onChangeText: (text: string) => void;
    label?: string;
    placeholder?: string;
    // text = InputTexto, password = InputSenha, textarea = AreaTexto
    variant?: TextFieldVariant;
    helperText?: string;
    error?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
};

// Formulario/InputTexto (535:1873), Formulario/InputSenha (535:1879), Formulario/AreaTexto (535:1895)
// com estados de borda Normal / Ativo (Borda de campo 535:930).
export function TextField({
    value,
    onChangeText,
    label,
    placeholder,
    variant = 'text',
    helperText,
    error,
    disabled = false,
    style,
    onFocus,
    onBlur,
    accessibilityLabel,
    ...inputProps
}: Props) {
    const [focused, setFocused] = useState(false);
    const labelId = useId();
    const isTextarea = variant === 'textarea';
    const isPassword = variant === 'password';
    const message = error ?? helperText;

    const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
        setFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
        setFocused(false);
        onBlur?.(e);
    };

    return (
        <View style={[styles.container, disabled && fieldStyles.disabled, style]}>
            {label ? <FieldLabel nativeID={labelId}>{label}</FieldLabel> : null}
            <TextInput
                {...inputProps}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.text.secondary}
                editable={!disabled}
                multiline={isTextarea}
                secureTextEntry={isPassword}
                autoCapitalize={isPassword ? 'none' : inputProps.autoCapitalize}
                autoCorrect={isPassword ? false : inputProps.autoCorrect}
                textAlignVertical={isTextarea ? 'top' : 'center'}
                onFocus={handleFocus}
                onBlur={handleBlur}
                accessibilityLabel={accessibilityLabel ?? label}
                accessibilityLabelledBy={label ? labelId : undefined}
                accessibilityState={{ disabled }}
                aria-invalid={error ? true : undefined}
                style={[
                    fieldStyles.base,
                    styles.input,
                    isTextarea && styles.textarea,
                    focused && fieldStyles.active,
                    error ? fieldStyles.error : null,
                ]}
            />
            {message ? (
                <Text style={[fieldStyles.helperText, error ? fieldStyles.errorText : null]} accessibilityLiveRegion={error ? 'polite' : 'none'}>
                    {message}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        gap: spacing.s,
    },
    input: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.text.primary,
        // O contorno nativo do browser é substituído pelo estado "Ativo"
        ...Platform.select({ web: { outlineWidth: 0 } }),
    },
    textarea: {
        minHeight: 88,
        paddingVertical: spacing.l,
        lineHeight: 22,
    },
});

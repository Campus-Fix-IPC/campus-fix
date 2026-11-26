import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

import { colors, typography } from '@/theme';

type Props = {
    children: string;
    nativeID?: string;
    style?: StyleProp<TextStyle>;
};

// Formulario/Label (Figma 535:1860)
export function FieldLabel({ children, nativeID, style }: Props) {
    return (
        <Text nativeID={nativeID} style={[styles.label, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    label: {
        ...typography.label,
        color: colors.text.primary,
    },
});

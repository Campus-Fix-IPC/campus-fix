import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '@/theme';

// Figma: Cartão de resumo / Dados da ocorrência 535:1804 (com cabeçalho opcional 535:1800)
export type SummaryItem = {
    label: string;
    value: string;
};

type Props = {
    items: SummaryItem[];
    /** Rótulo acima do cartão (ex.: "Dados da ocorrência"). */
    title?: string;
    /** Texto de orientação acima do cartão (ex.: "Após confirmar, a equipa técnica será notificada."). */
    description?: string;
    style?: StyleProp<ViewStyle>;
};

export function SummaryCard({ items, title, description, style }: Props) {
    const hasHeader = Boolean(title || description);

    return (
        <View style={[styles.container, style]}>
            {hasHeader && (
                <View style={styles.header}>
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                    {description ? <Text style={styles.description}>{description}</Text> : null}
                </View>
            )}
            <View style={styles.card}>
                {items.map((item, index) => (
                    <Text key={`${index}-${item.label}`} style={styles.row}>
                        <Text style={styles.rowLabel}>{item.label}:</Text> {item.value}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    header: {
        gap: spacing.m,
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: 15,
        color: colors.text.secondary,
    },
    description: {
        ...typography.body,
        color: colors.text.secondary,
    },
    card: {
        // Linha vazia entre itens no Figma = uma linha de texto (15 × 1.5)
        gap: typography.body.lineHeight,
        paddingHorizontal: 20,
        paddingVertical: spacing.l,
        backgroundColor: colors.surface.field,
        borderWidth: 1.5,
        borderColor: colors.border.field,
        borderRadius: radius.md,
        overflow: 'hidden',
    },
    row: {
        ...typography.body,
        color: colors.text.primary,
    },
    rowLabel: {
        fontFamily: fonts.semibold,
        color: colors.text.secondary,
    },
});

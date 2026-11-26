import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing, typography } from '@/theme';

// Figma: Cartão de estatística 535:1910 — Destaque 535:1911, Neutro 535:1915,
// Pendente 535:1919, Em resolução 535:1923, Concluída 535:1927
// 'pending' | 'in-progress' | 'done' coincidem com ReportStatus (StatusBadge).
export type StatCardVariant = 'highlight' | 'neutral' | 'pending' | 'in-progress' | 'done';

type Props = {
    label: string;
    value: string | number;
    caption?: string;
    variant?: StatCardVariant;
    style?: StyleProp<ViewStyle>;
};

const BACKGROUNDS: Record<StatCardVariant, string> = {
    highlight: colors.brand.primary,
    neutral: colors.surface.page,
    pending: colors.status.pendingBg,
    'in-progress': colors.status.inProgressBg,
    done: colors.status.successBg,
};

export function StatCard({ label, value, caption, variant = 'neutral', style }: Props) {
    const inverse = variant === 'highlight';

    return (
        <View
            accessible
            accessibilityLabel={[label, String(value), caption].filter(Boolean).join(', ')}
            style={[
                styles.card,
                { backgroundColor: BACKGROUNDS[variant] },
                inverse && styles.cardHighlight,
                style,
            ]}
        >
            <Text style={[styles.label, inverse && styles.inverse]}>{label}</Text>
            <Text style={[styles.value, inverse && styles.inverse]}>{value}</Text>
            {caption ? <Text style={[styles.caption, inverse && styles.inverse]}>{caption}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: spacing.xs,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.l,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border.default,
    },
    cardHighlight: {
        // Destaque não tem contorno no Figma; mantém-se 1px da mesma cor para igualar alturas.
        borderColor: colors.brand.primary,
    },
    label: {
        ...typography.body,
        color: colors.text.secondary,
    },
    value: {
        fontFamily: fonts.bold,
        fontSize: 32,
        color: colors.text.primary,
    },
    caption: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.text.secondary,
    },
    inverse: {
        color: colors.text.inverse,
    },
});

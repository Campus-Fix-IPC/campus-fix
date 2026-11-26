import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

export type ReportStatus = 'pending' | 'in-progress' | 'done' | 'error';

export const reportStatusLabels: Record<ReportStatus, string> = {
    pending: 'Pendente',
    'in-progress': 'Em resolução',
    done: 'Concluído',
    error: 'Erro',
};

export const reportStatusColors: Record<ReportStatus, string> = {
    pending: colors.status.pending,
    'in-progress': colors.status.inProgress,
    done: colors.status.success,
    error: colors.status.error,
};

type Props = {
    status: ReportStatus;
    // Substitui o texto por omissão do estado
    label?: string;
    style?: StyleProp<ViewStyle>;
};

// Etiqueta de estado da ocorrência (Figma 535:754 › 535:755 / 535:758 / 535:761 / 535:764)
export function StatusBadge({ status, label, style }: Props) {
    const color = reportStatusColors[status];
    const text = label ?? reportStatusLabels[status];

    return (
        <View
            accessibilityRole="text"
            accessibilityLabel={`Estado: ${text}`}
            style={[styles.badge, { borderColor: color }, style]}
        >
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text numberOfLines={1} style={[styles.label, { color }]}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: spacing.s,
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: colors.surface.page,
        borderWidth: 1,
        borderRadius: radius.full,
        overflow: 'hidden',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: radius.full,
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 1,
    },
});

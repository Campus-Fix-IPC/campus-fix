import { Children, type ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Button } from '@/components/Button';
import { Icon, type IconName } from '@/components/Icon/Icon';
import { colors, radius, spacing, typography } from '@/theme';

// Figma: Modal / Confirmar cancelamento 535:1814
// "Usar como overlay, com fundo escurecido; Voltar fecha o modal e Cancelar termina a ação."

type DialogProps = {
    title: string;
    message?: string;
    icon?: IconName;
    /** Rótulo da ação principal (botão primário). */
    confirmLabel?: string;
    /** Rótulo da ação secundária (botão secundário). */
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    /** Substitui os botões por defeito; cada filho ocupa uma coluna de largura igual. */
    actions?: ReactNode;
    style?: StyleProp<ViewStyle>;
};

/** Cartão do diálogo, sem overlay — útil para incorporar numa página. */
export function ConfirmDialog({
    title,
    message,
    icon = 'warning',
    confirmLabel = 'Cancelar',
    cancelLabel = 'Voltar',
    onConfirm,
    onCancel,
    actions,
    style,
}: DialogProps) {
    const content = actions ?? [
        <Button key="cancel" title={cancelLabel} variant="secondary" size="sm" onPress={onCancel} />,
        <Button key="confirm" title={confirmLabel} variant="primary" size="sm" onPress={onConfirm} />,
    ];

    return (
        <View accessibilityRole="alert" style={[styles.dialog, style]}>
            <View style={styles.iconCircle}>
                <Icon name={icon} size={24} color={colors.status.error} />
            </View>
            <View style={styles.texts}>
                <Text accessibilityRole="header" style={styles.title}>
                    {title}
                </Text>
                {message ? <Text style={styles.message}>{message}</Text> : null}
            </View>
            <View style={styles.actions}>
                {Children.map(content, (child) => (
                    <View style={styles.action}>{child}</View>
                ))}
            </View>
        </View>
    );
}

type ModalProps = DialogProps & {
    visible: boolean;
    /** Fecha ao tocar fora do cartão (chama onCancel). */
    dismissOnBackdropPress?: boolean;
};

export function ConfirmModal({ visible, dismissOnBackdropPress = true, ...dialogProps }: ModalProps) {
    const { onCancel } = dialogProps;

    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <Pressable
                    accessibilityLabel="Fechar"
                    accessible={false}
                    style={StyleSheet.absoluteFill}
                    onPress={dismissOnBackdropPress ? onCancel : undefined}
                />
                <View accessibilityViewIsModal style={styles.dialogWrapper}>
                    <ConfirmDialog {...dialogProps} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.l,
        // Fundo escurecido (texto principal #1f2328 a 50%) — sem token equivalente
        backgroundColor: 'rgba(31, 35, 40, 0.5)',
    },
    dialogWrapper: {
        width: '100%',
        maxWidth: 345,
    },
    dialog: {
        width: '100%',
        maxWidth: 345,
        alignItems: 'center',
        gap: spacing.l,
        padding: spacing.xl,
        backgroundColor: colors.surface.page,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: radius.lg,
        boxShadow: `0px 12px 16px ${colors.shadow}`,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.status.errorBg,
    },
    texts: {
        width: '100%',
        gap: spacing.s,
    },
    title: {
        ...typography.sectionTitle,
        color: colors.text.primary,
        textAlign: 'center',
    },
    message: {
        ...typography.body,
        color: colors.text.secondary,
        textAlign: 'center',
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        gap: spacing.m,
        paddingTop: spacing.s,
    },
    action: {
        flex: 1,
        minWidth: 0,
    },
});

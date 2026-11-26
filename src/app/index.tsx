import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    ActionCard,
    ActionTile,
    AppHeader,
    ArrowButton,
    BackButton,
    BottomTabBar,
    Button,
    ConfirmDialog,
    ConfirmModal,
    Icon,
    IconButton,
    IconToggle,
    iconNames,
    LanguageFooter,
    LanguageSwitch,
    Logo,
    QrFrame,
    ResultSymbol,
    Select,
    SelectOption,
    StarRating,
    StatCard,
    StatusBadge,
    SummaryCard,
    TextField,
    TextLink,
    TopNav,
    UploadButton,
    type TabDestination,
} from '@/components';
import { colors, radius, spacing, typography } from '@/theme';

const schools = [
    { label: 'ESTiG', value: 'estig' },
    { label: 'ESE', value: 'ese' },
    { label: 'ESA', value: 'esa' },
    { label: 'ESSa', value: 'essa' },
];

const swatches = [
    { name: 'brand.primary', value: colors.brand.primary },
    { name: 'brand.primaryDark', value: colors.brand.primaryDark },
    { name: 'brand.softBg', value: colors.brand.softBg },
    { name: 'text.primary', value: colors.text.primary },
    { name: 'text.secondary', value: colors.text.secondary },
    { name: 'surface.subtle', value: colors.surface.subtle },
    { name: 'border.default', value: colors.border.default },
    { name: 'status.pending', value: colors.status.pending },
    { name: 'status.inProgress', value: colors.status.inProgress },
    { name: 'status.success', value: colors.status.success },
    { name: 'status.error', value: colors.status.error },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
}

function Row({ children }: { children: ReactNode }) {
    return <View style={styles.row}>{children}</View>;
}

export default function Showcase() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [school, setSchool] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState('estig');
    const [rating, setRating] = useState(3);
    const [language, setLanguage] = useState('pt');
    const [footerOpen, setFooterOpen] = useState(false);
    const [flashOn, setFlashOn] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [tab, setTab] = useState<TabDestination>('home');
    const [topNav, setTopNav] = useState('reports');

    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Logo variant="campus-fix" width={96} />
                    <Text style={typography.pageTitle}>Campus Fix · Design System</Text>
                    <Text style={styles.muted}>Catálogo dos componentes do Figma.</Text>
                </View>

                <Section title="Cores">
                    <Row>
                        {swatches.map((swatch) => (
                            <View key={swatch.name} style={styles.swatch}>
                                <View style={[styles.swatchColor, { backgroundColor: swatch.value }]} />
                                <Text style={styles.caption}>{swatch.name}</Text>
                            </View>
                        ))}
                    </Row>
                </Section>

                <Section title="Tipografia">
                    <Text style={typography.pageTitle}>Título de página</Text>
                    <Text style={typography.sectionTitle}>Título de secção</Text>
                    <Text style={typography.subtitle}>Subtítulo</Text>
                    <Text style={typography.body}>Corpo de texto</Text>
                    <Text style={typography.bodyStrong}>Corpo em destaque</Text>
                    <Text style={typography.label}>Label de formulário</Text>
                    <Text style={typography.condensed}>Apoio condensado</Text>
                    <Text style={typography.overline}>Overline</Text>
                </Section>

                <Section title="Ícones">
                    <Row>
                        {iconNames.map((icon) => (
                            <View key={icon} style={styles.iconCell}>
                                <Icon name={icon} />
                                <Text style={styles.caption}>{icon}</Text>
                            </View>
                        ))}
                    </Row>
                </Section>

                <Section title="Etiquetas de estado">
                    <Row>
                        <StatusBadge status="pending" />
                        <StatusBadge status="in-progress" />
                        <StatusBadge status="done" />
                        <StatusBadge status="error" />
                    </Row>
                </Section>

                <Section title="Botões primários">
                    <Button title="Criar Ocorrência" icon="create-report" iconSize={26} />
                    <Button title="Login" icon="lock" />
                    <Button title="Submeter Avaliação" size="xl" />
                    <Row>
                        <Button title="Cancelar" size="sm" />
                        <Button title="Desativado" disabled />
                    </Row>
                    <ArrowButton title="Login" />
                    <ArrowButton title="Continuar sem QR code" />
                    <Row>
                        <ActionTile variant="report" />
                        <ActionTile variant="qr-code" />
                    </Row>
                </Section>

                <Section title="Botões secundários">
                    <Button title="Entrar como Convidado" variant="secondary" />
                    <Row>
                        <Button title="Voltar" variant="secondary" />
                        <Button title="Voltar" variant="secondary" size="sm" />
                    </Row>
                    <ArrowButton title="Entrar como Convidado" variant="secondary" />
                    <ArrowButton title="Cancelar ocorrência" variant="secondary" icon="close" iconSize={24} />
                    <ActionCard title="Acompanhar ocorrência" />
                    <Row>
                        <TextLink title="Esqueci a palavra-passe" />
                        <BackButton />
                    </Row>
                </Section>

                <Section title="Avaliação">
                    <StarRating value={rating} onChange={setRating} />
                    <StarRating value={rating} onChange={setRating} size="sm" />
                </Section>

                <Section title="Formulários">
                    <TextField label="Nome" placeholder="Escreva o seu nome" value={name} onChangeText={setName} />
                    <TextField
                        label="Palavra-passe"
                        variant="password"
                        placeholder="Palavra-passe"
                        value={password}
                        onChangeText={setPassword}
                        helperText="Conta institucional."
                    />
                    <TextField
                        label="Descrição"
                        variant="textarea"
                        placeholder="Descreva o problema"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextField label="Email" value="aluno@" onChangeText={() => {}} error="Email inválido." />
                    <Select label="Escola" options={schools} value={school} onChange={setSchool} />
                    <View>
                        {schools.map((option) => (
                            <SelectOption
                                key={option.value}
                                label={option.label}
                                selected={selectedOption === option.value}
                                onPress={() => setSelectedOption(option.value)}
                            />
                        ))}
                    </View>
                </Section>

                <Section title="Utilitários e toggles">
                    <Row>
                        <IconToggle
                            icon="filter"
                            accessibilityLabel="Filtrar"
                            active={filterActive}
                            onPress={() => setFilterActive((value) => !value)}
                        />
                        <IconButton icon="close" accessibilityLabel="Fechar" />
                        <IconButton
                            icon="flashlight"
                            variant="subtle"
                            accessibilityLabel="Lanterna"
                            selected={flashOn}
                            onPress={() => setFlashOn((value) => !value)}
                        />
                        <IconButton icon="switch-camera" variant="subtle" accessibilityLabel="Alternar câmara" />
                    </Row>
                    <LanguageSwitch value={language} onChange={setLanguage} />
                    <Row>
                        <UploadButton />
                        <UploadButton variant="compact" />
                    </Row>
                    <QrFrame size={200} />
                </Section>

                <Section title="Cartões de estatística">
                    <Row>
                        <StatCard variant="highlight" label="Total" value={128} caption="Este mês" style={styles.statCard} />
                        <StatCard variant="neutral" label="Duplicadas" value={6} style={styles.statCard} />
                        <StatCard variant="pending" label="Pendentes" value={24} style={styles.statCard} />
                        <StatCard variant="in-progress" label="Em resolução" value={41} style={styles.statCard} />
                        <StatCard variant="done" label="Concluídas" value={57} style={styles.statCard} />
                    </Row>
                </Section>

                <Section title="Revisão e confirmação">
                    <SummaryCard
                        title="Resumo da ocorrência"
                        items={[
                            { label: 'Escola', value: 'ESTiG' },
                            { label: 'Sala', value: 'A2.10' },
                            { label: 'Categoria', value: 'Iluminação' },
                        ]}
                    />
                    <ConfirmDialog
                        title="Cancelar ocorrência?"
                        message="Esta ação não pode ser desfeita."
                    />
                    <Button title="Abrir modal" variant="secondary" onPress={() => setModalVisible(true)} />
                    <Row>
                        <ResultSymbol variant="confirmation" />
                        <ResultSymbol variant="cancellation" />
                    </Row>
                </Section>

                <Section title="Navegação mobile">
                    <View style={styles.frame}>
                        <AppHeader variant="logo" safeArea={false} />
                    </View>
                    <View style={styles.frame}>
                        <AppHeader variant="logo-logout" safeArea={false} onLogout={() => {}} />
                    </View>
                    <View style={styles.frame}>
                        <AppHeader variant="back-logo" safeArea={false} onBack={() => {}} />
                    </View>
                    <View style={styles.frame}>
                        <AppHeader variant="back-title" title="Nova ocorrência" safeArea={false} onBack={() => {}} />
                    </View>
                    <View style={styles.frame}>
                        <BottomTabBar active={tab} onChange={setTab} safeArea={false} />
                    </View>
                    <View style={[styles.frame, styles.footerFrame]}>
                        <LanguageFooter
                            open={footerOpen}
                            onOpenChange={setFooterOpen}
                            language={language}
                            onChangeLanguage={setLanguage}
                            safeArea={false}
                        />
                    </View>
                </Section>

                <Section title="Navegação web">
                    <View style={styles.frame}>
                        <TopNav
                            active={topNav}
                            onChange={setTopNav}
                            language={language}
                            onChangeLanguage={setLanguage}
                        />
                    </View>
                </Section>

                <Section title="Logótipos">
                    <Row>
                        <Logo variant="full" height={160} />
                        <Logo variant="campus-fix" height={160} />
                    </Row>
                </Section>
            </ScrollView>

            <ConfirmModal
                visible={modalVisible}
                title="Cancelar ocorrência?"
                message="Esta ação não pode ser desfeita."
                onConfirm={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface.subtle,
    },
    content: {
        padding: spacing.l,
        paddingBottom: spacing['4xl'],
        gap: spacing.xl,
        width: '100%',
        maxWidth: 960,
        alignSelf: 'center',
    },
    header: {
        gap: spacing.s,
    },
    muted: {
        ...typography.body,
        color: colors.text.secondary,
    },
    section: {
        gap: spacing.l,
        padding: spacing.xl,
        backgroundColor: colors.surface.page,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: radius.lg,
    },
    sectionTitle: {
        ...typography.sectionTitle,
        color: colors.text.primary,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: spacing.m,
    },
    swatch: {
        width: 120,
        gap: spacing.xs,
    },
    swatchColor: {
        height: 56,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border.default,
    },
    caption: {
        fontSize: 12,
        color: colors.text.secondary,
    },
    iconCell: {
        width: 88,
        alignItems: 'center',
        gap: spacing.xs,
    },
    statCard: {
        width: 176,
    },
    frame: {
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: radius.md,
        overflow: 'hidden',
    },
    footerFrame: {
        overflow: 'visible',
        marginTop: 80,
    },
});

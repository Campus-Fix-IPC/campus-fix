import { Stack } from 'expo-router';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_600SemiBold, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';

export default function RootLayout() {
    const [loaded] = useFonts({
        Roboto_400Regular, Roboto_500Medium, Roboto_600SemiBold, Roboto_700Bold, RobotoCondensed_700Bold,
    });
    if (!loaded) return null;

    return <Stack screenOptions={{ headerShown: false }} />;
}
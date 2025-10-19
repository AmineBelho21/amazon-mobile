import { StyledStack } from '@/components/navigation/stack';
import '@/global.css';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from 'react-native';


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}
const InitialLayout = () => {
  const router = useRouter();

  return (
    <StyledStack
      contentClassName="bg-gray-100 dark:bg-background"
      headerClassName="bg-dark text-white">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="signIn"
        options={{
          presentation: 'fullScreenModal',
          title: 'Amazon',
        }}
      />
      <Stack.Screen
        name="(modal)/rufus"
        options={{
          title: 'Rufus',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="close" size={24} className="text-gray-400" />
            </TouchableOpacity>
          ),
          presentation: 'formSheet',
          sheetAllowedDetents: [0.45, 0.95],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </StyledStack>
  )
};


const RootLayout = () => {

  const colorScheme = useColorScheme()

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <InitialLayout />
        </ThemeProvider>

      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;

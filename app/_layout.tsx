import { StyledStack } from '@/components/navigation/stack';
import '@/global.css';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

Sentry.init({
  dsn: 'https://f4afa420b350cc065646f4b1c8996fa0@o4510098045599744.ingest.de.sentry.io/4510267792228432',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],
  _experiments: { enableLogs: true }

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const queryClient = new QueryClient();

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

      <Stack.Screen
        name="(modal)/checkout"
        options={{
          title: 'Amazon Checkout',
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text className="text-gray-200">Cancel</Text>
            </TouchableOpacity>
          ),
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
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StripeProvider
              publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
              urlScheme={Linking.createURL('/').split(':')[0]}>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <InitialLayout />
              </ThemeProvider>
            </StripeProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default Sentry.wrap(RootLayout);
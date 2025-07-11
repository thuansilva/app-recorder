import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { Fonts } from "@/constants/Fonts";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { shouldRedirectToLogin } from "../entities/shouldRedirectToLogin";
import { SecureTokenStorage } from "../entities/TokenStorageInfra";
import { UseCaseTokenStorage } from "../entities/UseCaseTokenStorage";

SplashScreen.preventAutoHideAsync();

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function TabLayout() {
  const [loaded, error] = useFonts({
    [Fonts.mon.bold]: require("../assets/fonts/Montserrat-Bold.ttf"),
    [Fonts.mon.regular]: require("../assets/fonts/Montserrat-Regular.ttf"),
    [Fonts.mon.semiBold]: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const secureToken = new SecureTokenStorage();
  const useCaseTokenStorage = new UseCaseTokenStorage(secureToken);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={{
        getToken: (key) => useCaseTokenStorage.getToken(key),
        saveToken: (key, value) => useCaseTokenStorage.saveToken(key, value),
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (shouldRedirectToLogin(isLoaded, isSignedIn)) {
      router.push("/(modals)/login");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Login or sing up",
          headerTitleStyle: {
            fontFamily: Fonts.mon.bold,
          },

          presentation: "modal",
          animation: "slide_from_bottom",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitle: "",
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

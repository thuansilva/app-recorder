import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { Fonts } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    [Fonts.mon.bold]: require("../assets/fonts/Montserrat-Bold.ttf"),
    [Fonts.mon.regular]: require("../assets/fonts/Montserrat-Regular.ttf"),
    [Fonts.mon.semiBold]: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Login or sing up",
          headerTitleStyle: {
            fontFamily: Fonts.mon.semiBold,
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

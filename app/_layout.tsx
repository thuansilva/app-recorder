import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

import { Fonts } from "@/constants/Fonts";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
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
    </Stack>
  );
}

import "react-native-reanimated";
import "../global.css";

import LimitReachedDialog from "@/components/Dialog";
import { useProductStore } from "@/src/store/useProductStore";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  // Accessing dialog state from store
  const dialog = useProductStore((s) => s.dialog);
  const handledialog = useProductStore((s) => s.handledialog);

  // Memorizing dialog functions with callback
  const handleClose = useCallback(() => handledialog(), [handledialog]);
  const handleManage = useCallback(() => handledialog(), [handledialog]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    // Root layout with safeareaview with edges to all screens
    <SafeAreaView className="flex-1" edges={["top", "left", "right", "bottom"]}>
      <LimitReachedDialog
        visible={dialog}
        onClose={handleClose}
        onManage={() => {
          handleManage();
          // router.push("/manage");
        }}
      />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Splash screen */}
        <Stack.Screen name="(splash)" />
        {/* Main screens */}
        <Stack.Screen name="(main)" />
      </Stack>
    </SafeAreaView>
  );
}

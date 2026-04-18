import { Stack } from "expo-router";

export default function LimitLayout() {
  return (
    <Stack>
      <Stack.Screen name="limit" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function ProductAddLayout() {
  return (
    <Stack>
      <Stack.Screen name="Addproduct" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Tabs } from "expo-router";

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Homescreens"
        options={{ headerShown: false, title: "Home" }}
      />
      <Tabs.Screen
        name="ProductAdd"
        options={{ headerShown: false, title: "Add Product" }}
      />
      <Tabs.Screen
        name="Limitscreens"
        options={{ headerShown: false, title: "Limit" }}
      />
    </Tabs>
  );
}

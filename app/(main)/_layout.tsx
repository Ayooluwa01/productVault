import { stylings } from "@/src/constants/stylings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <MotiView style={styles.iconWrap}>
    <MotiView
      animate={{
        opacity: focused ? 1 : 0,
        scaleX: focused ? 1 : 0.3,
      }}
      transition={{
        type: "timing",
        duration: 250,
        easing: Easing.out(Easing.cubic),
      }}
      style={styles.activeBar}
    />
    <MotiView
      animate={{ scale: focused ? 1.12 : 1, translateY: focused ? -1 : 0 }}
      transition={{
        type: "timing",
        duration: 250,
        easing: Easing.out(Easing.quad),
      }}
    >
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={24}
        color={color}
      />
    </MotiView>
  </MotiView>
);

const AddIcon = ({ focused }: { focused: boolean }) => (
  <View style={styles.addOuter}>
    <MotiView
      animate={{
        rotate: focused ? "45deg" : "0deg",
        scale: focused ? 1.06 : 1,
      }}
      transition={{
        type: "timing",
        duration: 500,
        easing: Easing.inOut(Easing.cubic),
      }}
      style={styles.addBtn}
    >
      <Ionicons name="add" size={30} color="#fff" />
    </MotiView>
    {/* Pulse ring */}
    <MotiView
      from={{ scale: 1, opacity: 0.4 }}
      animate={{ scale: 1.5, opacity: 0 }}
      transition={{
        loop: true,
        type: "timing",
        duration: 1800,
        easing: Easing.out(Easing.cubic),
      }}
      style={styles.addPulse}
    />
  </View>
);

const SettingsIcon = ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => (
  <MotiView style={styles.iconWrap}>
    <MotiView
      animate={{ opacity: focused ? 1 : 0, scaleX: focused ? 1 : 0.3 }}
      transition={{
        type: "timing",
        duration: 250,
        easing: Easing.out(Easing.cubic),
      }}
      style={styles.activeBar}
    />
    <MotiView
      animate={{
        scale: focused ? 1.12 : 1,
        rotate: focused ? "30deg" : "0deg",
        translateY: focused ? -1 : 0,
      }}
      transition={{
        type: "timing",
        duration: 400,
        easing: Easing.inOut(Easing.cubic),
      }}
    >
      <Ionicons
        name={focused ? "settings-sharp" : "settings-outline"}
        size={22}
        color={color}
      />
    </MotiView>
  </MotiView>
);

const renderHomeIcon = ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => <HomeIcon color={color} focused={focused} />;
const renderAddIcon = ({ focused }: { color: string; focused: boolean }) => (
  <AddIcon focused={focused} />
);
const renderSettingsIcon = ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => <SettingsIcon color={color} focused={focused} />;

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: stylings.colors.bluebg,
        tabBarInactiveTintColor: "#C4CDD8",
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          height: 68,
          backgroundColor: "#ffffff",
          borderRadius: 34,
          paddingBottom: 0,
          paddingTop: 0,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: stylings.colors.bluebg,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 24,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          letterSpacing: 0.3,
          marginTop: 2,
          paddingBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="Homescreens"
        options={{ title: "Home", tabBarIcon: renderHomeIcon }}
      />
      <Tabs.Screen
        name="ProductAdd"
        options={{
          title: "",
          tabBarIcon: renderAddIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="Settingscreens"
        options={{ title: "Settings", tabBarIcon: renderSettingsIcon }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  activeBar: {
    position: "absolute",
    top: -14,
    width: 20,
    height: 3,
    borderRadius: 99,
    backgroundColor: stylings.colors.bluebg,
  },
  addOuter: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: stylings.colors.bluebg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: stylings.colors.bluebg,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  addPulse: {
    position: "absolute",
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: stylings.colors.bluebg,
  },
});

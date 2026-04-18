import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { Easing } from "react-native-reanimated";

const HomeIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <MotiView className="items-center justify-center">
    {/* Active dot */}
    <MotiView
      animate={{ opacity: focused ? 1 : 0, translateY: focused ? 0 : -4 }}
      transition={{
        type: "timing",
        duration: 200,
        easing: Easing.out(Easing.quad),
      }}
      className="absolute -top-3 w-1 h-1 rounded-full bg-bluebg"
    />
    {/* Icon scale */}
    <MotiView
      animate={{ scale: focused ? 1.1 : 1 }}
      transition={{
        type: "timing",
        duration: 200,
        easing: Easing.out(Easing.quad),
      }}
    >
      <Entypo name="grid" size={30} color={color} />
    </MotiView>
  </MotiView>
);

const AddIcon = ({ focused }: { focused: boolean }) => (
  <MotiView
    animate={{ scale: focused ? 1.08 : 1, rotate: focused ? "45deg" : "0deg" }}
    transition={{
      type: "timing",
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    }}
    style={{
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: `${focused ? "#1B3A6B" : "#C4CDD8"}`,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 30,
      shadowColor: "#1B3A6B",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 8,
    }}
  >
    <Ionicons name="add" size={30} color="#ffffff" />
  </MotiView>
);

const LimitIcon = ({ color, focused }: { color: string; focused: boolean }) => (
  <MotiView className="items-center justify-center">
    {/* Active dot */}
    <MotiView
      animate={{ opacity: focused ? 1 : 0, translateY: focused ? 0 : -4 }}
      transition={{
        type: "timing",
        duration: 200,
        easing: Easing.out(Easing.quad),
      }}
      className="absolute -top-3 w-1 h-1 rounded-full bg-bluebg"
    />
    {/* Icon scale */}
    <MotiView
      animate={{ scale: focused ? 1.1 : 1 }}
      transition={{
        type: "timing",
        duration: 200,
        easing: Easing.out(Easing.quad),
      }}
    >
      <FontAwesome6 name="circle-exclamation" size={28} color={color} />
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
const renderLimitIcon = ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => <LimitIcon color={color} focused={focused} />;

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1B3A6B",
        tabBarInactiveTintColor: "#C4CDD8",
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 22,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "#1B3A6B",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.13,
          shadowRadius: 20,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.4,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="Homescreens"
        options={{ title: "Home", tabBarIcon: renderHomeIcon }}
      />
      <Tabs.Screen
        name="ProductAdd"
        options={{ title: "Add", tabBarIcon: renderAddIcon }}
      />
      <Tabs.Screen
        name="Limitscreens"
        options={{ title: "Limit", tabBarIcon: renderLimitIcon }}
      />
    </Tabs>
  );
}

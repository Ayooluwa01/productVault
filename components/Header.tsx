import User from "@/assets/svgs/User.svg";
import Vault from "@/assets/svgs/Vault.svg";
import { StyledText } from "@/components/Styledtext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const HomeHeader = () => {
  return (
    <View style={styles.container} className="p-screen-edge bg-red-800">
      {/* Left side — Icon + Text */}
      <TouchableOpacity style={styles.left}>
        <Vault />
        <StyledText>ProductVault</StyledText>
      </TouchableOpacity>

      {/* Right side — User icon */}
      <View>
        <User />
      </View>
    </View>
  );
};

export const BackHeader = memo(() => {
  return (
    <View style={styles.container} className="p-screen-edge bg-red-800">
      {/* Left side — Icon + Text */}
      <TouchableOpacity style={styles.left}>
        <Ionicons name="arrow-back" size={22} color={"#1B3A6B"} />
        <StyledText>ProductVault</StyledText>
      </TouchableOpacity>

      {/* Right side — User icon */}
      <View>
        <User />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default memo(HomeHeader);

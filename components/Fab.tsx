import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiView } from "moti";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";

type FabProps = {
  onPress?: () => void;
};

export const Fab = ({ onPress }: FabProps) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = useCallback(() => setPressed(true), []);
  const handlePressOut = useCallback(() => setPressed(false), []);
  const handlePress = useCallback(() => onPress?.(), [onPress]);

  return (
    <View pointerEvents="box-none" style={styles.container}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Pulse ring */}
        <MotiView
          from={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{
            loop: true,
            type: "timing",
            duration: 1800,
            easing: Easing.out(Easing.cubic),
          }}
          style={styles.pulse}
        />

        {/* FAB button */}
        <MotiView
          animate={{
            scale: pressed ? 0.92 : 1,
            rotate: pressed ? "45deg" : "0deg",
          }}
          transition={{
            type: "timing",
            duration: 500,
            easing: Easing.inOut(Easing.cubic),
          }}
          style={styles.fab}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </MotiView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 104,
    right: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  pulse: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1B3A6B",
    alignSelf: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1B3A6B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1B3A6B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
});

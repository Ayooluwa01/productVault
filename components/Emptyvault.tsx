import Vault from "@/assets/svgs/Empty.svg";
import { stylings } from "@/src/constants/stylings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { MotiView } from "moti";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Easing } from "react-native-reanimated";
import { StyledText } from "./Styledtext";

// Empty Vault component
export const Emptyvault = memo(() => (
  <MotiView
    from={{ opacity: 0, translateY: 24 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{
      type: "timing",
      duration: 600,
      easing: Easing.out(Easing.cubic),
    }}
    style={styles.emptyContainer}
  >
    {/* Empty Vault svg */}
    <MotiView
      from={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 14, stiffness: 180, delay: 100 }}
    >
      <Vault width={150} height={150} />
    </MotiView>

    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 500,
        delay: 200,
        easing: Easing.out(Easing.quad),
      }}
      style={styles.emptyTextGroup}
    >
      <StyledText style={styles.emptyTitle}>Your vault is empty</StyledText>
      <StyledText style={styles.emptySubtitle}>
        Start building your digital inventory by adding your first product.
      </StyledText>
    </MotiView>

    <MotiView
      from={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "timing",
        duration: 400,
        delay: 350,
        easing: Easing.out(Easing.quad),
      }}
      style={styles.emptyButtonWrapper}
    >
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => router.replace("/(main)/ProductAdd/Addproduct")}
      >
        <Ionicons name="add-circle" size={20} color="#ffffff" />
        <StyledText style={styles.addButtonText}>
          Add Your First Product
        </StyledText>
      </TouchableOpacity>
    </MotiView>
  </MotiView>
));

const styles = StyleSheet.create({
  // Empty vault
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: stylings.spacing.big,
  },
  emptyTextGroup: {
    alignItems: "center",
    gap: 6,
  },
  emptyTitle: {
    fontSize: stylings.fontSize.Minibigtext,
    fontWeight: "bold",
    color: stylings.colors.text.bluebg,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyButtonWrapper: {
    marginTop: 8,
    width: "100%",
  },
  addButton: {
    backgroundColor: stylings.colors.bluebg,
    padding: 22,
    borderRadius: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});

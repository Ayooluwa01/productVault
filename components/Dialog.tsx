import { StyledText } from "@/components/Styledtext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiView } from "moti";
import React, { memo, useCallback } from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Easing } from "react-native-reanimated";

type LimitReachedDialogProps = {
  visible: boolean;
  onClose: () => void;
  onManage: () => void;
};

const LimitReachedDialog = memo(
  ({ visible, onClose, onManage }: LimitReachedDialogProps) => {
    const handleClose = useCallback(() => onClose(), [onClose]);
    const handleManage = useCallback(() => onManage(), [onManage]);

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        <Pressable onPress={handleClose} style={styles.backdrop}>
          <Pressable>
            <MotiView
              from={{ opacity: 0, scale: 0.88, translateY: 20 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 200,
              }}
              style={styles.card}
            >
              {/* Lock icon */}
              <MotiView
                from={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 14,
                  stiffness: 180,
                  delay: 150,
                }}
                style={styles.iconCircle}
              >
                <Ionicons name="lock-closed" size={30} color="#0f1e3d" />
              </MotiView>

              {/* Text */}
              <MotiView
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "timing",
                  duration: 350,
                  delay: 200,
                  easing: Easing.out(Easing.quad),
                }}
                style={styles.textGroup}
              >
                <StyledText style={styles.title}>Limit Reached</StyledText>
                <StyledText style={styles.subtitle}>
                  You've reached the maximum of 5 products. Kindly delete some
                  products to continue.
                </StyledText>
              </MotiView>

              {/* Divider */}
              <MotiView
                from={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ type: "timing", duration: 300, delay: 250 }}
                style={styles.divider}
              />

              {/* Buttons */}
              <MotiView
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "timing",
                  duration: 350,
                  delay: 300,
                  easing: Easing.out(Easing.quad),
                }}
                style={styles.buttons}
              >
                <TouchableOpacity
                  onPress={handleManage}
                  activeOpacity={0.85}
                  style={styles.primaryBtn}
                >
                  <StyledText style={styles.primaryBtnText}>
                    Manage Products
                  </StyledText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleClose}
                  activeOpacity={0.7}
                  style={styles.secondaryBtn}
                >
                  <StyledText style={styles.secondaryBtnText}>Close</StyledText>
                </TouchableOpacity>
              </MotiView>
            </MotiView>
          </Pressable>
        </Pressable>
      </Modal>
    );
  },
);

export default LimitReachedDialog;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
    gap: 12,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 20,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF0FB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  textGroup: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f1e3d",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  divider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
  buttons: {
    width: "100%",
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: "#021064",
    paddingVertical: 16,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#021064",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryBtn: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
  },
});

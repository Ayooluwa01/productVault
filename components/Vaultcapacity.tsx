import { stylings } from "@/src/constants/stylings";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MotiView } from "moti";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { StyledText } from "./Styledtext";

type VaultCapacityProps = {
  used: number;
  limit: number;
  percentage: number;
};

// Vault Capacity component
export const VaultCapacity = memo(
  ({ used, limit, percentage }: VaultCapacityProps) => (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }}
      style={styles.capacityCard}
    >
      <StyledText style={styles.capacityLabel}>VAULT CAPACITY</StyledText>

      <View style={styles.capacityRow}>
        <StyledText style={styles.capacityCount}>
          {used}/{limit} PRODUCTS
        </StyledText>
        <FontAwesome6
          name="circle-exclamation"
          size={18}
          color={used >= limit ? "#EF4444" : "#1B3A6B"}
        />
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <MotiView
          from={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{
            type: "timing",
            duration: 800,
            delay: 300,
            easing: Easing.out(Easing.cubic),
          }}
          style={[
            styles.progressFill,
            used >= limit && styles.progressFillDanger,
          ]}
        />
      </View>

      <StyledText style={styles.capacitySlots}>
        {limit - used} slot available in your basic vault.
      </StyledText>
    </MotiView>
  ),
);

const styles = StyleSheet.create({
  // Vault capacity
  capacityCard: {
    backgroundColor: "#F4F6F8",
    borderRadius: 20,
    padding: 16,
    gap: 10,
    marginTop: stylings.spacing.section,
    marginHorizontal: stylings.spacing.screenEdge,
  },
  capacityLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 1.5,
  },
  capacityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  capacityCount: {
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "700",
    color: stylings.colors.text.bluebg,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#E0E3E5",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#1B3A6B",
    borderRadius: 99,
  },
  progressFillDanger: {
    backgroundColor: "#EF4444",
  },
  capacitySlots: {
    fontSize: 12,
    color: "#6B7280",
  },
});

import { StyledText } from "@/components/Styledtext";
import { stylings } from "@/src/constants/stylings";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { MotiView } from "moti";
import React, { memo, useMemo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { getDeviceInfo } from "../../../src/utils/deviceinfo";

const SectionHeader = memo(
  ({ title, subtitle }: { title: string; subtitle: string }) => (
    <View style={styles.sectionHeader}>
      <StyledText style={styles.sectionTitle}>{title}</StyledText>
      <StyledText style={styles.sectionSubtitle}>{subtitle}</StyledText>
    </View>
  ),
);

const RowItem = memo(
  ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <View style={styles.row}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.rowTextContainer}>
        <StyledText style={styles.rowLabel}>{label}</StyledText>
        <StyledText style={styles.rowValue}>{value}</StyledText>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#C4CDD8" />
    </View>
  ),
);

const PillCard = memo(({ label, value }: { label: string; value: string }) => (
  <View style={styles.pillCard}>
    <StyledText style={styles.rowLabel}>{label}</StyledText>
    <StyledText style={styles.pillValue}>{value}</StyledText>
  </View>
));

export default function SettingScreen() {
  const deviceInfo = useMemo(() => getDeviceInfo(), []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      style={styles.scroll}
    >
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 500,
          easing: Easing.out(Easing.cubic),
        }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={stylings.colors.bluebg}
          />
        </TouchableOpacity>
        <StyledText style={styles.headerTitle}>ProductVault</StyledText>
        <View style={styles.headerRight}>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={stylings.colors.bluebg}
          />
        </View>
      </MotiView>

      {/* Status card */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 80,
          easing: Easing.out(Easing.cubic),
        }}
        style={styles.statusCard}
      >
        <View style={styles.statusLeft}>
          <View style={styles.greenDotContainer}>
            <View style={styles.greenDot} />
          </View>
          <View style={styles.statusTextGroup}>
            <StyledText style={styles.statusLabel}>SYSTEM STATUS</StyledText>
            <StyledText style={styles.statusText}>System: Healthy</StyledText>
          </View>
        </View>
        <View style={styles.statusCheckContainer}>
          <Ionicons name="checkmark-circle" size={22} color="#fff" />
        </View>
      </MotiView>

      {/* Device details */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 160,
          easing: Easing.out(Easing.cubic),
        }}
      >
        <SectionHeader title="Device Details" subtitle="Hardware Profile" />

        <View style={styles.listCard}>
          <RowItem
            icon={
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color={stylings.colors.lightblue}
              />
            }
            label="DEVICE MODEL"
            value={deviceInfo.modelName || "Unknown Device"}
          />
          <View style={styles.divider} />
          <RowItem
            icon={
              <MaterialCommunityIcons
                name="cog-outline"
                size={22}
                color={stylings.colors.lightblue}
              />
            }
            label="OS VERSION"
            value={`${deviceInfo.osName} ${deviceInfo.osVersion}`}
          />
        </View>
      </MotiView>

      {/* App info */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 240,
          easing: Easing.out(Easing.cubic),
        }}
        style={styles.appInfoSection}
      >
        <SectionHeader title="App Info" subtitle="Software Manifest" />

        <PillCard label="VERSION" value={deviceInfo.version || "1.0.0"} />
        <PillCard
          label="BUILD"
          value={deviceInfo.buildVersion || "2024.01.01"}
        />
      </MotiView>

      {/* Legal button */}
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 320,
          easing: Easing.out(Easing.cubic),
        }}
      >
        <TouchableOpacity style={styles.legalButton} activeOpacity={0.7}>
          <View style={styles.legalIconWrap}>
            <MaterialCommunityIcons
              name="gavel"
              size={20}
              color={stylings.colors.lightblue}
            />
          </View>
          <StyledText style={styles.legalText}>
            Legal & Terms of Service
          </StyledText>
          <Ionicons name="chevron-forward" size={18} color="#C4CDD8" />
        </TouchableOpacity>
      </MotiView>

      {/* Footer */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 600, delay: 400 }}
        style={styles.footer}
      >
        <StyledText style={styles.footerLogo}>ProductVault</StyledText>
        <StyledText style={styles.footerSubtitle}>
          YOUR DIGITAL SANCTUARY
        </StyledText>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: stylings.colors.background,
  },
  container: {
    paddingHorizontal: stylings.spacing.screenEdge,
    paddingBottom: stylings.spacing["section-lg"],
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: stylings.spacing.large,
    marginBottom: stylings.spacing.section,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "700",
    color: stylings.colors.bluebg,
  },
  headerRight: {
    width: 36,
    alignItems: "flex-end",
  },

  // Status card
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: stylings.colors.surface,
    borderRadius: 20,
    padding: stylings.spacing.big,
    marginBottom: stylings.spacing.section,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: stylings.spacing.big,
  },
  statusTextGroup: {
    gap: 2,
  },
  greenDotContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: stylings.colors.greenbg,
  },
  statusLabel: {
    fontSize: stylings.fontSize.smalltext,
    fontWeight: "700",
    color: stylings.colors.text.muted,
    letterSpacing: 1,
  },
  statusText: {
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "700",
    color: stylings.colors.bluebg,
  },
  statusCheckContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: stylings.colors.greenbg,
    alignItems: "center",
    justifyContent: "center",
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: stylings.spacing.medium,
  },
  sectionTitle: {
    fontSize: stylings.fontSize.Minibigtext,
    fontWeight: "800",
    color: stylings.colors.bluebg,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: stylings.colors.text.muted,
    marginBottom: 2,
  },

  // List card
  listCard: {
    backgroundColor: stylings.colors.background,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: stylings.spacing.big,
    marginBottom: stylings.spacing.section,
    shadowColor: stylings.colors.bluebg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: stylings.spacing.big,
    gap: stylings.spacing.big,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF0FB",
    alignItems: "center",
    justifyContent: "center",
  },
  rowTextContainer: {
    flex: 1,
    gap: 3,
  },
  rowLabel: {
    fontSize: stylings.fontSize.smalltext,
    fontWeight: "700",
    color: stylings.colors.text.muted,
    letterSpacing: 1,
  },
  rowValue: {
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "700",
    color: stylings.colors.text.DEFAULT,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#E5E7EB",
    marginLeft: 56,
  },

  // App info
  appInfoSection: {
    gap: stylings.spacing.medium,
    marginBottom: stylings.spacing.section,
  },
  pillCard: {
    backgroundColor: stylings.colors.surface,
    padding: stylings.spacing.big,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    gap: 4,
  },
  pillValue: {
    fontSize: stylings.fontSize.Minibigtext,
    fontWeight: "800",
    color: stylings.colors.bluebg,
  },

  // Legal
  legalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: stylings.colors.background,
    paddingVertical: stylings.spacing.big,
    paddingHorizontal: stylings.spacing.big,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    gap: stylings.spacing.big,
    marginBottom: stylings.spacing.section,
  },
  legalIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF0FB",
    alignItems: "center",
    justifyContent: "center",
  },
  legalText: {
    flex: 1,
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "700",
    color: stylings.colors.text.DEFAULT,
  },

  // Footer
  footer: {
    alignItems: "center",
    gap: 4,
    paddingTop: stylings.spacing.section,
  },
  footerLogo: {
    fontSize: stylings.fontSize.Minibigtext,
    fontWeight: "800",
    color: "#C4CDD8",
    letterSpacing: -0.5,
  },
  footerSubtitle: {
    fontSize: 9,
    fontWeight: "700",
    color: "#C4CDD8",
    letterSpacing: 2,
  },
});

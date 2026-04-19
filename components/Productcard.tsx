import { StyledText } from "@/components/Styledtext";
import { stylings } from "@/src/constants/stylings";
import { Product, useProductStore } from "@/src/store/useProductStore";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiView } from "moti";
import React, { memo, useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Easing } from "react-native-reanimated";

type ProductCardProps = {
  item: Product;
  index: number;
  onEdit?: (id: string) => void;
};

const ProductCard = memo(({ item, index, onEdit }: ProductCardProps) => {
  const deleteProduct = useProductStore((s) => s.deleteProduct);

  const handleEdit = useCallback(() => onEdit?.(item.id), [item.id, onEdit]);
  const handleDelete = useCallback(
    () => deleteProduct(item.id),
    [item.id, deleteProduct],
  );

  return (
    <MotiView
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 420,
        delay: index * 80,
        easing: Easing.out(Easing.cubic),
      }}
      style={styles.card}
    >
      {/* Image */}
      <View style={styles.imageWrapper}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imageFallback}>
            <Ionicons name="image-outline" size={36} color="#C4CDD8" />
          </View>
        )}

        {/* Price badge */}
        <View style={styles.priceBadge}>
          <StyledText style={styles.priceBadgeText}>
            ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </StyledText>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.nameRow}>
          <StyledText style={styles.name} numberOfLines={1}>
            {item.name}
          </StyledText>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleEdit}
              style={styles.iconBtn}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather
                name="edit-2"
                size={13}
                color={stylings.colors.lightblue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.iconBtnDanger}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="trash-2" size={13} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        {item.description ? (
          <StyledText style={styles.description} numberOfLines={2}>
            {item.description}
          </StyledText>
        ) : null}

        {/* Footer  */}
        <View style={styles.footerStrip}>
          <View style={styles.footerLeft}>
            <Ionicons
              name="cube-outline"
              size={13}
              color={stylings.colors.lightblue}
            />
            <StyledText style={styles.footerLabel}>In Vault</StyledText>
          </View>
          <View style={styles.dot} />
          <StyledText style={styles.footerDate}>
            {new Date(parseInt(item.id)).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </StyledText>
        </View>
      </View>
    </MotiView>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    marginHorizontal: stylings.spacing.screenEdge,
    marginTop: 12,
    overflow: "hidden",
    shadowColor: stylings.colors.bluebg,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  imageWrapper: {
    backgroundColor: "#EEF0FB",
    margin: 10,
    borderRadius: 18,
    height: 170,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  imageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6F8",
  },
  priceBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: stylings.colors.bluebg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  priceBadgeText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 6,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: stylings.colors.bluebg,
    lineHeight: 22,
  },
  description: {
    fontSize: 12,
    color: stylings.colors.text.muted,
    lineHeight: 18,
  },
  actions: { flexDirection: "row", gap: 6 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#EEF0FB",
    borderWidth: 0.5,
    borderColor: "#C7CAEE",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnDanger: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FEF2F2",
    borderWidth: 0.5,
    borderColor: "#FECACA",
    alignItems: "center",
    justifyContent: "center",
  },
  footerStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
  },
  footerLeft: { flexDirection: "row", alignItems: "center", gap: 4 },
  footerLabel: {
    fontSize: 11,
    color: stylings.colors.lightblue,
    fontWeight: "600",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 99,
    backgroundColor: "#D1D5DB",
  },
  footerDate: {
    fontSize: 11,
    color: stylings.colors.text.muted,
  },
});

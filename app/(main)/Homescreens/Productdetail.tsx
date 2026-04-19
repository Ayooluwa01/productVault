import { StyledText } from "@/components/Styledtext";
import { stylings } from "@/src/constants/stylings";
import { Product, useProductStore } from "@/src/store/useProductStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import React, { memo, useCallback, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";

const ImageUploader = memo(
  ({ image, onPick }: { image: string; onPick: () => void }) => (
    <TouchableOpacity
      onPress={onPick}
      activeOpacity={0.8}
      style={styles.imageUploader}
    >
      {image ? (
        <>
          <Image
            source={{ uri: image }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.cameraIconCircle}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          </View>
        </>
      ) : (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 180 }}
          style={styles.imagePlaceholder}
        >
          <View style={styles.cameraIconCircle}>
            <Ionicons
              name="camera"
              size={28}
              color={stylings.colors.lightblue}
            />
          </View>
          <StyledText style={styles.uploadTitle}>Upload Image</StyledText>
          <StyledText style={styles.uploadSub}>JPG, PNG UP TO 10MB</StyledText>
        </MotiView>
      )}
    </TouchableOpacity>
  ),
);

const FieldLabel = memo(({ label }: { label: string }) => (
  <StyledText style={styles.label}>{label}</StyledText>
));

const EditProduct = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const products = useProductStore((s) => s.products);
  const updateProduct = useProductStore((s) => s.updateProduct);

  const product = products.find((p) => p.id === id) as Product;

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [description, setDescription] = useState(product?.description ?? "");

  const handlePickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library.",
        [{ text: "OK" }],
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  }, []);

  const handleSave = useCallback(() => {
    if (!name.trim()) {
      Alert.alert("Required", "Product name cannot be empty.");
      return;
    }
    updateProduct(id, {
      name: name.trim(),
      price: parseFloat(price) || 0,
      image,
      description: description.trim(),
    });
    router.back();
  }, [id, name, price, image, description, updateProduct]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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

        {/* Title */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 500,
            delay: 80,
            easing: Easing.out(Easing.cubic),
          }}
          style={styles.titleBlock}
        >
          <StyledText style={styles.pageTitle}>Edit Product</StyledText>
          <StyledText style={styles.pageSubtitle}>
            Update your product details below.
          </StyledText>
        </MotiView>

        {/* Image uploader */}
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
          <ImageUploader image={image} onPick={handlePickImage} />
        </MotiView>

        {/* Fields */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 500,
            delay: 240,
            easing: Easing.out(Easing.cubic),
          }}
          style={styles.fields}
        >
          <View>
            <FieldLabel label="PRODUCT NAME" />
            <TextInput
              style={styles.input}
              placeholder="e.g. Premium Wireless Headphones"
              placeholderTextColor={stylings.colors.text.muted}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <FieldLabel label="PRICE (USD)" />
            <View style={styles.priceRow}>
              <StyledText style={styles.priceDollar}>$</StyledText>
              <TextInput
                style={styles.priceInput}
                placeholder="0.00"
                placeholderTextColor={stylings.colors.text.muted}
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </View>

          <View>
            <FieldLabel label="DESCRIPTION" />
            <TextInput
              style={styles.textArea}
              placeholder="Describe your product..."
              placeholderTextColor={stylings.colors.text.muted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </MotiView>

        {/* Save button */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 500,
            delay: 320,
            easing: Easing.out(Easing.cubic),
          }}
          style={styles.btnGroup}
        >
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveBtn}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle" size={22} color="#fff" />
            <StyledText style={styles.saveBtnText}>Save Changes</StyledText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.cancelBtn}
            activeOpacity={0.7}
          >
            <StyledText style={styles.cancelBtnText}>Discard</StyledText>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: stylings.colors.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: stylings.spacing.screenEdge,
    paddingBottom: stylings.spacing["section-lg"],
  },
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
    fontSize: 16,
    fontWeight: "700",
    color: stylings.colors.bluebg,
  },
  headerRight: { width: 36, alignItems: "flex-end" },
  titleBlock: {
    alignItems: "center",
    marginBottom: stylings.spacing.section,
    gap: 6,
  },
  pageTitle: {
    fontSize: stylings.fontSize.Bigtext,
    fontWeight: "800",
    color: stylings.colors.bluebg,
    textAlign: "center",
  },
  pageSubtitle: {
    fontSize: stylings.fontSize.mediumtext,
    color: stylings.colors.text.muted,
    textAlign: "center",
  },
  imageUploader: {
    backgroundColor: stylings.colors.surface,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    height: 200,
    overflow: "hidden",
    marginBottom: stylings.spacing.section,
  },
  imagePreview: { width: "100%", height: "100%" },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cameraIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: stylings.colors.lightblue,
  },
  uploadSub: {
    fontSize: 11,
    color: stylings.colors.text.muted,
    letterSpacing: 0.5,
  },
  fields: {
    gap: stylings.spacing.large,
    marginBottom: stylings.spacing.section,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: stylings.colors.text.muted,
    letterSpacing: 1.2,
    marginBottom: stylings.spacing.medium,
  },
  input: {
    height: stylings.spacing.input,
    backgroundColor: stylings.colors.surface,
    borderRadius: 14,
    paddingHorizontal: stylings.spacing.big,
    fontSize: stylings.fontSize.mediumtext,
    color: stylings.colors.text.DEFAULT,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    height: stylings.spacing.input,
    backgroundColor: stylings.colors.surface,
    borderRadius: 14,
    paddingHorizontal: stylings.spacing.big,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    gap: 6,
  },
  priceDollar: {
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "600",
    color: stylings.colors.text.muted,
  },
  priceInput: {
    flex: 1,
    fontSize: stylings.fontSize.mediumtext,
    color: stylings.colors.text.DEFAULT,
  },
  textArea: {
    backgroundColor: stylings.colors.surface,
    borderRadius: 14,
    paddingHorizontal: stylings.spacing.big,
    paddingTop: stylings.spacing.big,
    fontSize: stylings.fontSize.mediumtext,
    color: stylings.colors.text.DEFAULT,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    minHeight: 120,
  },
  btnGroup: {
    gap: stylings.spacing.medium,
    marginBottom: stylings.spacing.section,
  },
  saveBtn: {
    height: stylings.spacing.btn,
    backgroundColor: stylings.colors.bluebg,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: stylings.colors.bluebg,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "700",
  },
  cancelBtn: {
    height: stylings.spacing.btn,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "600",
    color: stylings.colors.text.muted,
  },
});

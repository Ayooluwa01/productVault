import { Emptyvault } from "@/components/Emptyvault";
import HomeHeader from "@/components/Header";
import ProductCard from "@/components/Productcard";
import { VaultCapacity } from "@/components/Vaultcapacity";
import { Product, useProductStore } from "@/src/store/useProductStore";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";


const Homescreen = () => {
  const products = useProductStore((s) => s.products);
  const limit = useProductStore((s) => s.limit);

  const used = products.length;
  const percentage = useMemo(
    () => Math.round((used / limit) * 100),
    [used, limit],
  );

  const action = useCallback(() => {
    router.push("/(main)/ProductAdd/Addproduct");
  }, []);

  const keyExtractor = (item: Product) => item.id;

const handleEdit = useCallback((id: string) => {
  router.push({
    pathname: "/(main)/Homescreens/Productdetail",
    params: { id },
  });
}, []);

const renderItem = useCallback(
  ({ item, index }: { item: Product; index: number }) => (
    <ProductCard item={item} index={index} onEdit={handleEdit} />
  ),
  [handleEdit],
);
  
  return (
    <>
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEnabled={true}
        ListHeaderComponent={
          <>
            <HomeHeader />
            <VaultCapacity used={used} limit={limit} percentage={percentage} />
            <View>{products.length === 0 && <Emptyvault />}</View>
          </>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      {/* {products.length > 0 && <Fab onPress={action} />} */}
    </>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  list: {},
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductState {
  limit: number;
  products: Product[];

  setLimit: (value: number) => void;
  addProduct: (product: Product) => boolean;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      limit: 5,
      products: [],

      setLimit: (value) => set({ limit: value }),

      addProduct: (product) => {
        const { products, limit } = get();

        if (products.length >= limit) {
          return false;
        }

        set({
          products: [...products, product],
        });

        return true;
      },

      updateProduct: (id, data) =>
        set((state) => {
          // Get products from zustand state
          const { products } = state;
          //  Map through all products
          const mapedProducts = products.map((p) => {
            // If found product with same id as id parameter, return updated product
            if (p.id === id) {
              return { ...p, ...data };
            }
            // Otherwise return product as is
            return p;
          });
          return { products: mapedProducts };
        }),

      deleteProduct: (id) =>
        set((state) => {
          // Get products from zustand state
          const { products } = state;
          // Filter-Keep array with all products except the one with the given id
          const newProducts = products.filter((p) => p.id !== id);
          return { products: newProducts };
        }),
    }),
    {
      name: "product-vault",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

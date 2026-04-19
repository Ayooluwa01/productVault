import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const DUMMY_PRODUCTS = [
  {
    id: "5",
    name: "Gaming Mechanical Keyboard",
    description:
      "RGB backlit mechanical keyboard with tactile switches for gamers and developers.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800",
  },
  {
    id: "6",
    name: "Ultra HD Monitor",
    description:
      "27-inch 4K UHD display with vibrant colors and ultra-thin bezels.",
    price: 399.0,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
  },
  {
    id: "7",
    name: "Portable Bluetooth Speaker",
    description:
      "Compact wireless speaker delivering deep bass and all-day battery life.",
    price: 89.5,
    image: "https://images.unsplash.com/photo-1585386959984-a41552231658?w=800",
  },
  {
    id: "8",
    name: "Ergonomic Office Chair",
    description:
      "Comfort-focused ergonomic chair designed for long working sessions.",
    price: 259.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
  },
  {
    id: "9",
    name: "USB-C Laptop Docking Station",
    description:
      "Multi-port docking station supporting HDMI, USB, Ethernet, and fast charging.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
  },
];

export interface Product {
  id: string;
  name: string;
  description: string;
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
  dialog: boolean;
  handledialog: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      limit: 5,
      dialog: false,
      handledialog: () => set((state) => ({ dialog: !state.dialog })),
      products: [],

      setLimit: (value) => set({ limit: value }),

      addProduct: (product) => {
        const { products, limit } = get();

        if (products.length >= limit) {
          set({ dialog: true });
          return false;
        }

        set({
          products: [...products, product],
        });

        return true;
      },

      updateProduct: (id, data) =>
        set((state) => {
          const { products } = state;

          const mapedProducts = products.map((p) => {
            if (p.id === id) {
              return { ...p, ...data };
            }
            return p;
          });

          return { products: mapedProducts };
        }),

      deleteProduct: (id) =>
        set((state) => {
          const { products } = state;
          const newProducts = products.filter((p) => p.id !== id);
          return { products: newProducts };
        }),
    }),
    {
      name: "product-vault",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        products: state.products,
        limit: state.limit,
      }),
    },
  ),
);

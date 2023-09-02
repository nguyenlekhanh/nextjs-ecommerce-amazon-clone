import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductsSliceState {
  productData: StoreProduct[];
  favoriteData: StoreProduct[];
  allProducts: StoreProduct[];
  userInfo: any | string;
}

const initialState : ProductsSliceState= {
  productData: [],
  favoriteData: [],
  allProducts: [],
  userInfo: null,
}

export const nextSlice = createSlice({
  name: 'next',
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<StoreProduct>) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    addToFavorite: (state, action) => {
      const existingProduct = state.favoriteData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.favoriteData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      );
      if(existingProduct && existingProduct?.quantity <= 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct!.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter((item) => item._id !== action.payload);
    },
    resetCart: (state) => {
      state.productData = [];
    },
    resetFavoriteData: (state) => {
      state.favoriteData = [];
    },
    deleteFavorite: (state, action) => {
      state.favoriteData = state.favoriteData.filter(
        (item) => item._id !== action.payload
      );
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    }
  }
});

export const { 
  addToCart, addToFavorite, increaseQuantity, decreaseQuantity,
  deleteProduct, resetCart, addUser, removeUser, setAllProducts,
  resetFavoriteData, deleteFavorite
} = nextSlice.actions;
export default nextSlice.reducer;
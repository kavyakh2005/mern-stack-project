import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  original_total: 0,
  final_total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, { payload }) => {
      const existingProduct = state.cart.find((data)=> data.productId === payload.productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
             state.cart.push({
        productId: payload.productId,
        quantity: 1,
      });
      }

 
      state.original_total += payload.originalPrice;
      state.final_total += payload.finalPrice;

      
      // console.log(state);
      // console.log(JSON.stringify(state, null, 2));
      // console.log(payload.productId);
    },


    emptyCart: (state) => {
      state.cart = null;
      state.original_total = 0;
      state.final_total = 0;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addtocart } = cartSlice.actions;

export default cartSlice.reducer;

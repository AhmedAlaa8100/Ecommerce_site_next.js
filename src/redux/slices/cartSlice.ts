import { servicesApi } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartCount: 0
}


export const getCartCount = createAsyncThunk("cart/getCartCount", async () => {
    return await servicesApi.getCartProducts();
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartCount: (state, action) => {
            state.cartCount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartCount.fulfilled, (state, action) => {
            state.cartCount = action.payload.numOfCartItems;
        })
    }
})


export const cartReducer = cartSlice.reducer;
export const { updateCartCount } = cartSlice.actions;
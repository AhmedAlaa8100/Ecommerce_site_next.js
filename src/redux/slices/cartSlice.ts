import { apiService } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartCount: 0,
    isLoading: false
}


export const getCartCount = createAsyncThunk("cart/getCartCount", async () => {
    return await apiService.getLoggedUserCart();
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        resetCartCount: (state) => {
            state.cartCount = 0;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartCount.fulfilled, (state, action) => {
                state.cartCount = action.payload.numOfCartItems;
                state.isLoading = false;
            })
            .addCase(getCartCount.rejected, (state, action) => {
                console.error("Failed to fetch cart count:", action.error);
                // Keep the current cart count or reset to 0 if needed
                state.cartCount = 0;
                state.isLoading = false;
            })
    }
})


export const cartReducer = cartSlice.reducer;
export const { updateCartCount, resetCartCount } = cartSlice.actions;
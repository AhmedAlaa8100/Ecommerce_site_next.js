import { Product } from "@/interfaces";
import { apiService } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductsInitialState {
    products: Product[]
}

const initialState: ProductsInitialState = {
    products: []
}



export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
    return await apiService.getAllProducts();
})




const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, () => {
            console.log("Pending");
        })

        builder.addCase(getAllProducts.rejected, () => {
            console.log("Rejected");
        })

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            console.log("Fulfilled");
            console.log(action.payload.data);
            state.products = action.payload.data;
        })
    }
})


export const productsReducer = productsSlice.reducer;



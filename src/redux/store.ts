import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./slices/counterSlice";
import { productsReducer } from "./slices/productsSlice";
import { cartReducer } from "./slices/cartSlice";




// Store does not have a valid reducer
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer,
        cart: cartReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
import multicall from "@/multicall";
import { configureStore } from "@reduxjs/toolkit";
export const reduxStore = configureStore({
    reducer: {
        [multicall.reducerPath]: multicall.reducer,
    },
});

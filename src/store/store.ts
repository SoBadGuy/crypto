import {configureStore} from "@reduxjs/toolkit";
import AddTradingPairSlice from "./feauters/AddTradingPairSlice";

export const store = configureStore({
    reducer: {
        tradingPairs: AddTradingPairSlice,
    }, 
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
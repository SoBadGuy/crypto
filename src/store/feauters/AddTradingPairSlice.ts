import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PostService} from "../../api/PostService";


interface IState {
    pair: any[],
    activeTradingPair: string,
    status: "success" | "error" | null,
    errorMessage: string
}

const initialState: IState = {
    pair: [],
    activeTradingPair: "",
    status: null,
    errorMessage: "", 
}

export const fetchTradingPairs = createAsyncThunk("fetchTradingPairs", async () => {
    return await PostService.getSnapshotOfTradingPairs()
})
export const addTradingPairSlice = createSlice({
    name: "addTradingPair",
    initialState,
    reducers: {
        updateActiveTradingPair: (state, action) => {
            state.activeTradingPair = action.payload
        },
    },
    extraReducers(builder)  {
        builder.addCase(fetchTradingPairs.fulfilled, (state, action) => {
            state.pair = [...action.payload].filter(pair => pair.symbol.slice(-4) === "USDT")
            state.activeTradingPair = [...state.pair][0].symbol
            state.status = "success"
        }).addCase(fetchTradingPairs.rejected, (state) => {
            state.status = "error"
            state.errorMessage = "Что-то пошло не так"
        })
    },
})

export const {updateActiveTradingPair} = addTradingPairSlice.actions
export default addTradingPairSlice.reducer
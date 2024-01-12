import axios from "axios";

export class PostService {

    static async getSnapshotOfTradingPairs () {
        const response = await  axios.get(`https://fapi.binance.com/fapi/v1/ticker/24hr`)
        return response.data
    }
   static async getSnapshotCandle(pair: string, interval: string) {
       const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${pair}&interval=${interval}&limit=500`)
       return response.data
    }
}
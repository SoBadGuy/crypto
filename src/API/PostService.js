import axios from "axios";

export default class PostService {

    static async getByStatisticsAllPairFutures() {
        const response = await axios.get("https://fapi.binance.com/fapi/v1/ticker/24hr")
        return response.data
    }

    static async getByStatisticsAllPairSpot() {
        const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr")
        return response.data
    }

    static async getKlineData(interval, pair) {
        const response = await axios.get(`https://fapi.binance.com/fapi/v1/klines?symbol=${pair}&interval=${interval}`)
        return response.data
    }
}
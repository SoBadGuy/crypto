import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {createChart, CrosshairMode, ISeriesApi} from "lightweight-charts";
import {PostService} from "../api/PostService";
import {useFetching} from "../hooks/useFetching";
import {useWebSocket} from "../hooks/useWebSocket";
import {useAppSelector} from "../store/hooks";

interface ICandle {
    time: number,
    open: number,
    high: number,
    low: number,
    close: number
}
const CandlestickChart: FC = () => {
    const activePair = useAppSelector(state => state.tradingPairs.activeTradingPair)
    const candlestickSeries = useRef<ISeriesApi<any>>()
    const [candle, setCandle] = useState<ICandle[]>([])
    const [activeTime, setActiveTime] = useState('5m')
    const timeInterval = ['5m', '15m', '30m', '1h', '1d']
    const link = `${activePair.toLowerCase()}@kline_${activeTime}`
    const [fetchCandle, isLoading, error] = useFetching(async () => {
        const response =  await PostService.getSnapshotCandle(activePair, activeTime)
        setCandle(candleConversionApi(response))
    })
    console.log(link)
    useWebSocket((data: any) => {
        candlestickSeries.current?.update((candleConversionSocket([data.k])[0]))
    }, link)
    const candleConversionApi = (data: [any]) => {
        return data.map((el) => {
            return {time: el[0] / 1000, open: Number(el[1]), high: Number(el[2]), low: Number(el[3]), close: Number(el[4])}
        })
    }
    const candleConversionSocket = (data: [any]) => {
        return data.map((el) => {
            return {time: el.t / 1000, open: Number(el.o), high: Number(el.h), low: Number(el.l), close: Number(el.c)}
        })
    }
    const postForm = () => {
        const indexPriceForm = String(candle[0]?.close).indexOf(".")
        const price = indexPriceForm > 0 ? String(candle[0]?.close).slice(indexPriceForm + 1).length : 0
        return {priceFormat: {type: 'price', precision: price, minMove: 1 / Math.pow(10, price)}}
    }
    useEffect(() => {
        if (activePair) {
            fetchCandle()
        }
    }, [activeTime, activePair]);

    useEffect(() => {
        const chart = createChart(document.getElementById('chart')!)
        candlestickSeries.current = chart.addCandlestickSeries(postForm() as {});
        console.log(candle[0]?.high)
        chart.applyOptions({
            crosshair: {mode: CrosshairMode.Normal},
            timeScale: {timeVisible: true, secondsVisible: false},
        })
        console.log(candle)
        candlestickSeries.current?.setData(candle)

        return () => {
            chart.remove()
        }
    }, [candle]);

    const conclusion = () => {
        if (error) {
            return <h1>Произошла ошибка{error}</h1>
        } else {
            return isLoading
                ? <div className="chart-loading">
                    Идет загрузка...
                  </div>
                : <div id="chart">
                    <div className="chart__timeIntervalButtons">
                        <h1 className="chart__pair">{activePair}</h1>
                        {timeInterval.map((time) =>
                            <button
                                key={time}
                                onClick={() => setActiveTime(time)}
                                className={activeTime === time ? "chart__btnInterval chart__btnInterval_active": 'chart__btnInterval'}>{time}</button>
                        )}
                    </div>
                </div>
        }
    }

    return (
        <>
            {conclusion()}
        </>
    );
};
export default CandlestickChart;
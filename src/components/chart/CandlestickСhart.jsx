import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createChart, CrosshairMode} from "lightweight-charts";
import PostService from "../../API/PostService";

const CandlestickHart = ({chartProperties, symbol, update, updateTimeInterval, time}) => {

    const [allCandle, setAllCandle] = useState([])
    const webSoсket = useRef(null)
    const candlestickSeries = useRef(null)
    useEffect(() => {
        if (symbol.name){
        fetchAllKline()
        }
    }, [time,symbol])

    useEffect(() => {
        if (update) {
            candlestickSeries.current.update(update)
        }

    }, [update])

    const gettingDataKline = () => {
        webSoсket.current.onmessage = elem => {
            const data = JSON.parse(elem.data).k
            const candle = {
                time: data.t / 1000,
                open: Number(data.o),
                high: Number(data.h),
                low: Number(data.l),
                close: Number(data.c)
            }
            candlestickSeries.current.update(candle)
        }
    }

    async function fetchAllKline(){
        if (symbol) {
            console.log(time)
            const candleData = await PostService.getKlineData(time, symbol.name)
            setAllCandle(changingCandleFormat(candleData))
        }
    }
    function changingCandleFormat(data) {
        const changeCandle = data.map(elem => {
            return {time: elem[0] / 1000, open: Number(elem[1]), high: Number(elem[2]), low: Number(elem[3]), close: Number(elem[4])}
        })
        return changeCandle
    }
    useEffect(() => {
        if (symbol) {
            const chart = createChart(document.getElementById('chart'), chartProperties)
            candlestickSeries.current = chart.addCandlestickSeries(symbol.postForm)
            chart.applyOptions({
                crosshair: {mode: CrosshairMode.Normal},
                timeScale: {timeVisible: true, secondsVisible: false},

            })
            candlestickSeries.current.setData(allCandle)

            return () => chart.remove()
        }
    },[allCandle])

    return (
        <div id="chart">
            <div className="lw-attribution">
                <div className="lw-attribution__time">
                    <h1>{symbol.name?.toUpperCase()}</h1>
                    <button
                        onClick={e => updateTimeInterval(e.target.value)}
                        className={time === "5m" ? "lw-attribution__interval lw-attribution__interval_active" : "lw-attribution__interval"}
                        value="5m">5M</button>
                    <button
                        onClick={e => updateTimeInterval(e.target.value)}
                        className={time === "15m" ? "lw-attribution__interval lw-attribution__interval_active" : "lw-attribution__interval"}
                        value="15m">15M</button>
                    <button
                        onClick={e => updateTimeInterval(e.target.value)}
                        className={time === "1h" ? "lw-attribution__interval lw-attribution__interval_active" : "lw-attribution__interval"}
                        value="1h">1h</button>
                    <button
                        onClick={e => updateTimeInterval(e.target.value)}
                        className={time === "1d" ? "lw-attribution__interval lw-attribution__interval_active" : "lw-attribution__interval"}
                        value="1d">1D</button>
                </div>
            </div>
        </div>
    );
};

export default CandlestickHart;
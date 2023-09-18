import './style/App.css'
import {useEffect, useMemo, useRef, useState} from "react";
import PostService from "./API/PostService";
import CurrencySorting from "./sorting/CurrencySorting";
import PairList from "./components/PairList";
import Sidebar from "./components/Sidebar";

function App() {
    const [allPair, setAllPair] = useState([])
    const [selectedSort, setSelectedSort] = useState('')
    const [spot, setSpot] = useState('')
    const [activePair, setActivePair] = useState({})
    const [updateCandle, setUpdateCandle] = useState()
    const [timeInterval, setTimeInterval] = useState("5m")
    const socket = useRef(null)
    const searchOfName = (elem) => {
        return [...allPair].filter((elem) => elem.symbol.includes())
    }

    const updateTimeInterval = (value) => {
        setTimeInterval(value)
    }
    const updateActivePair = (symbol) => {
        setActivePair(symbol)
    }


     async function fetchAllPair(){
            const getPairs  = await  PostService.getByStatisticsAllPairFutures()
            setAllPair(CurrencySorting.sortedAllPair(getPairs))
            const indexPriceForm = String(getPairs[0].lastPrice).indexOf(".")
            const priceForm = indexPriceForm > 0 ? String(getPairs[0].lastPrice).slice(indexPriceForm + 1).length : 0
            setActivePair({name: getPairs[0].symbol.toLowerCase(), postForm: {priceFormat: {type: 'price', precision: priceForm, minMove: 1 / Math.pow(10, priceForm)}}})
        }
        const sortByColumns = (sort) => {
            if (selectedSort !== sort) {
                setAllPair([...allPair].sort((a, b) => a[sort] - b[sort]));
                setSelectedSort(sort)
            }
            if (sort === selectedSort){
                setAllPair([...allPair].sort((a, b) => b[sort] - a[sort]));
                setSelectedSort('')
            }
        }

        async function updateAllPair(newData) {
        setAllPair((prev)=> {
            const updateData = prev.map((el, index) => {
                for (let i = 0; i < newData.length; i++){
                    if (el.symbol === newData[i].s) {
                        return {...el, lastPrice: newData[i].c, priceChangePercent: newData[i].P, quoteVolume: newData[i].q}
                    }
                }
                return el
            })
            return CurrencySorting.sortedAllPair(updateData)
        })

        }

    useEffect(() => {
        fetchAllPair()
    }, []);


    useEffect(() => {
        if (activePair) {
            socket.current = new WebSocket(`wss://fstream.binance.com/stream?streams=!ticker@arr/${activePair.name}@kline_${timeInterval}`)
            socket.current.onmessage = (element) => {
                const jsonData = JSON.parse(element.data)
                if (jsonData.stream === '!ticker@arr') {
                    const dataAllPair = jsonData.data
                    updateAllPair(dataAllPair)
                }
                if (jsonData.stream === `${activePair.name}@kline_${timeInterval}`) {
                    const data = jsonData.data.k
                    const candle = {
                        time: data.t / 1000,
                        open: Number(data.o),
                        high: Number(data.h),
                        low: Number(data.l),
                        close: Number(data.c)
                    }
                    console.log(candle)
                    setUpdateCandle(candle)
                }
            }

            return () => {
                socket.current.close()
            }
        }
    }, [activePair, timeInterval])

  return (
    <div className="App">
        <Sidebar
            value={selectedSort}
            pairList={allPair}
            onChange={sortByColumns}
            activePair={activePair}
            updateActivePair={updateActivePair}
            updateCandle={updateCandle}
            updateTimeInterval={updateTimeInterval}
            timeInterval={timeInterval}
        />
    </div>
  );
}

export default App;

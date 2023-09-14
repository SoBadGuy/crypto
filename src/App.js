import './style/App.css'
import {useEffect, useMemo, useState} from "react";
import PostService from "./API/PostService";
import CurrencySorting from "./sorting/CurrencySorting";
import PairList from "./components/PairList";
import Sidebar from "./components/Sidebar";

function App() {
    const [allPair, setAllPair] = useState([])
    const [selectedSort, setSelectedSort] = useState('')

    const searchOfName = (elem) => {
        console.log(elem)
        console.log("ОТРИСОВКА ПОИСКА")
        return [...allPair].filter((elem) => elem.symbol.includes())
    }


     async function fetchAllPair(){
            const getPairs  = await  PostService.getByStatisticsAllPairFutures()
            setAllPair(CurrencySorting.sortedAllPair(getPairs))
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

        function updateAllPair(newData) {
            const updateData = allPair.map((el, index) => {
                for (let i = 0; i < newData.length; i++){
                    if (el.symbol === newData[i].s) {
                        return {...el, lastPrice: newData[i].c, priceChangePercent: newData[i].P, quoteVolume: newData[i].q}
                    }
                }
                return el
            })

            return setAllPair(CurrencySorting.sortedAllPair(updateData))
        }

    useEffect(() => {
        fetchAllPair()
        console.log("Вызов эфекта")
    }, []);


    useEffect(() => {
        const socket = new WebSocket('wss://fstream.binance.com/ws/!ticker@arr')
        socket.onmessage = (element) => {
            const dataAllPair = JSON.parse(element.data)
            updateAllPair(dataAllPair)
        }

        return () => {
            socket.close()
        }
    },)


  return (
    <div className="App">
        <Sidebar
            value={selectedSort}
            pairList={allPair}
            onChange={sortByColumns}
        />
    </div>
  );
}

export default App;

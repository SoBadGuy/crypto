import {useEffect, useState} from "react";


export const useSorting = (sortingTradingPair: (tradingPair: any[]) => void, dataToSort: any[], searchByInput?: string, sortingType?: {type: string, sortingMethod: string}) => {
    // const [sortingDirection, setSortingDirection] = useState('as')
    const [localStorageBookMark, setLocalStorageBookMark] = useState([])
    const sortingOfBookmark = () => {
        if (sortingType?.type === 'bookmark') {
            return dataToSort.map(el => {
                for (let i = 0; i < localStorageBookMark.length + 1; i++) {
                    if (el.symbol === localStorageBookMark[i]) {
                        return {...el, count: 2}
                    }
                }
                return {...el, count: 1}
            })
        }
    }


    useEffect(() => {
        if (sortingType?.type) {
                setLocalStorageBookMark(JSON.parse(localStorage.getItem('bookmark')!))
            if (sortingType.type === 'symbol') {
                if (sortingType.sortingMethod === 'ask') {
                    sortingTradingPair(dataToSort.sort((a, b) => a[sortingType.type] > b[sortingType.type] ? 1 : -1));
                }
                if (sortingType.sortingMethod === 'desk') {
                    sortingTradingPair(dataToSort.sort((a, b) => a[sortingType.type] < b[sortingType.type] ? 1 : -1));
                }
            }
             if (sortingType.type === 'lastPrice' || sortingType.type === 'priceChangePercent' || sortingType.type === 'quoteVolume') {
                 if (sortingType.sortingMethod === 'ask') {
                     sortingTradingPair(dataToSort.sort((a, b) => a[sortingType.type] - b[sortingType.type]));
                 }
                 if (sortingType.sortingMethod === 'desk') {
                     sortingTradingPair(dataToSort.sort((a, b) => b[sortingType.type] - a[sortingType.type]));
                 }
             }
        }
    }, [sortingType]);

    useEffect(() => {
        if (sortingType?.type === 'bookmark') {
            console.log("Вызов эффекта букмарка")
            const response = sortingOfBookmark()
            if (response) {
                sortingTradingPair(response.sort((a, b) => b.count - a.count))
            }
        }
    }, [localStorageBookMark]);

    if (searchByInput) {
        return  dataToSort.filter((pair) => pair.symbol.toLowerCase().includes(searchByInput.toLowerCase()))
    }
}
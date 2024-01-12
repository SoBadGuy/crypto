import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useWebSocket} from "../hooks/useWebSocket";
import {updateActiveTradingPair} from "../store/feauters/AddTradingPairSlice";
import {GrBookmark} from "react-icons/gr";
import {FcBookmark} from "react-icons/fc";
import {useSorting} from "../hooks/useSorting";
interface IListPair {
    inputValue: string
    sortingType: {type: string, sortingMethod: string}
}
const ListPairs:FC<IListPair> = ({inputValue, sortingType}) => {
    const dispatch = useAppDispatch()
    const snapshotTradingPairs = useAppSelector(state => state.tradingPairs.pair)
    const activeTradingPair = useAppSelector(state => state.tradingPairs.activeTradingPair)
    const getRequestStatus = useAppSelector(state => state.tradingPairs.status)
    const [tradingPairs, setTradingPairs] = useState<any[]>([])
    const [bookmark, setBookmark] = useState([''])
    const getSortingTradingPair = useSorting((allPair)=> setTradingPairs(allPair), tradingPairs, inputValue, sortingType)
    const pairs = getSortingTradingPair ?? tradingPairs
    const pairConversion = (newData: any[], oldData: any[]) => {
        return  oldData.map((el: any) => {
            for (let item of newData) {
                if (el.symbol === item.s) {
                    const price = item.c.replace(/0*$/,"");
                    return {...el, lastPrice: price, priceChangePercent: item.P, quoteVolume: item.q}
                }
            }
            return el
        })
    }
    const formattingVolume = (volume: number) => {
        if (volume < 1000000) {
            return `${Math.round(volume/1000)}K`
        }
        if (volume >= 1000000 && volume < 1000000000) {
            return `${Math.round(volume/1000000)}M`
        }
        if (volume >= 1000000000) {
            return `${Math.round(volume/1000000000)}B`
        }
    }
    const addBookMark = (e: any, elem: string) => {
        e.stopPropagation()
        setBookmark((e)  => [...e, elem])
    }
    const deleteBookMark = (e: any, elem: string) => {
        e.stopPropagation()
        setBookmark((el) => el.filter(symbol => symbol !== elem))
    }

    useWebSocket((data: any) => {
        setTradingPairs((prev) => pairConversion(data, prev))
    }, `!ticker@arr`)

    useEffect(() => {
        setTradingPairs(snapshotTradingPairs)
    }, [snapshotTradingPairs]);

    useEffect(() => {
        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark')!)
        if (getLocalStorage) {
            setBookmark(getLocalStorage)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('bookmark', JSON.stringify(bookmark))
    }, [bookmark]);
    const response = () => {
        if (getRequestStatus === 'error') {
            return (
                <div className="trade-list__loader">Возникла ошибка, перезагрузите страницу</div>
            )
        }

        if (getRequestStatus === null) {
            return (
                <div className="trade-list__loader">Идет загрузка...</div>
            )
        }
        if (getRequestStatus === 'success') {
            if (pairs.length > 0) {
                return (
                    <div className="trade-list__container">
                        {pairs.map((el, index) =>
                            <div
                                key={el.symbol}
                                className={activeTradingPair === el.symbol ? 'trade-list__box trade-list__box_active' : 'trade-list__box' }
                                onClick={() => dispatch(updateActiveTradingPair(el.symbol))}
                            >
                                <div
                                    className="trade-list__item"
                                >{bookmark.indexOf(el.symbol) > 0
                                    ? <FcBookmark onClick={(e) => deleteBookMark(e, el.symbol)}/>
                                    : <GrBookmark onClick={(e) => addBookMark(e, el.symbol)}/>}
                                </div>
                                <div className="trade-list__item trade-list__name">{el.symbol}</div>
                                <div className="trade-list__item trade-list__lastPrice">{el.lastPrice}</div>
                                <div
                                    className={el.priceChangePercent < 0 ? 'trade-list__item trade-list__priceChangePercent_min' :'trade-list__item trade-list__priceChangePercent'}
                                >
                                    {Number(el.priceChangePercent).toFixed(2)}
                                </div>
                                <div className="trade-list__item trade-list__quoteVolume">{formattingVolume(el.quoteVolume)}</div>
                            </div>
                        )}
                    </div>)}
            if (pairs.length === 0 && inputValue) {
                return (
                    <div className="trade-list__loader">Монеты не найдены!</div>
                )
            }
        }
    }
    return (
    <div className="trade-list">
            {response()}
    </div>
    );
};

export default ListPairs;
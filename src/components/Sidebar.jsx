import React, {useMemo, useState} from 'react';
import PairList from "./PairList";
import SortButton from "./SortButton";
import {createChart} from "lightweight-charts";
import CandlestickHart from "./chart/CandlestickСhart";

const Sidebar = ({pairList, onChange, value, activePair, updateActivePair, updateCandle,updateTimeInterval, timeInterval}) => {
    const [selectionOfQuotes, setSelectionOfQuotes] = useState({activeBtn: "futures"})
    const [searchInput, setSearchInput] =useState('')
    const searchOfName = useMemo(() => {
        if (searchInput) {
            return [...pairList].filter((elem) => elem.symbol.toLowerCase().includes(searchInput.toLowerCase()))
        }
        return pairList
    }, [searchInput, pairList])
    return (
        <section className="coin-list">
            <div className="coin-list__block-list">
                <div className="coin_list__description">
                    <div className="coin-list__header">
                        <p className="coin-list__text">Список торговых пар</p>
                    </div>
                    <div className="coin-list__contracts">
                        <button
                            onClick={() => setSelectionOfQuotes({activeBtn: "futures"})}
                            className={selectionOfQuotes.activeBtn === "futures"
                                ? "coin-list__btn coin-list__btn_active"
                                : "coin-list__btn"
                            }
                        >
                            Фьючерс
                        </button>
                        <button
                            disabled
                            onClick={() => setSelectionOfQuotes({activeBtn: "spot"})}
                            className={selectionOfQuotes.activeBtn === "spot"
                                ? "coin-list__btn coin-list__btn_active"
                                : "coin-list__btn"
                            }
                        >
                            Спот
                        </button>
                    </div>
                    <div className="coin-list__searchOfPair">
                        <input
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            placeholder="Поиск по названию...."
                            className="coin-list__search-input"
                            type="text"
                        />
                    </div>
                    <SortButton
                        onChange={onChange}
                        sortButton={[
                            {name: "Интсрумент", value: "symbol"},
                            {name: "Цена", value: "lastPrice"},
                            {name: "%", value: "priceChangePercent"},
                            {name: "Объем", value: "quoteVolume"},
                        ]}
                    />
                </div>
                <PairList
                    updateActivePair={updateActivePair}
                    activePair={activePair}
                    pairList={searchOfName}/>
            </div>
            <div className="coin-list__candlestick-chart">
                <CandlestickHart time={timeInterval} updateTimeInterval={updateTimeInterval} update={updateCandle} symbol={activePair} chartProperties={{ height: 500}}/>
            </div>
        </section>
    );
};

export default Sidebar;
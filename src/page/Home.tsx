import React, {FC, useState} from "react";
import {RiMenuUnfoldLine} from "react-icons/ri";
import {IoMdClose} from "react-icons/io";
import InputSearchByName from "../components/UI/InputSearchByName";
import SortList from "../components/UI/SortList";
import {GrBookmark} from "react-icons/gr";
import CandlestickChart from "../components/CandlestickChart";
import ListPair from "../components/ListPair";



const Home: FC = () => {
    const [inputValue, setInputValue] = useState("")
    const [sortingType, setSortingType] = useState({type: "", sortingMethod: "ask"})
    const [isOpenListPair , setIsOpenListPair] = useState(false)
    const switchMenuTradingPair = () => {
        if (isOpenListPair) {
            setIsOpenListPair(!isOpenListPair)
        }
    }

    const sortingSelection = (value: string) => {
        if (sortingType.sortingMethod === "ask") {
            setSortingType({type: value, sortingMethod: "desk"})
        }
        if (sortingType.sortingMethod === "desk") {
            setSortingType({type: value, sortingMethod: "ask"})
        }
    }
    return (
        <>
            <section className="home">
                <div className="container home__container">
                    <div className="home__box">
                        <RiMenuUnfoldLine
                            size="35px"
                            className="home__open-tradingMenu"
                            onClick={() => setIsOpenListPair(!isOpenListPair)}/>
                        <div className={isOpenListPair ? "trading-menu trading-menu-mini": "trading-menu"}>
                            <div className="trading-menu__title">
                                Список торговых пар
                                <IoMdClose 
                                    size="35px" 
                                    className="trading-menu-mini__close" 
                                    onClick={() => setIsOpenListPair(!isOpenListPair)}/>
                            </div>
                            <div className="trading-menu__selection-markets">
                                <button className="trading-menu__btn-market trading-menu__btn-market_active">Фьючерс</button>
                                <button className="trading-menu__btn-market" disabled>Тут будет Спот</button>
                            </div>
                            <div className="trading-menu__search">
                                <InputSearchByName
                                    onChange={(e)=> setInputValue(e.target.value)}
                                    value={inputValue}
                                />
                            </div>
                            <SortList
                                sortingSelection={sortingSelection}
                                sortingElements={[
                                    {name: <GrBookmark/>, value: "bookmark"},
                                    {name: "Инструмент", value: "symbol"},
                                    {name: "Цена", value: "lastPrice"},
                                    {name: "%", value: "priceChangePercent"},
                                    {name: "Объем", value: "quoteVolume"},
                                ]}
                            />
                            <ListPair
                                switchMenuTradingPair={switchMenuTradingPair}
                                inputValue={inputValue}
                                sortingType={sortingType}
                            />
                        </div>
                        <CandlestickChart/>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div className="container">
                    <div className="footer__box">

                    </div>
                </div>
            </footer>
        </>
    );
};

export default Home;
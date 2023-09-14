import React from 'react';

const PairList = ({pairList}) => {

    return (
        <div>
        {pairList.map(prev => (
                <div
                    key={prev.symbol}
                    className="coin-list__pair"
                >
                    <span className="coin-list__description coin-list__description_symbol">{prev.symbol}</span>
                    <span className="coin-list__description coin-list__description_price">{prev.lastPrice}</span>
                    <span className={prev.priceChangePercent >= 0 ? "coin-list__description coin-list__description_price_max" : "coin-list__description coin-list__description_price_min"}>{prev.priceChangePercent}</span>
                    <span className="coin-list__description coin-list__description_volue">{prev.FixQuoteVolume}</span>
                </div>
            ))}
        </div>
    );
};

export default PairList;
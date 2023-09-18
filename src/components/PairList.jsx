import React from 'react';

const PairList = ({pairList, activePair, updateActivePair}) => {
    function priceFormat(num){
        const indexPriceForm = String(num).indexOf(".")
        const priceForm = indexPriceForm > 0 ? String(num).slice(indexPriceForm + 1).length : 0
        return priceForm
    }

    return (
        <div>
        {pairList.map(prev => (
                <div
                    key={prev.symbol}
                    onClick={() => updateActivePair({name: prev.symbol.toLowerCase(), postForm: {priceFormat: {type: 'price', precision: priceFormat(prev.lastPrice), minMove: 1 / Math.pow(10, priceFormat(prev.lastPrice))}}})}
                    className={activePair.name === prev.symbol.toLowerCase()
                        ? "coin-list__pair coin-list__pair_active"
                        : "coin-list__pair"}
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
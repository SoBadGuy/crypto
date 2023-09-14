export default class CurrencySorting {
    static sortedAllPair(pair) {
        const sortName = pair.filter((elem) => elem.symbol.slice(-4) === "USDT")
        const  sortPrice = sortName.map(elem => {
            const priceChangePercent = parseFloat(elem.priceChangePercent).toFixed(2)
            let FixQuoteVolume
            if (elem.quoteVolume < 1000000) {
                FixQuoteVolume =  `${Math.round(elem.quoteVolume / 1000)}К`
            }
            if (elem.quoteVolume >= 1000000 && elem.quoteVolume < 1000000000) {
                FixQuoteVolume =  `${Math.round(elem.quoteVolume / 1000000)}M`
            }
            if (elem.quoteVolume >= 1000000000) {
                FixQuoteVolume =  `${Math.round(elem.quoteVolume / 1000000000)}B`
            }

            const container = {...elem,  FixQuoteVolume}
            return container
        })
        return sortPrice
    }


}
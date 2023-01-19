export interface CoinsResult {
    coins: CoinResult[]
}

export interface CoinResult {
    id: string,
    icon: string,
    name: string,
    symbol: string,
    price: number,
    volume: number,
    marketCap: number,
    priceChange1d: number,
    priceChange1h: number,
    priceChange1w: number,
    websiteUrl: string
}
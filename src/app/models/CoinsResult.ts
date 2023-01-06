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
    websiteUrl: string
}
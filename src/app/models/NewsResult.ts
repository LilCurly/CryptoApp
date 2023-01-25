export interface NewsWrapperResult {
  news: NewsResult[];
}

export interface NewsResult {
  feedDate: number;
  title: string;
  description: string;
  imgUrl: string;
  link: string;
  relatedCoins: string[];
  searchKeyWords: string[];
}

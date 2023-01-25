import { createFeature, createReducer, on } from '@ngrx/store';
import { CoinResult } from 'src/app/models/CoinsResult';
import { NewsResult } from 'src/app/models/NewsResult';
import {
  CoinsApiActions,
  CoinsModalFilterActions,
  CoinsPageActions,
} from './coins.actions';

interface CoinsState {
  coins: CoinResult[];
  sortedCoins: CoinResult[];
  news: NewsResult[];
  loading: boolean;
  selectedTab: number;
  selectedFilterByPrice: string;
}

const initialState: CoinsState = {
  coins: [],
  sortedCoins: [],
  news: [],
  loading: false,
  selectedTab: 0,
  selectedFilterByPrice: 'normal',
};

export const coinsFeature = createFeature({
  name: 'coins',
  reducer: createReducer(
    initialState,
    on(CoinsApiActions.loadCoinsList, (state) => ({ ...state, loading: true })),
    on(CoinsApiActions.retrievedCoinsListSuccess, (state, { coins }) => ({
      ...state,
      coins: [...coins],
      sortedCoins: [...coins],
      loading: false,
    })),
    on(CoinsApiActions.retrievedNewsList, (state, { news }) => ({
      ...state,
      news: [...news]
    })),
    on(CoinsPageActions.updateSelectedTab, (state, { selectedTab }) => ({
      ...state,
      selectedTab,
      sortedCoins:
        state.selectedTab == selectedTab
          ? [...state.coins]
          : [...sortCoins(state.coins, selectedTab, state.selectedFilterByPrice)],
    })),
    on(
      CoinsModalFilterActions.updateFilterByPrice,
      (state, { selectedFilterByPrice }) => ({
        ...state,
        selectedFilterByPrice,
        sortedCoins: [...sortCoins(state.coins, state.selectedTab, selectedFilterByPrice)]
      })
    )
  ),
});

const sortCoins = (coins: CoinResult[], selectedTab: number, selectedFilterByPrice: string) => {
  var mutArray = [...coins];
  var result: CoinResult[]
  if (selectedTab == 0) {
    result = coins;
  } else if (selectedTab == 4) {
    result = mutArray.sort((a, b) => {
      return a.marketCap - b.marketCap;
    });
  } else {
    result = mutArray.filter((el) => {
      if (selectedTab == 1) {
        return el.priceChange1d > 0;
      } else if (selectedTab == 2) {
        return el.priceChange1d < 0;
      }
      return el;
    });
  }
  return sortCoinsByPrice(result, selectedFilterByPrice)
};

const sortCoinsByPrice = (coins: CoinResult[], selectedFilterByPrice: string) => {
  var mutArray = [...coins]
  if (selectedFilterByPrice == 'normal') {
    return mutArray
  } else if (selectedFilterByPrice == 'ascending') {
    return mutArray.sort((a, b) => {
      return a.priceChange1d - b.priceChange1d
    })
  } else {
    return mutArray.sort((a, b) => {
      return b.priceChange1d - a.priceChange1d
    })
  }
}

export const {
  name,
  reducer,
  selectCoinsState,
  selectCoins,
  selectSortedCoins,
  selectLoading,
  selectSelectedTab,
  selectSelectedFilterByPrice,
  selectNews,
} = coinsFeature;

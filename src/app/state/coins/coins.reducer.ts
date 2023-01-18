import { createFeature, createReducer, on } from '@ngrx/store';
import { CoinResult } from 'src/app/models/CoinsResult';
import { CoinsApiActions, CoinsPageActions } from './coins.actions';

interface CoinsState {
  coins: CoinResult[];
  sortedCoins: CoinResult[];
  loading: boolean;
  selectedTab: number;
}

const initialState: CoinsState = {
  coins: [],
  sortedCoins: [],
  loading: false,
  selectedTab: 0,
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
    on(CoinsPageActions.updateSelectedTab, (state, { selectedTab }) => ({
      ...state,
      selectedTab,
      sortedCoins:
        state.selectedTab == selectedTab
          ? [...state.coins]
          : [...sortCoins(state.coins, selectedTab)],
    }))
  ),
});

const sortCoins = (coins: CoinResult[], selectedTab: number) => {
  var mutArray = [...coins];
  if (selectedTab == 0) {
    return coins;
  } else if (selectedTab == 4) {
    return mutArray.sort((a, b) => {
      return a.marketCap - b.marketCap;
    });
  } else {
    return mutArray.filter((el) => {
      if (selectedTab == 1) {
        return el.priceChange1d > 0;
      } else if (selectedTab == 2) {
        return el.priceChange1d < 0;
      }
      return el;
    });
  }
};

export const {
  name,
  reducer,
  selectCoinsState,
  selectCoins,
  selectSortedCoins,
  selectLoading,
  selectSelectedTab,
} = coinsFeature;

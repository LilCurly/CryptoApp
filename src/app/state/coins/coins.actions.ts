import { createActionGroup, props } from '@ngrx/store';
import { CoinResult } from 'src/app/models/CoinsResult';
import { NewsResult } from 'src/app/models/NewsResult';

export const CoinsApiActions = createActionGroup({
  source: 'Coins API',
  events: {
    'Retrieved Coins List Success': props<{ coins: CoinResult[] }>(),
    'Load Coins List': props,
    'Retrieved News List': props<{ news: NewsResult[] }>(),
  },
});

export const CoinsPageActions = createActionGroup({
  source: 'Coins Page',
  events: {
    'Update Selected Tab': props<{ selectedTab: number }>(),
  },
});

export const CoinsModalFilterActions = createActionGroup({
  source: 'Coins Modal Filter',
  events: {
    'Update Filter By Price': props<{ selectedFilterByPrice: string }>(),
  },
});

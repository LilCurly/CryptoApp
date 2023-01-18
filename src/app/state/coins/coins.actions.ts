import { createActionGroup, props } from '@ngrx/store';
import { CoinResult } from 'src/app/models/CoinsResult';

export const CoinsApiActions = createActionGroup({
  source: 'Coins API',
  events: {
    'Retrieved Coins List Success': props<{ coins: CoinResult[] }>(),
    'Load Coins List': props
  },
});

export const CoinsPageActions = createActionGroup({
    source: 'Coins Page',
    events: {
        'Update Selected Tab': props<{ selectedTab: number }>()
    }
})

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoinsService } from './api/coins.service';
import { CoinsApiActions } from './state/coins/coins.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private coinsService: CoinsService, private store: Store) {
    this.coinsService.getNews().subscribe((result) => {
      this.store.dispatch(
        CoinsApiActions.retrievedNewsList({ news: result.news })
      );
    });
  }
}

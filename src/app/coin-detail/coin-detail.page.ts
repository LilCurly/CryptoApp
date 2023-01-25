import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoinResult } from '../models/CoinsResult';
import { NewsResult } from '../models/NewsResult';
import { selectNews } from '../state/coins/coins.reducer';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.page.html',
  styleUrls: ['./coin-detail.page.scss'],
})
export class CoinDetailPage implements OnInit {
  coin!: CoinResult;
  news: NewsResult[] | null = null;

  constructor(private router: Router, private store: Store) {
    this.coin = this.router.getCurrentNavigation()!.extras!.state!['coin'];
    this.store.select(selectNews).subscribe((news) => {
      this.news = news.filter((news) => {
        return news.description.toLowerCase().includes(this.coin.name.toLowerCase()) ||
          news.description.toLowerCase().includes(this.coin.symbol.toLowerCase()) ||
          news.title.toLowerCase().includes(this.coin.name.toLowerCase()) ||
          news.title.toLowerCase().includes(this.coin.symbol.toLowerCase()) ||
          news.relatedCoins.includes(this.coin.name.toLowerCase()) ||
          news.relatedCoins.includes(this.coin.symbol.toLowerCase()) ||
          news.searchKeyWords.includes(this.coin.name.toLowerCase()) ||
          news.searchKeyWords.includes(this.coin.symbol.toLowerCase());
      });
      console.log(this.news)
    });
  }

  ngOnInit() {}
}

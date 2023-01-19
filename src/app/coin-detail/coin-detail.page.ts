import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoinResult } from '../models/CoinsResult';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.page.html',
  styleUrls: ['./coin-detail.page.scss'],
})
export class CoinDetailPage implements OnInit {
  coin!: CoinResult;

  constructor(private router: Router) {
    this.coin = this.router.getCurrentNavigation()!.extras!.state!['coin'];
  }

  ngOnInit() {}
}

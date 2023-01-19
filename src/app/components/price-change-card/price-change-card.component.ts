import { Component, Input, OnInit } from '@angular/core';
import { CoinResult } from 'src/app/models/CoinsResult';

@Component({
  selector: 'app-price-change-card',
  templateUrl: './price-change-card.component.html',
  styleUrls: ['./price-change-card.component.scss'],
})
export class PriceChangeCardComponent implements OnInit {
  
  @Input() priceChange!: number
  @Input() priceChangeInterval!: string
  @Input() width!: number

  constructor() { 
  }

  ngOnInit() {
  }

}

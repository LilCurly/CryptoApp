import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-price-change-container',
  templateUrl: './price-change-container.component.html',
  styleUrls: ['./price-change-container.component.scss'],
})
export class PriceChangeContainerComponent implements OnInit {
  @Input() items!: {
    priceChangeInterval: string;
    priceChangePercent: number;
  }[];

  platformWidth: number | null = null;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      this.platformWidth = platform.width();
    });
  }

  ngOnInit() {}
}

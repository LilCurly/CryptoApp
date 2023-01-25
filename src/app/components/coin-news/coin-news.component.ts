import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-news',
  templateUrl: './coin-news.component.html',
  styleUrls: ['./coin-news.component.scss'],
})
export class CoinNewsComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imgUrl!: string;
  @Input() linkUrl!: string;

  constructor() {}

  ngOnInit() {}
}

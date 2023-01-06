import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input('title') title: String = ""
  @Input('description') description: String = ""
  @Input('imageUrl') imageUrl: String = ""
  @Input('change') change: Number = 0

  constructor() { }

  ngOnInit() {}

}

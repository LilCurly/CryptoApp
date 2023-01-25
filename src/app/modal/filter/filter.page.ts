import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoinsModalFilterActions } from 'src/app/state/coins/coins.actions';
import { selectSelectedFilterByPrice } from 'src/app/state/coins/coins.reducer';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  selectedFilterByPrice$ = this.store.select(selectSelectedFilterByPrice)

  constructor(private store: Store) { }

  ngOnInit() {
  }

  didChangeFilterByPrice(event: Event) {
    const customEvent = event as CustomEvent
    this.store.dispatch(CoinsModalFilterActions.updateFilterByPrice({ selectedFilterByPrice: customEvent.detail.value }))
  }

}

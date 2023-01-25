import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { PriceChangeCardComponent } from './price-change-card/price-change-card.component';
import { PriceChangeContainerComponent } from './price-change-container/price-change-container.component';
import { CoinNewsComponent } from './coin-news/coin-news.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [HeaderProfileComponent, CardComponent, HeaderComponent, HeaderProfileComponent, NoteCardComponent, PriceChangeCardComponent, PriceChangeContainerComponent, CoinNewsComponent],
  exports: [HeaderProfileComponent, CardComponent, HeaderComponent, HeaderProfileComponent, NoteCardComponent, PriceChangeCardComponent, PriceChangeContainerComponent, CoinNewsComponent],
})
export class ComponentsModule {}

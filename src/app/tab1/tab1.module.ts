import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CardComponentModule } from '../components/card/card.module';
import { HeaderProfileComponentModule } from '../components/header-profile/header-profile.module';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { SwiperModule } from 'swiper/angular'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HeaderProfileComponentModule,
    CardComponentModule,
    ScrollingModule,
    SwiperModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}

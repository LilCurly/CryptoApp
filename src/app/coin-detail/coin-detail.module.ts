import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoinDetailPageRoutingModule } from './coin-detail-routing.module';

import { CoinDetailPage } from './coin-detail.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoinDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CoinDetailPage]
})
export class CoinDetailPageModule {}

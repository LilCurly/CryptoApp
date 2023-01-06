import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderProfileComponent } from './header-profile.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [HeaderProfileComponent],
  exports: [HeaderProfileComponent],
})
export class HeaderProfileComponentModule {}

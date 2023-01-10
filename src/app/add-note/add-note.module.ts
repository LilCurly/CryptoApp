import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNotePageRoutingModule } from './add-note-routing.module';

import { AddNotePage } from './add-note.page';
import { HeaderComponentModule } from '../components/header/header.module';
import { HeaderProfileComponentModule } from '../components/header-profile/header-profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNotePageRoutingModule,
    HeaderComponentModule,
    HeaderProfileComponentModule
  ],
  declarations: [AddNotePage]
})
export class AddNotePageModule {}

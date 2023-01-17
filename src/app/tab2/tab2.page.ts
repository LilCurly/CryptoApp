import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotesService } from '../api/notes.service';
import { NotesApiActions } from '../state/notes/notes.actions';
import { selectNotes } from '../state/notes/notes.reducer';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  notes$ = this.store.select(selectNotes);

  constructor(private notesService: NotesService, private store: Store) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes = async () => {
    this.notesService.getNotes().then((result) => {
      if (result != null) {
        this.store.dispatch(
          NotesApiActions.retrievedNotesListSuccess({ notes: result })
        );
      }
    });
  };
}

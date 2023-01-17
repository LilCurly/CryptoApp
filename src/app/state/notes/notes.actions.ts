import { createAction, createActionGroup, props } from '@ngrx/store';
import { Note } from 'src/app/models/Note';

export const NotesPageActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Note': props<Note>(),
  },
});

export const NotesApiActions = createActionGroup({
  source: 'Notes API',
  events: {
    'Retrieved Notes List Success': props<{ notes: Note[] }>(),
    'Load Notes List': props
  },
});

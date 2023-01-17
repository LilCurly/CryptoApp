import { createFeature, createReducer, on } from '@ngrx/store';
import { Note } from 'src/app/models/Note';
import { NotesApiActions, NotesPageActions } from './notes.actions';

interface NotesState {
  notes: Note[];
  loading: boolean;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
};

export const notesFeature = createFeature({
  name: 'notes',
  reducer: createReducer(
    initialState,
    on(NotesApiActions.loadNotesList, (state) => ({ ...state, loading: true })),
    on(NotesApiActions.retrievedNotesListSuccess, (state, { notes }) => ({
      ...state,
      notes,
      loading: false
    })),
    on(NotesPageActions.addNote, (state, note) => ({
      ...state,
      notes: [...state.notes, note],
    }))
  ),
});

export const {
    name,
    reducer,
    selectNotesState,
    selectNotes,
    selectLoading,
} = notesFeature
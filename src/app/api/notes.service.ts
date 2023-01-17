import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private client!: SupabaseClient;

  constructor() {
    this.client = createClient(
      'https://siopkyvszafbqsqznnxb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpb3BreXZzemFmYnFzcXpubnhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMzNTQ5ODQsImV4cCI6MTk4ODkzMDk4NH0.5DbUuA4SK3gEjpSdppWO8dMD8si4Z7TAlpeZnIh-GuY'
    );
  }

  saveNote = async (note: Note) => {
    const { error } = await this.client.from('notes').insert(note);

    return error == null;
  };

  getNotes = async () => {
    const { data, error } = await this.client.from('notes').select<'*', Note>();

    if (error == null && data != null) {
      return data;
    }

    return null;
  };
}

import { Component, OnInit } from '@angular/core';
import { NotesService } from '../api/notes.service';
import { Note } from '../models/Note';
import { PhotoService } from '../service/photo-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  notes: Note[] | null = null;

  constructor(private notesService: NotesService, private photoService: PhotoService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes = async () => {
    const result = await this.notesService.getNotes();
    this.notes = result;
  };
}

import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { PhotoService } from 'src/app/service/photo-service.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() note!: Note;
  imgSrc: string | null = null;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    console.log(this.note.bannerPath);
    if (this.imgSrc == null) {
      this.fetchPhoto();
    }
  }

  fetchPhoto() {
    this.photoService.fetchPhoto(this.note.bannerPath).then((result) => {
      this.imgSrc = result;
    });
  }
}

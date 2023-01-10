import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { InputCustomEvent, IonImg, IonInput } from '@ionic/angular';
import { NotesService } from '../api/notes.service';
import { PhotoService } from '../service/photo-service.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  noteTitle: string | null | undefined = '';
  noteContent: string | null | undefined = '';
  noteBanner: Photo | undefined = undefined;
  canSubmit = () => {
    return (
      this.noteTitle != undefined &&
      this.noteTitle.length > 0 &&
      this.noteContent != undefined &&
      this.noteContent.length > 0 &&
      this.noteBanner != undefined
    );
  };

  @ViewChild('bannerImage') bannerImage!: IonImg;

  constructor(private notesService: NotesService, private photoService: PhotoService) {}

  ngOnInit() {}

  noteTitleDidChange(event: Event) {
    const inputEvent = event as InputCustomEvent;

    this.noteTitle = inputEvent.detail.value;
  }

  noteContentDidChange(event: Event) {
    const inputEvent = event as InputCustomEvent;

    this.noteContent = inputEvent.detail.value;
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    }).catch((err) => {
      console.log(err);
    });

    if (image != undefined) {
      console.log(image);
      this.noteBanner = image;
    }
  };

  saveNote = async () => {
    if (
      this.noteTitle != null &&
      this.noteContent != null &&
      this.noteBanner != null
    ) {
      const photoUri = await this.photoService.savePhoto(this.noteBanner)
      const success = await this.notesService.saveNote(
        this.noteTitle,
        this.noteContent,
        photoUri
      );
    }
  };
}

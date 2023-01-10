import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor() {}

  savePhoto = async (photo: Photo) => {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return savedFile.uri;
  }

  fetchPhoto = async (filePath: string) => {
    const file = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data
    })

    return `data:image/jpeg;base64,${file.data}`
  }

  private readAsBase64 = async (photo: Photo) => {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

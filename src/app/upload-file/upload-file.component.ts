import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  paths: File[] = []; 

  constructor(private storage: AngularFireStorage, private router: Router) {}

  uploadImages() {
    if (this.paths.length === 0) {
      console.error('No files selected.');
      return;
    }

    this.paths.forEach((path, index) => {
      const timestamp = new Date().getTime();
      const filePath = `files/${timestamp}_${path.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, path);

      

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          if (index === this.paths.length - 1) {
            this.router.navigate(['/gallery']);
          }
        })
      ).subscribe();



    });

   
    // this.router.navigate(['/gallery']);
  }

  upload(event: any) {
    console.log("upload clicked", this.paths)
    
    this.paths = Array.from(event.target.files);

  
  }
}

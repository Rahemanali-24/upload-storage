import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: string[] = [];
  error: string | null = null;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {
    this.fetchImages();
  }

  fetchImages() {
    const folderPath = 'files'; 
    const storageRef = this.storage.ref(folderPath);
    
    storageRef.listAll().subscribe(result => {
      result.items.forEach(item => {
        item.getDownloadURL().then(url => {
          this.images.push(url);
        });
      });
    }, error => {
      this.error = error.message;
    });
  }
}

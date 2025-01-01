import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  year: number = 2024;

  imageLists_2021: string[] = [
    "IMG_20211115_083912.jpg",
    "IMG-20210127-WA0003.jpg",
    "IMG-20210127-WA0004.jpg",
    "IMG-20210127-WA0005.jpg",
    "IMG-20210127-WA0005.jpg",
    "IMG-20210127-WA0005.jpg",
    "IMG-20210127-WA0005.jpg",
    "IMG-20210127-WA0005.jpg",
    "IMG-20210127-WA0005.jpg",
    "IMG-20210127-WA0005.jpg",
  ];

  imageLists_2022: string[] = [];
  imageLists_2023: string[] = [];
  imageLists_2024: string[] = [];

  imgLists: string[] = this.imageLists_2024;


  YearChange(event: any) {
    this.year = +event?.target.value;
    if (this.year === 2021) {
      this.imgLists = []; // Clear the list temporarily for animation
      setTimeout(() => this.imgLists = this.imageLists_2021, 200);
    } else if (this.year === 2022) {
      this.imgLists = [];
      setTimeout(() => this.imgLists = this.imageLists_2022, 200);
    } else if (this.year === 2023) {
      this.imgLists = [];
      setTimeout(() => this.imgLists = this.imageLists_2023, 200);
    } else if (this.year === 2024) {
      this.imgLists = [];
      setTimeout(() => this.imgLists = this.imageLists_2024, 0);
    }
  }

}

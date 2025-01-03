import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  constructor(private toastr:ToastrService){}

  year: number = 2021;

  imageLists_2021: string[] = [
    "IMG_20211115_083912.jpg",
    "IMG-20210127-WA0003.jpg",
    "IMG-20210127-WA0004.jpg",
    "IMG-20210127-WA0005.jpg",
  ];

  imageLists_2022: string[] = [];
  imageLists_2023: string[] = [];
  imageLists_2024: string[] = [];

  imgLists: string[] = this.imageLists_2021;


  YearChange(event: any) {
    this.year = +event?.target.value;
    this.imgLists = []; // Clear the image list before setting the new one

    setTimeout(() => {
      if (this.year === 2021) {
        this.imgLists = this.imageLists_2021;
      } else if (this.year === 2022) {
        this.imgLists = this.imageLists_2022;
      } else if (this.year === 2023) {
        this.imgLists = this.imageLists_2023;
      } else if (this.year === 2024) {
        this.imgLists = this.imageLists_2024;
      }

      // Check if there are no images for the selected year
      if (this.imgLists.length === 0) {
        this.toastr.error("Images not found!");
      }
    }, 200);
  }

}

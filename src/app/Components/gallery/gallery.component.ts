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

  year: number = 2025;

  imageLists_2021: string[] = [
    "IMG_20211115_083912.jpg",
    "IMG-20210127-WA0003.jpg",
    "IMG-20210127-WA0004.jpg",
    "IMG-20210127-WA0005.jpg",
  ];

  imageLists_2022: string[] = [];
  imageLists_2023: string[] = [];
  imageLists_2024: string[] = [];

  imageLists_2025: string[] = [
    "trophies.jpg",
    "p1.jpg",
    "p2.jpg",
    "2025_1.jpg", "2025_2.jpg", "2025_3.jpg", "2025_4.jpg", "2025_5.jpg", "2025_6.jpg", "2025_7.jpg","2025_8.jpg",
    "2025_9.jpg", "2025_10.jpg", "2025_11.jpg", "2025_12.jpg", "2025_13.jpg", "2025_14.jpg", "2025_15.jpg", "2025_16.jpg",
    "2025_17.jpg", "2025_18.jpg", "2025_19.jpg", "2025_20.jpg", "2025_21.jpg", "2025_22.jpg",
  ];

  imgLists: string[] = this.imageLists_2025;


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
      }else if (this.year === 2025) {
        this.imgLists = this.imageLists_2025;
      }

      // Check if there are no images for the selected year
      if (this.imgLists.length === 0) {
        this.toastr.error("Images not found!");
      }
    }, 200);
  }

  scrollLeft() {
    const btnsWrapper = document.querySelector('.btns-wrapper') as HTMLElement;
    if (btnsWrapper) {
      btnsWrapper.scrollBy({ left: -200, behavior: 'smooth' }); // Scroll 200px left
    }
  }

  scrollRight() {
    const btnsWrapper = document.querySelector('.btns-wrapper') as HTMLElement;
    if (btnsWrapper) {
      btnsWrapper.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll 200px right
    }
  }

}

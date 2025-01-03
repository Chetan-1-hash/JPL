import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule, FormsModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  urlList: string[] = [
    "redball",
    "wicket",
    "Cricket Ball",
  ];

  selectedVideo: string = '';

  isLoading: boolean = true;
  videoElement!: HTMLVideoElement;
  @ViewChild('progressVideo') progressVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const videoElement = this.progressVideo.nativeElement;
    // Ensure muted attribute is set explicitly
    videoElement.muted = true;
    videoElement.play().catch((error) => {
      console.error('Error playing video:', error);
    });
  }


  ngOnInit(): void {
    this.selectRandomVideo();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  selectRandomVideo() {
    const randomIndex = Math.floor(Math.random() * this.urlList.length);
    this.selectedVideo = this.urlList[randomIndex];
  }


}

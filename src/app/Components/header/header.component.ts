import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNavicon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectedOption: string = '';
  
  constructor(private router: Router) { }

  faNav = faNavicon;
  isOpened: boolean = false;

  @ViewChild('navrouter') navrouter!: ElementRef;

  openNav() {
    this.isOpened = !this.isOpened;
  }

  onSelection(event: Event) {
    this.selectedOption = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/'+this.selectedOption]);
  }



}

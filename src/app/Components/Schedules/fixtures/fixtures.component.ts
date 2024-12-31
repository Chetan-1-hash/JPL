import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Menfixtures, MenGroups, MensTeamNames } from './Men';
import { Womenfixtures, WomensTeamNames } from './Women';
import { Boysfixtures, BoysTeamNames } from './Boys';
import { Girlsfixtures, GirlsTeamNames } from './Girls';

@Component({
  selector: 'app-fixtures',
  imports: [CommonModule, FormsModule],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.css'
})
export class FixturesComponent {

  category: string = 'Men';
  Groups: string[][] = MenGroups; // Ensure type matches
  fixtures: { group: string; matches: { team1: string; team2: string; time: string }[] }[] = Menfixtures;

  CategoryChange(event: any): void {
    const selectedCategory = event?.target?.value;
    if (selectedCategory) {
      this.category = selectedCategory;
      switch (this.category) {
        case 'Men':
          this.Groups = MenGroups;
          this.fixtures = Menfixtures;
          break;
        case 'Women':
          this.Groups = []; // Women does not have groups
          this.fixtures = Womenfixtures;
          break;
        case 'Boys':
          this.Groups = []; // Boys does not have groups
          this.fixtures = Boysfixtures;
          break;
        case 'Girls':
          this.Groups = []; // Girls does not have groups
          this.fixtures = Girlsfixtures;
          break;
        default:
          console.warn('Unknown category selected');
      }
    }
  }

}

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

  category:string="Men";
  Groups:string[][]=MenGroups;

  fixtures:{team1:string, team2:string, time:string}[] = Menfixtures;


  CategoryChange(event:any){
    this.category = event?.target.value;
    if(this.category==="Men"){
      this.Groups=MenGroups;
      this.fixtures=Menfixtures;
    }
    else if(this.category==="Women"){
      // this.Groups=WomenGroups;
      this.fixtures=Womenfixtures;
    }
    else if(this.category==="Boys"){
      // this.Groups=BoysGroups;
      this.fixtures=Boysfixtures;
    }
    else if(this.category==="Girls"){
      // this.Groups=GirlsGroups;
      this.fixtures=Girlsfixtures;
    }
  }

}

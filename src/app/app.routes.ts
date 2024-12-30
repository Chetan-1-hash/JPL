import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { TeamGenerationComponent } from './Components/Schedules/team-generation/team-generation.component';
import { FixturesComponent } from './Components/Schedules/fixtures/fixtures.component';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"gallery", component:GalleryComponent},
    {path:"team", component:TeamGenerationComponent},
    {path:"fixtures", component:FixturesComponent},
    {path:"", redirectTo:'home', pathMatch:'full'},
    {path:"**", redirectTo:'home', pathMatch:'full'},
];

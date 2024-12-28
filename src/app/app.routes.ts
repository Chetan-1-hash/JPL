import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { TeamGenerationComponent } from './Components/team-generation/team-generation.component';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"gallery", component:GalleryComponent},
    {path:"team", component:TeamGenerationComponent},
    {path:"**", component:HomeComponent},
];

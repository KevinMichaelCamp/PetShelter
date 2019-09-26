import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'pets', component: PetsComponent },
  { path: 'pets/new', component: NewComponent },
  { path: 'pets/:id', component: ShowComponent },
  { path: 'pets/:id/edit', component: EditComponent },
  { path: '', pathMatch: 'full', redirectTo: '/pets' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

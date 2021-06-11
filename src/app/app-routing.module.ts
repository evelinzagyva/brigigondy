import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupLessonComponent } from '../app/components/group-lesson/group-lesson.component'
import { PrivateLessonComponent } from '../app/components/private-lesson/private-lesson.component'
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'csoportos-orak', component: GroupLessonComponent },
  { path: 'privat-orak', component: PrivateLessonComponent },
 // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

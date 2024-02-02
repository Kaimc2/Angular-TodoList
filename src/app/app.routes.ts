import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'todo', component: TodoComponent },
  { path: '*', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
];

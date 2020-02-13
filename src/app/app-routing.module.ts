import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";

const routes: Routes = [
  {
  path: 'todolist',
  component: TodoListComponent
}, {
  path: '',
  redirectTo: 'todolist',
  pathMatch: 'full'
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

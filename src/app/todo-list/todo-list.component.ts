import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todolist;
  public todoListForm;
  constructor(
      private _formBuilder: FormBuilder,
      private _socket: Socket
  ) {
    this.todoListForm = this._formBuilder.group({
          newTask: ''
        });

    this._socket.fromEvent("addTask").subscribe(
        task => {
          console.log(task);
          this.todolist.push(task);
        }
    );

    this._socket.fromEvent("deleteTask").subscribe(
        task => {
          const index = this.todolist.indexOf(task, 0);
          if (index > -1) {
            this.todolist.splice(index, 1);
          }
        }
    )

  }

  ngOnInit() {
    this._socket.connect();
    this.todolist = ['beurre', 'fromage', 'ketchup'];
  }

  deleteTask(task) {
    const index = this.todolist.indexOf(task, 0);
    if (index > -1) {
      this.todolist.splice(index, 1);
    }
    this._socket.emit('deleteTask', task);

  }

  addTask(newTask) {
    //call api to submit (socket ?)
    this.todolist.push(newTask);
    this._socket.emit('addTask', newTask);
  }
}

import { Component, OnInit } from '@angular/core';
import { todoService } from '../../services/todo.service';

import { ToDo } from '../../models/ToDo';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: ToDo[] | undefined;

  constructor(private todoService: todoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos: ToDo[]) => {
      this.todos = todos;
    });
  }

  addTodo(todo: ToDo) {
    this.todoService.addTodo(todo).subscribe((todo: ToDo) => {
      this.todos?.push(todo);
    });
  }

  deleteTodo(todo: ToDo) {
    this.todos = this.todos?.filter((t) => {
      t.id !== todo.id;
    });

    this.todoService.deleteTodo(todo).subscribe();
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { todoService } from '../../services/todo.service';

import { ToDo } from '../../models/ToDo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ToDo | undefined;
  @Output() deleteTodo: EventEmitter<ToDo> = new EventEmitter();

  constructor(private todoService: todoService) { }

  ngOnInit(): void {
  }

  // on Actions
  onToggle(todo: ToDo): void {
    // Toggle in UI
    todo.completed = !todo.completed;

    // Toggle in Server
    this.todoService.toggleCompleted(todo).subscribe((todo) => {
      console.log(todo);
    });
  }

  onDelete(todo: ToDo): void {
    this.deleteTodo.emit(todo);
  }

  // Dynamic Classes
  setClasses(): object {
    let classes: object = {
      todo: true,
      'is-complete': this.todo?.completed
    }

    return classes;
  }

}

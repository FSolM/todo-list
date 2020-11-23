import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ToDo } from '../models/ToDo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application-json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class todoService {
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  url_limit: string = '?_limit=5';

  constructor(private http: HttpClient) { }

  // Get ToDo's
  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.url}${this.url_limit}`);
  }

  // Toggle Completed
  toggleCompleted(todo: ToDo): Observable<any> {
    return this.http.put(`${this.url}/${todo.id}`, todo, httpOptions);
  }

  // Adds ToDo
  addTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.url, todo, httpOptions);
  }

  // Deletes ToDo
  deleteTodo(todo: ToDo): Observable<ToDo> {
    return this.http.delete<ToDo>(`${this.url}/${todo.id}`, httpOptions);
  }
}

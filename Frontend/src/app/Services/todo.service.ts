import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TodoRead } from '../Models/todo-read';
import { TodoWrite } from '../Models/todo-write';

const BASE_URL: string = 'https://localhost:7234/api/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<TodoRead[]> {
    return this.http.get<TodoRead[]>(BASE_URL);
  }
  getTodoById(id: Number): Observable<TodoRead> {
    return this.http.get<TodoRead>(`${BASE_URL}/${id}`);
  }
  postTodo(todo: TodoWrite) {
    return this.http.post(BASE_URL, todo);
  }
  putTodo(id: Number, todo: TodoWrite) {
    return this.http.put(`${BASE_URL}/${id}`, todo);
  }
  deleteTodo(id: Number) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}

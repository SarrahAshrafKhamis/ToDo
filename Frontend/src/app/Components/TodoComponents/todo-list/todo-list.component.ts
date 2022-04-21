import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoRead } from 'src/app/Models/todo-read';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input('todoList') todoList$!: Observable<TodoRead[]>;
  @Output() editTodoEvent: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() deleteTodoEvent: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() {}

  ngOnInit(): void {}

  editTodo(todoId: Number) {
    this.editTodoEvent.emit(todoId);
  }

  deleteTodo(todoId: Number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTodoEvent.emit(todoId);
      }
    });
  }

  mapColorToBadgeClass(color: String): String {
    let className = '';
    switch (color) {
      case 'red':
        className = 'badge bg-danger';
        break;
      case 'blue':
        className = 'badge bg-primary';
        break;
      case 'gray':
        className = 'badge bg-secondary';
        break;
      case 'green':
        className = 'badge bg-success';
        break;
      case 'orange':
        className = 'badge bg-warning text-dark';
        break;
      case 'black':
        className = 'badge bg-dark';
        break;
    }
    return className;
  }
}

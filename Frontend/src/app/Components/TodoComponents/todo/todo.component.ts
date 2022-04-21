import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoRead } from 'src/app/Models/todo-read';
import { TodoWrite } from 'src/app/Models/todo-write';
import { TodoService } from 'src/app/Services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(private service: TodoService) {}

  todoList$!: Observable<TodoRead[]>;
  editTodo!: TodoRead;
  editTodoId!: Number;

  ngOnInit(): void {
    this.reloadList();
  }

  deleteOne(id: Number) {
    this.service.deleteTodo(id).subscribe({
      next: () => this.reloadList(),
    });
  }

  edit(id: Number) {
    let todo!: TodoRead;
    this.service.getTodoById(id).subscribe({
      next: (res) => {
        todo = res;

        this.editTodo = todo;
      },
    });
  }

  updateTodoId(id: Number) {
    this.editTodoId = id;
  }
  updateTodo(editedTodo: TodoWrite) {
    this.service.putTodo(this.editTodoId, editedTodo).subscribe({
      next: () => this.reloadList(),
    });
  }

  addNew(newTodo: TodoWrite) {
    this.service.postTodo(newTodo).subscribe({
      next: () => this.reloadList(),
    });
  }
  reloadList() {
    this.todoList$ = this.service.getAllTodos();
  }

  updateFlagOrStatus(ifUpdated: Boolean) {
    this.reloadList();
  }
}

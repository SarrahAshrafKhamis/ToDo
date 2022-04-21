import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FlagRead } from 'src/app/Models/flag-read';
import { StatusRead } from 'src/app/Models/status-read';
import { TodoRead } from 'src/app/Models/todo-read';
import { TodoWrite } from 'src/app/Models/todo-write';
import { FlagService } from 'src/app/Services/flag.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit, AfterViewInit {
  @Input('todo') todo!: TodoRead;
  @ViewChild('modal') modalRef!: ElementRef;
  editedTodo: TodoWrite = new TodoWrite('', -1, -1, '');
  statuses$!: Observable<StatusRead[]>;
  flags$!: Observable<FlagRead[]>;
  @Output() EditTodoEvent: EventEmitter<TodoWrite> =
    new EventEmitter<TodoWrite>();
  @Output() EditTodoIdEvent: EventEmitter<Number> = new EventEmitter<Number>();

  constructor(
    private statusService: StatusService,
    private flagService: FlagService
  ) {}
  ngAfterViewInit(): void {
    let el = this.modalRef.nativeElement as HTMLElement;
    el.addEventListener('shown.bs.modal', () => {
      this.editedTodo = new TodoWrite(
        this.todo.title,
        this.todo.status.id,
        this.todo.flag.id,
        this.todo.comments
      );
    });
  }

  save() {
    this.EditTodoIdEvent.emit(this.todo.id);
    this.EditTodoEvent.emit(this.editedTodo);
  }

  ngOnInit(): void {
    this.statuses$ = this.statusService.getAllStatuses();
    this.flags$ = this.flagService.getAllFlags();
  }
}

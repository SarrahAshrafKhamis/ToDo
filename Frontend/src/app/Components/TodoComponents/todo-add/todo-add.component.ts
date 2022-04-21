import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FlagRead } from 'src/app/Models/flag-read';
import { StatusRead } from 'src/app/Models/status-read';
import { TodoWrite } from 'src/app/Models/todo-write';
import { FlagService } from 'src/app/Services/flag.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit, AfterViewInit {
  statuses$!: Observable<StatusRead[]>;
  flags$!: Observable<FlagRead[]>;
  newTodo: TodoWrite = new TodoWrite('', -1, -1, '');
  @Output() newTodoEvent: EventEmitter<TodoWrite> =
    new EventEmitter<TodoWrite>();

  @ViewChild('addRef') addModal!: ElementRef;

  constructor(
    private statusService: StatusService,
    private flagService: FlagService
  ) {}
  ngAfterViewInit(): void {
    let el = this.addModal.nativeElement as HTMLElement;
    el.addEventListener('show.bs.modal', () => {
      this.reloadLists();
    });
  }

  ngOnInit(): void {
    this.reloadLists();
  }
  addNew() {
    this.newTodoEvent.emit(this.newTodo);
    this.newTodo = new TodoWrite('', -1, -1, '');
  }

  reloadLists() {
    this.statuses$ = this.statusService.getAllStatuses();
    this.flags$ = this.flagService.getAllFlags();
  }
}

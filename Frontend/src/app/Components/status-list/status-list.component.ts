import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusRead } from 'src/app/Models/status-read';
import { StatusWrite } from 'src/app/Models/status-write';
import { StatusService } from 'src/app/Services/status.service';
@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
})
export class StatusListComponent implements OnInit {
  statusList$!: Observable<StatusRead[]>;
  colors: String[] = ['red', 'blue', 'gray', 'green', 'orange', 'black'];
  @Output() updateStatusesEvent: EventEmitter<Boolean> =
    new EventEmitter<Boolean>();

  newStatus: StatusWrite = new StatusWrite('', 'red');

  constructor(private service: StatusService) {}

  edit(
    name: HTMLInputElement,
    color: HTMLSelectElement,
    edit: HTMLButtonElement,
    save: HTMLButtonElement
  ) {
    name.disabled = false;
    color.disabled = false;
    edit.style.display = 'none';
    save.style.display = '';
  }

  save(
    status: StatusRead,
    name: HTMLInputElement,
    color: HTMLSelectElement,
    edit: HTMLButtonElement,
    save: HTMLButtonElement
  ) {
    let editedFlag = new StatusWrite(status.name, status.color);
    this.service.putStatus(status.id, editedFlag).subscribe({
      next: () => {
        name.disabled = true;
        color.disabled = true;
        edit.style.display = '';
        save.style.display = 'none';
        this.reloadList();
      },
    });
  }

  addNewStatus() {
    this.service.postStatus(this.newStatus).subscribe({
      next: () => {
        this.reloadList();
        this.newStatus.name = '';
        this.newStatus.color = 'red';
      },
    });
  }

  reloadList() {
    this.statusList$ = this.service.getAllStatuses();
  }

  ngOnInit(): void {
    this.reloadList();
  }

  notifyTodoList() {
    this.updateStatusesEvent.emit(true);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FlagRead } from 'src/app/Models/flag-read';
import { FlagWrite } from 'src/app/Models/flag-write';
import { FlagService } from 'src/app/Services/flag.service';

@Component({
  selector: 'app-flag-list',
  templateUrl: './flag-list.component.html',
  styleUrls: ['./flag-list.component.css'],
})
export class FlagListComponent implements OnInit {
  flagList$!: Observable<FlagRead[]>;
  colors: String[] = ['red', 'blue', 'gray', 'green', 'orange', 'black'];
  @Output() updateFlagsEvent: EventEmitter<Boolean> =
    new EventEmitter<Boolean>();

  newFlag: FlagWrite = new FlagWrite('', 'red');

  constructor(private service: FlagService) {}

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
    flag: FlagRead,
    name: HTMLInputElement,
    color: HTMLSelectElement,
    edit: HTMLButtonElement,
    save: HTMLButtonElement
  ) {
    let editedFlag = new FlagWrite(flag.name, flag.color);
    this.service.putFlag(flag.id, editedFlag).subscribe({
      next: () => {
        name.disabled = true;
        color.disabled = true;
        edit.style.display = '';
        save.style.display = 'none';
        this.reloadList();
      },
    });
  }

  addNewFlag() {
    this.service.postFlag(this.newFlag).subscribe({
      next: () => {
        this.reloadList();
        this.newFlag.name = '';
        this.newFlag.color = 'red';
      },
    });
  }

  reloadList() {
    this.flagList$ = this.service.getAllFlags();
  }

  ngOnInit(): void {
    this.reloadList();
  }

  notifyTodoList() {
    this.updateFlagsEvent.emit(true);
  }
}

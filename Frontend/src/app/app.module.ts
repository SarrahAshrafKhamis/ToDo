import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './Components/TodoComponents/todo/todo.component';
import { TodoService } from './Services/todo.service';
import { FlagListComponent } from './Components/flag-list/flag-list.component';
import { HeaderComponent } from './Components/Shared/header/header.component';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { TodoListComponent } from './Components/TodoComponents/todo-list/todo-list.component';
import { TodoAddComponent } from './Components/TodoComponents/todo-add/todo-add.component';
import { TodoEditComponent } from './Components/TodoComponents/todo-edit/todo-edit.component';
import { StatusListComponent } from './Components/status-list/status-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    FlagListComponent,
    HeaderComponent,
    FooterComponent,
    TodoListComponent,
    TodoAddComponent,
    TodoEditComponent,
    StatusListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}

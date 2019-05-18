import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { routing } from "./app-routing.module";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';

import {MatMenuModule} from '@angular/material/menu';
import { RootComponent } from './root/root.component';
import { NewComponent } from './users/new/new.component'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    RootComponent,
    NewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule
    ],
  exports:[
    BsDropdownModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

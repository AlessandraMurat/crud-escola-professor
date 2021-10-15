import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfessorComponent } from './professor/professor.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    AppComponent,
    ProfessorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

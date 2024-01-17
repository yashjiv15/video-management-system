// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { DatePipe } from '@angular/common';  // Import DatePipe

import { AppComponent } from './app.component';
import { HomeComponent } from './registration/home.component';
import { ResetPasswordComponent } from './registration/resetpassword.component';  // Ensure ResetPasswordComponent is declared here

@NgModule({
  declarations: [AppComponent, HomeComponent, ResetPasswordComponent],  // Include ResetPasswordComponent
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],  // Include FormsModule
  providers: [DatePipe], 
  bootstrap: [AppComponent],
})
export class AppModule {}

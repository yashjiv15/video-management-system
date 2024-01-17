// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './registration/home.component';
import { ResetPasswordComponent } from './registration/resetpassword.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

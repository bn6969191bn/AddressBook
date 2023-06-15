import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-contact',
    component: ContactAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-contact/:id',
    component: ContactEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/:id',
    component: ContactDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

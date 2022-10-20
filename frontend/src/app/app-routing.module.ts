import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { BookviewComponent } from './bookview/bookview.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { EditbookComponent } from './editbook/editbook.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationRequestComponent } from './registration-request/registration-request.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { DaysComponent } from './days/days.component';

const routes: Routes = [
	{path: "**", component: HomeComponent}, 
	{path: "home", component: HomeComponent},
	{path: "searchpage/:books", component: SearchPageComponent},
	{path: "book/:id", component:BookviewComponent},
	{path: "adminedit", component: EditAdminComponent},
	{path: "editbook/:id", component: EditbookComponent},
	{path: "edituser/:username", component: EdituserComponent},
	{path: "addbook", component:AddBookComponent},
	{path: "password", component: ChangePasswordComponent},
	{path: "login", component: LoginComponent},
	{path: "register", component: RegisterComponent},
	{path: "regRequest", component: RegistrationRequestComponent},
	{path: "userprofile", component: UserProfileComponent},
	{path: "userprofile/:sort", component: UserProfileComponent},
	{path: "setDays", component: DaysComponent},
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from "@angular/material/card"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { BookviewComponent } from './bookview/bookview.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { EditbookComponent } from './editbook/editbook.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RegistrationRequestComponent } from './registration-request/registration-request.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TopBooksComponent } from './top-books/top-books.component';
import { HomeComponent } from './home/home.component';
import { BookdayComponent } from './bookday/bookday.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DaysComponent } from './days/days.component';


@NgModule({
  declarations: [
    AppComponent,
	LogoutComponent,
	SearchbarComponent,
	SearchPageComponent,
	BookviewComponent,
	EditAdminComponent,
    EditbookComponent,
    EdituserComponent,
	AddBookComponent,
	ChangePasswordComponent,
	LoginComponent,
	RegistrationRequestComponent,
	RegisterComponent,
	UserProfileComponent,
 	TopBooksComponent,
 	HomeComponent,
  BookdayComponent,
  DaysComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	MatCardModule,
 NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

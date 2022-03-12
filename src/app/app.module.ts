import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminpageComponent } from './adminpage/adminpage.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodCreationComponent } from './food-creation/food-creation.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyFoodComponent } from './my-food/my-food.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { ZippyComponent } from './common/zippy/zippy.component';
const app = initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FoodCreationComponent,
    AdminpageComponent,
    MyFoodComponent,
    SignupComponent,
    LoginComponent,
    ZippyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule, 
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


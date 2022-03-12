import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { FoodCreationComponent } from './food-creation/food-creation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyFoodComponent } from './my-food/my-food.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch:"full"},
  {path:"signup", component: SignupComponent},
  {path:"login", component: LoginComponent},
  {path:"home", component: HomeComponent},
  {path:"admin", component: AdminpageComponent},
  {path:"create",component: FoodCreationComponent},
  {path:"food",component: MyFoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorComponent } from './components/color/color.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component: CarComponent},
  {path:"cars", component: CarComponent},
  {path:"cars/add",  component: CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update",  component: CarUpdateComponent},
  {path:"cars/detail/:carId",  component: CarDetailComponent},
  {path:"order-detail",  component: OrderDetailComponent},
  {path:"brands",  component: BrandComponent},
  {path:"brands/add",  component: BrandAddComponent},
  {path:"colors",  component: ColorComponent},
  {path:"colors/add",  component: ColorAddComponent},
  {path:"checkout",  component: CheckOutComponent},
  {path:"login",  component: LoginComponent, canActivate:[LoggedInGuard]},
  {path:"register",  component: RegisterComponent, canActivate:[LoggedInGuard]},
  {path:"user-profile", component:UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

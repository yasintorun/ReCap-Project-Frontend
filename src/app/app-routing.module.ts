import { AdminCarDetailComponent } from './components/admin/admin-car-detail/admin-car-detail.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminRentalListComponent } from './components/admin/admin-rental-list/admin-rental-list.component';
import { AdminPaymentListComponent } from './components/admin/admin-payment-list/admin-payment-list.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { MainDashboardComponent } from './layout/main-dashboard/main-dashboard.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
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
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminCarListComponent } from './components/admin/admin-car-list/admin-car-list.component';

const routes: Routes = [
  {path:"", component: MainDashboardComponent, outlet:"app"},
  {path:"cars", component: CarComponent},
  {path:"cars/update",  component: CarUpdateComponent},
  {path:"cars/detail/:carId",  component: CarDetailComponent},
  {path:"order-detail",  component: OrderDetailComponent},
  {path:"brands/add",  component: BrandAddComponent},
  {path:"checkout",  component: CheckOutComponent},
  {path:"login",  component: LoginComponent, canActivate:[LoggedInGuard]},
  {path:"register",  component: RegisterComponent, canActivate:[LoggedInGuard]},
  {path:"user-profile", component:UserProfileComponent},
  {path:"my-orders", component:MyOrdersComponent},
  {path:"change-password", component:ChangePasswordComponent},
  
  
  {path:"", component: AdminHomeComponent},

  //admin dashboard i??in routing
  {path:"admin", children: [
    {path:"", component: AdminHomeComponent},
    {path:"cars",  component: AdminCarListComponent},
    {path:"cars/detail/:carId",  component: CarDetailComponent},
    {path:"cars/add",  component: CarAddComponent, canActivate:[LoginGuard]},
    
    {path:"customers",  component: CustomerComponent},
    
    {path:"payments",  component: AdminPaymentListComponent},
    
    {path:"rentals",  component: AdminRentalListComponent},
    
    {path:"brands",  component: BrandComponent},
    {path:"brands/add",  component: BrandAddComponent},
    
    {path:"colors",  component: ColorComponent},
    {path:"colors/add",  component: ColorAddComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

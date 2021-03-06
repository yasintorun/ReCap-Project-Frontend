import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { SearchPipe } from './pipes/search.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';

import { NgxSpinnerModule } from "ngx-spinner"; //spinner

import { ToastrModule } from 'ngx-toastr';
​import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { FooterComponent } from './components/footer/footer.component';
import { SplitPipe } from './pipes/split.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ValidateDirective } from './directives/validate.directive';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MainDashboardComponent } from './layout/main-dashboard/main-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminCarListComponent } from './components/admin/admin-car-list/admin-car-list.component';
import { AdminPaymentListComponent } from './components/admin/admin-payment-list/admin-payment-list.component';
import { AdminRentalListComponent } from './components/admin/admin-rental-list/admin-rental-list.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminCarDetailComponent } from './components/admin/admin-car-detail/admin-car-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    RentalComponent,
    CustomerComponent,
    CarDetailComponent,
    SearchPipe,
    CarFilterComponent,
    OrderDetailComponent,
    CheckOutComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarUpdateComponent,
    FooterComponent,
    SplitPipe,
    LoginComponent,
    RegisterComponent,
    ValidateDirective,
    UserProfileComponent,
    MyOrdersComponent,
    ChangePasswordComponent,
    MainDashboardComponent,
    AdminDashboardComponent,
    AdminCarListComponent,
    AdminPaymentListComponent,
    AdminRentalListComponent,
    AdminHomeComponent,
    AdminCarDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"  
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    NgxSpinnerModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

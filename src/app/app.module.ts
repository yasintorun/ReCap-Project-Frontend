import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { SearchPipe } from './pipes/search.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';

import { ToastrModule } from 'ngx-toastr';
​import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
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
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"  
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component: CarComponent},
  {path:"cars", component: CarComponent},
  {path:"cars/detail/:carId",  component: CarDetailComponent},
  {path:"order-detail",  component: OrderDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

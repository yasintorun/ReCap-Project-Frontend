import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorComponent } from './components/color/color.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component: CarComponent},
  {path:"cars", component: CarComponent},
  {path:"cars/add",  component: CarAddComponent},
  {path:"cars/update",  component: CarUpdateComponent},
  {path:"cars/detail/:carId",  component: CarDetailComponent},
  {path:"order-detail",  component: OrderDetailComponent},
  {path:"brands",  component: BrandComponent},
  {path:"brands/add",  component: BrandAddComponent},
  {path:"colors",  component: ColorComponent},
  {path:"colors/add",  component: ColorAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

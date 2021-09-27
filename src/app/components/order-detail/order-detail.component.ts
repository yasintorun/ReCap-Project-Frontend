import { CarService } from './../../services/car.service';
import { CarDetail } from './../../models/carDetail';
import { Car } from './../../models/car';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaymentInfo } from 'src/app/models/paymentInfo';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private carService:CarService) { }

  car:CarDetail

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params["car"]) {
        this.getCar(params["car"])
      } else {
        this.NotFound()
      }
    })
  }
  // www.asdads.com/order-detail?car=1

  getCar(carId:number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      console.log(response)
      if(response.success && response.data) {
        this.car = response.data
        //yPaymentInfo.carId = response.data.carId
      } else {
        this.NotFound()
      }
    })
  }

  NotFound() {
    console.log("asdasd");
    window.location.pathname = "/"
  }
}

import { CarService } from './../../services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { HostRoot } from './../../Constants';
import { CarImageService } from './../../services/car-image.service';
import { CarImage } from './../../models/carImage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = []
  carDetail: CarDetail | null | undefined

  constructor(
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService
    ){ }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]) {
        this.getCarImages(params["carId"])
        this.getCarDetail(params["carId"])
      }
    })
  }

  getCarImages(carId:number) {
    this.carImageService.getCarImages(carId).subscribe(response => {
      this.carImages = response.data
    })
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.carDetail = response.data
    })
  }

  getCarImagePath(imagePath:string) {
    return HostRoot + imagePath;
  }


  getCarImageActiveClass(first:boolean) {
    if(first) {
      return "active"
    }
    return ""
  }


}

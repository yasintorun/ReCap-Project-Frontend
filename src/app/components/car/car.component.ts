import { Brand } from './../../models/brand';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = []
  filterText: string = ""

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      
      if(params["brands"] || params["colors"]) {
        this.getCarsByFilter(params["brands"], params["colors"])
      }
      else {
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  }

  getCarsByBrandName(brand:string) {
    this.carService.getCarsByBrandName(brand).subscribe(response => {
      this.cars = response.data
    })
  }

  getCarsByColorName(color:string) {
    this.carService.getCarsByColorName(color).subscribe(response => {
      this.cars = response.data
    })
  }

  getCarsByFilter(brands:string, colors:string) {
    this.carService.getCarByFilter(brands, colors).subscribe(response => {
      this.cars = response.data
      console.log(response)
    })
  }

}

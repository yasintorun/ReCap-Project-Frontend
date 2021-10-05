import { CarService } from './../../../services/car.service';
import { CarDetail } from './../../../models/carDetail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.css']
})
export class AdminCarListComponent implements OnInit {

  cars:CarDetail[] = []
  constructor(
    private carService:CarService,
  ) { }

  ngOnInit(): void {
    this.getAllCars()
  }


  getAllCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  }

}

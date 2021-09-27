import { CarService } from './../../services/car.service';
import { BrandService } from './../../services/brand.service';
import { ColorService } from './../../services/color.service';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  public isCollapsed = false;
  
  colors:Color[] = []
  brands:Brand[] = []

  selectedBrands :number[] = []
  selectedColors :number[] = []

  constructor(
    private colorService:ColorService,
    private brandService:BrandService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      // this.selectedColor = params["color"] ?? ""
      // this.selectedBrand = params["brand"] ?? ""
    })

    this.getAllBrands()
    this.getAllColors()
  }


  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  // applyFilter():string {
  //   return `cars?brand=${this.selectedBrand}&color=${this.selectedColor}`
  // }

  // resetFilter() {
  //   this.selectedBrand = ""
  //   this.selectedColor = ""
  // }

  checkFillArray(e:any, id:number, array:number[]) {
    if(e.target.checked) {
      array.push(id)
    } else {
      const index = array.indexOf(id)
      if(index > -1) {
        array.splice(index, 1)
      }
    }
    }

  changeCheckedBrand(e:any, id:number) {
    this.checkFillArray(e,id,this.selectedBrands)
  }

  changeCheckedColor(e:any, id:number) {
    this.checkFillArray(e,id,this.selectedColors)
  }

  applyFilter() {
    console.log(this.selectedColors)
    console.log(this.selectedBrands)
    this.arrayToString(this.selectedBrands)
  }

  arrayToString(array:number[]) {
    console.log(array.toString())
  }

}

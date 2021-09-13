import { Brand } from './../../models/brand';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup
  colors:Color[] = []
  brands:Brand[] = []
  years:number[] = []
  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getAllColors()
    this.getAllBrands()
    this.getModelYearsOptions(1990, 2021)
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear:["",Validators.required ],
      dailyPrice:["",Validators.required],
      description: ["", Validators.required]
    })
  }

  add() {
    if(this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value)

      carModel.brandId = parseInt(this.carAddForm.value.brandId)
      carModel.colorId = parseInt(this.carAddForm.value.colorId)
      carModel.modelYear = parseInt(this.carAddForm.value.modelYear)
      console.log(carModel)
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success(response.message)
      }, errorResponse => {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage, "Hata");
        }
      });

    } else {
      console.log(this.carAddForm)
      this.toastrService.error("Hatalı giriş", "Dikkat")
    }
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

  getModelYearsOptions(min:number, max:number){
    for (let i = min; i <= max; i++) {
      this.years.push(i)
    }
  }

}

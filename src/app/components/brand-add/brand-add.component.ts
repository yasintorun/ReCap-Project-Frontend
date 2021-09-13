import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  add() {
    if(this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)

      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
      }, errorResponse => {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage, "Hata");
        }
      });

    } else {
      this.toastrService.error("Hatalı giriş", "Dikkat")
    }
  }

}

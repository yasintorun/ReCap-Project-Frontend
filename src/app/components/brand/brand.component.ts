import { ToastrService } from 'ngx-toastr';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = []
  currentBrand :Brand | undefined | null

  filterText :string = ""
  
  brandEditForm:FormGroup
  brandAddForm:FormGroup
  constructor(private brandService:BrandService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.getBrands()
    this.createBrandEditForm()
    this.createBrandAddForm()
  }

  createBrandEditForm() {
    this.brandEditForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand) {
    this.currentBrand = brand
    this.brandEditForm.setValue({name:brand.name})
  }

  getCurrentBrandClass(brand:Brand) {
    if(brand == this.currentBrand) {
      return "active"
    }
    return ""
  }

  addBrand()  {
    if(this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.getBrands()
      }, errorResponse => {
        console.log(errorResponse)
      })
    } else{
      this.toastrService.error("Hatalı Giriş")
    }
  }

  updateBrand() {
    if(this.brandEditForm.valid) {
      let brandModel = Object.assign({}, this.brandEditForm.value)
      brandModel.id = this.currentBrand.id
      console.log(brandModel)
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.getBrands()
      }, errorResponse=> {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage, "Hata");
        }
      })
    }else {
      this.toastrService.error("Hatalı giriş", "Dikkat")
    }
  }

  deleteBrand(brand: Brand) {
    console.log(brand)
    Swal.fire({
      title: 'Markayı silmek istediğine emin misin?',
      showCancelButton: true,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText:"Evet, Sil"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.brandService.delete(brand).subscribe(response => {
          Swal.fire('Silindi!', '', 'success')
          this.getBrands()
        })
      }
    })
  }

}

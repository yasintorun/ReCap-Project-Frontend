import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = []
  currentBrand :Brand | undefined | null

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand) {
    this.currentBrand = brand
  }

  getCurrentBrandClass(brand:Brand) {
    if(brand == this.currentBrand) {
      return "active"
    }
    return ""
  }

}

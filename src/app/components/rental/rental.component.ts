import { RentalDetail } from './../../models/rentalDetail';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/Rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: RentalDetail[] = []
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data
      console.log(response.data)
    })
  }
}

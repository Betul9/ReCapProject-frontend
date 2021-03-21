import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[] = [];
  cars:Car[] = []; 
  carImages:CarImage[]=[];
  baseUrl:string  = "https://localhost:44304"
  rentable:boolean;
  rentableList:Rental[];
  rental:Rental;
  startDate: Date;
  endDate: Date;
  car:Car;


  constructor(
    private rentalService:RentalService, 
    private carDetailService:CarDetailService, 
    private activatedRoute:ActivatedRoute, 
    private router:Router,
    private toastrService:ToastrService) {}

  dataLoaded = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetails(params["carId"])
      }
      this.getRentals();
    })
  }

  getCarDetails(carId:number){
    this.carDetailService.getCarDetails(carId).subscribe(response=>{
      this.car = response.data[0]
    })
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals = response.data;
      this.dataLoaded = true;
    })
  }

  getRentalsByCarId(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response=>{
      this.rentals = response.data;
    })
  }

  setRentable(){
    if(this.startDate && this.endDate){
      this.rental = {carId:this.car.carId, rentDate:this.startDate, returnDate:this.endDate};
      this.rentalService.isRentable(this.rental).subscribe(response=>{
        this.rentable = response.success
      })
    }
    this.addRental();
  }

  addRental(){
    if(this.rentable==true){
      this.router.navigate(['/cards/', JSON.stringify(this.rental)])
      this.toastrService.info("Credit Card", "Redirecting to Payment Page")
    }
    else{
      this.toastrService.warning("Can not rent", "Rental is not available")
    }
  }

  checkIfDatesEntered(){
    if(this.startDate && this.endDate){
      return false;
    }
    else{
      return true;
    }
  }
}

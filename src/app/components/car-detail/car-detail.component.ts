import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  cars:Car[]
  carImages:CarImage[];
  baseUrl:string  = "https://localhost:44304"
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,private carDetailService:CarDetailService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarImagesByCarId(params["carId"])
      }
    })
  }

  getCarDetails(carId:number){
    this.carDetailService.getCarDetails(carId).subscribe(response=>{
      this.cars = response.data
    })
  }

  getCarImagesByCarId(carId:number){
    this.carDetailService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data
    });
  }

  //getImageSrc(image:CarImage){
  //  return this.baseUrl + "/" + image.imagePath; 
  //}

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
}

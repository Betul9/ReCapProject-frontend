import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44304/api/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentalsbycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  // getCarDetails(carId:number):Observable<ListResponseModel<Car>>{
  //   let newPath = this.apiUrl+"cars/getcardetailsbyid?carId=" + carId
  //   return this.httpClient.get<ListResponseModel<Car>>(newPath)
  // }

  // getCarImages():Observable<ListResponseModel<CarImage>>{
  //   let newPath=this.apiUrl+"carImages/getall"
  //   return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  // }

  // getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
  //   let newPath=this.apiUrl+"carImages/getbycarid?carId="+carId
  //   return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  // }

  isRentable(rental:Rental):Observable<ResponseModel>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(rental);
    let newPath = this.apiUrl + "rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath, body, {'headers': headers})
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(rental);
    let newPath = this.apiUrl + "rentals/add"
    console.log("ok")
    return this.httpClient.post<ResponseModel>(newPath, body, {'headers': headers})
  }
}

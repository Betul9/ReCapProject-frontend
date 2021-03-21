import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Rental } from 'src/app/models/rental';
import { CardService } from 'src/app/services/card.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  rental:Rental;
  firstName:string;
  lastName:string;
  cardNumber:number;
  cvvNumber:number;
  expireDate:Date;

  card:Card;
  cardExist:Boolean;

  constructor(private activatedRoute:ActivatedRoute, private cardService:CardService, private rentalService:RentalService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
      }
    })
  }

  async rent(){
    let card:Card = {firstName:this.firstName, lastName:this.lastName,cvvNumber:this.cvvNumber, cardNumber:this.cardNumber, expireDate:this.expireDate}
    this.cardExist = await this.doesCardExist(card);
    if(this.cardExist){
      this.card = await((this.getByCardNumber(this.cardNumber)))
      this.rentalService.addRental(this.rental)
      this.toastrService.success("Rented", "The car is rented successfully");
    }
    else{
      this.toastrService.error("This card does not exist")
    }
  }

  async doesCardExist(card:Card){
    return (await (await this.cardService.doesCardExist(card).toPromise()).success )
  }

  async getByCardNumber(cardNumber:number){
    return (await(this.cardService.getByCardNumber(cardNumber)).toPromise()).data[0]
  }

}

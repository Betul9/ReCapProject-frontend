import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardComponent } from './components/card/card.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"car-detail/:carId", component:CarDetailComponent},
  {path:"rentals/:carId", component:RentalComponent},
  {path:"rentals/add/:rental", component:RentalComponent},
  {path:"cards/:rental", component:CardComponent},
  {path:"color-add", component:ColorAddComponent},
  {path:"brand-add", component:BrandAddComponent},
  {path:"car-add", component:CarAddComponent},
  {path:"car-update/:car",component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

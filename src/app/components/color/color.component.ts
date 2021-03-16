import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  dataLoaded=false;
  currentColor:Color;

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  removeCurrentColor(){
    this.currentColor = {colorId:-1,colorName:""}
  }

  getCurrentColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  getAllColorClass(){
    let defaultColor:Color = {colorId:-1,colorName:""}
    if(this.currentColor.colorId == defaultColor.colorId){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}

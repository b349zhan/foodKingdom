import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../models/dish';
import { FoodService } from '../service/food/food.service';

@Component({
  selector: 'app-food-creation',
  templateUrl: './food-creation.component.html',
  styleUrls: ['./food-creation.component.scss']
})
export class FoodCreationComponent implements OnInit {

  most_recent_dish_name:string=""
  form:FormGroup = new FormGroup({
    dishName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ingredients: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ageGroup: new FormControl('', [Validators.required]),
    isSpicy: new FormControl('', []),
  });
  constructor(private food_service: FoodService) { 
  }

  ngOnInit(): void {
  }

  create_dish(dish:Dish){
    (document.getElementById("modal") as HTMLDivElement).classList.add('is-active')
    this.food_service.create(dish);
    this.most_recent_dish_name = dish.dishName;
  }

  close_modal(){
    (document.getElementById("modal") as HTMLDivElement).classList.remove('is-active');
  }

}

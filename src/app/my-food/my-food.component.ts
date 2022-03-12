import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/dish';
import { FoodService } from '../service/food/food.service';

@Component({
  selector: 'app-my-food',
  templateUrl: './my-food.component.html',
  styleUrls: ['./my-food.component.scss']
})
export class MyFoodComponent implements OnInit {

  foods:Dish[]=[];
  constructor(private food_service:FoodService) { 
    this.foods = [];
    console.log("constructing food")
    this.food_service.get_all_food().then(result=>{
      console.log("result:",result)
      if (!result.val()) return;
      Object.entries(result.val()).forEach(([key,value])=>{
        console.log("pushing", value)
        this.foods.push(value as Dish);
      });
    });
  }

  ngOnInit(): void {
  }

  delete_dish(food:Dish){
    this.foods.splice(this.foods.indexOf(food),1)
    this.food_service.delete(food);
  }
}

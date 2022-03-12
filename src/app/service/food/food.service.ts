import { Injectable } from '@angular/core';
import { Dish } from 'src/app/models/dish';
import { getDatabase, ref, set, get, child, remove, DataSnapshot } from "firebase/database";
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private auth: AuthService, private user_service: UserService) { }

  create(dish:Dish){
    const db = getDatabase();
    console.log("Creating dish", this.auth.user)
    set(ref(db, 'dishes/' + this.auth.user.displayName+"/"+dish.dishName),dish);
  }

  get_all_food():Promise<DataSnapshot>{
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `dishes/${this.auth.user.displayName}`));
  }

  update(dish:Dish){

  }
  delete(dish:Dish){
    const dbRef = ref(getDatabase());
    remove(child(dbRef, `dishes/${this.auth.user.displayName}`));
  }

}

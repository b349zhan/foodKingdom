import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { getDatabase, ref, set, DatabaseReference, get, child, update, query } from "firebase/database";
import { Role } from '../models/role';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  add_user(userId:any, displayName:string, email:string, create_date_time:string){
    const db = getDatabase();
    let stored_user:User = this.getUser(displayName, email, create_date_time);
    set(ref(db, 'users/' + userId), stored_user);
    return stored_user;
  }

  update_user(uid:string, user:User){

    let updated_user:User = new User(user.displayName, user.email, user.role, user.create_date_time, user.last_log_in);
    updated_user.last_log_in = new Date().toLocaleString();
    const updates:any = {};
    updates['/users/'+uid] = updated_user;
    update(ref(getDatabase()), updates);
    return updated_user;
  }
  getUser(displayName:string, email:string, create_date_time:string){
    return new User(displayName, email, Role.NORMAL, create_date_time, new Date().toLocaleString());
  }

  get_all_users(){
    let user_ref:DatabaseReference = ref(getDatabase(), 'users');
    return get(user_ref).then((snapshot) => {
      return snapshot.val();
    }).catch((error) => {
      console.error(error);
    });
  }

  get_user_by_uid(uid:string){
    const db_ref = ref(getDatabase());
    return get(child(db_ref, `/users/${uid}`)).then((snapshot) => {
      return snapshot.val();
    }).catch((error) => {
      console.error(error);
    });
  }

  create_or_update_and_store(uid:string, displayName:string, email:string){
    // Email Register: only create the user and set local storage
    // Google Login: check if user exists, if exists, update the log in time, 
    //                                     if not, create the user
    this.get_user_by_uid(uid).then((user)=>{
      if (user){
        let updated_user:User = this.update_user(uid, user);
        console.log("updated_user", updated_user);
        localStorage.setItem('authUser',JSON.stringify(updated_user));
      }else{
        let stored_user:User = this.add_user(uid, displayName, email, new Date().toLocaleString());
        localStorage.setItem('authUser', JSON.stringify(stored_user));
      }
    }).catch(error=>{
      console.log("Failed in user_service:create_or_update",error);
    })
  }

  get_database_user_from_auth_user(user:any):User{
    console.log("get_datebase",user);
    let create_date_time:string = new Date(Number(user.metadata.createdAt)).toLocaleString();
    let last_log_in:string = new Date(Number(user.metadata.lastLoginAt)).toLocaleString();
    return new User(user.displayName, user.email, Role.NORMAL, create_date_time, last_log_in);
  }
}

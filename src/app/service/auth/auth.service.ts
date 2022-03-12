import { Injectable } from '@angular/core';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any = null;
  constructor(private user_service: UserService) { }

  store_user(user:User){
    localStorage.setItem('authUser', JSON.stringify(user));
  }
  email_login(email:string, password:string){
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        let constructed_user:User = this.user_service.get_database_user_from_auth_user(this.user);
        constructed_user.displayName = constructed_user.email.substring(0,8) + "_display_name"
        let stored_user:User = this.user_service.update_user(this.user.uid, constructed_user);
        this.store_user(stored_user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Login Failed", errorCode, errorMessage)
      });

  }
  email_register(email:string, password:string){
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        let stored_user:User = this.user_service.add_user(this.user.uid, this.user.email.substring(0,8)+"_display_name", this.user.email, new Date().toLocaleString());
        this.store_user(stored_user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Register Failed",errorCode, errorMessage);
      });
  }

  logout(){
    const auth = getAuth();
    signOut(auth).then(()=>{
      this.user = null;
      localStorage.removeItem('authUser');
      console.log("Sign Out Success");
    }).catch((error)=>{
      console.log("Sign Out Failed", error);
    })
  }

  google_login(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
      .then((result) => {
        this.user = result.user;
        this.user_service.create_or_update_and_store(this.user.uid, this.user.displayName, this.user.email);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Google Signin Failed", errorCode, errorMessage, email, credential);
      });
  }

  get isLoggedIn(): boolean{
    return this.user!=null;
  }

  get isAdmin(): boolean{
    return this.user!=null && this.user.role == Role.ADMIN;
  }

  setUserFromStorage(){
    let current_user = localStorage.getItem('authUser');
    if (current_user==null) return;
    this.user = JSON.parse(localStorage.getItem('authUser')!);
  }
}

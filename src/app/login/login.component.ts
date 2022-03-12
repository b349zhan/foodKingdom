import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    })
  ;
  constructor(private router:Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  email_signin(data:any){
    let email:string = data.email;
    let password:string = data.password;
    console.log("Logging in ", data);
    this.auth.email_login(email, password).then(()=>{
      this.router.navigate(['/home'])
    })
  }

  google_signin(){
    this.auth.google_login().then(()=>{
      this.router.navigate(['/home'])
    })
  }
}

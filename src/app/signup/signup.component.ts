import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../service/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    })
  ;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  register(data:any){
    console.log("Register:",data)
    this.auth.email_register(data.email, data.password).then(()=>{
      this.router.navigate(['/home']);
    })
  }
}


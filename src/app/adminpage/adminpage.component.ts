import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../service/auth/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {

  users:User[]= [];
  constructor(public auth:AuthService, private user_service: UserService) { 
    this.user_service.get_all_users().then(result=>{
      Object.entries(result).forEach(([key,value])=>{
        this.users.push(value as User);
      });
    });
  }

  ngOnInit(): void {
  }

}

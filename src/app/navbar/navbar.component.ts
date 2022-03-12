import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faCoffee = faCoffee;
  constructor(public auth: AuthService) { 
  }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
  }
}

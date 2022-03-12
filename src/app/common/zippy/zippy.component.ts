import { Component, Input, OnInit } from '@angular/core';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.scss']
})
export class ZippyComponent implements OnInit {

  @Input()food:any;
  active:boolean=false;
  icon:any = faChevronRight;
  constructor() { }

  ngOnInit(): void {
  }
  toggle(){
    this.active = !this.active;
    if (this.active){
      this.icon = faChevronDown;
    }else{
      this.icon = faChevronRight;
    }
  }
}

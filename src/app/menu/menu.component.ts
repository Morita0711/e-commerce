import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  inputs: ['navOpen']
})
export class MenuComponent implements OnInit {
  navOpen: boolean = false;
  action:string="";
  menu:boolean=false;
  a:boolean=false;
  @Output() toggleNav = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.toggleNav.emit();
  }

  toggleIn(){
    this.a=!this.a;
  }
}

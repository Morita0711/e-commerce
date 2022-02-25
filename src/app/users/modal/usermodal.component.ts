import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-modal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.less']
})
export class UserModalComponent implements OnInit {
  add: { userid: string; mode1: boolean; mode2: boolean; mode3: boolean; compare: boolean; password: string; };
  hide = true;

  constructor(private router: Router){
    this.add={
      userid:'',
      mode1:false,
      mode2:false,
      mode3:false,
      compare:false,
      password:''
    }
  }

  ngOnInit(): void {
  
  }

}

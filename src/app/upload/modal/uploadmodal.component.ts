import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-modal',
  templateUrl: './uploadmodal.component.html',
  styleUrls: ['./uploadmodal.component.less']
})
export class UploadeModalCompoment implements OnInit {
  answer: string;
  add: { flag1: true, flag2:false };
  hide = true;

  constructor(private router: Router){
    this.add={
      flag1:true,
      flag2:false,
    }
  }

  ngOnInit(): void {
  
  }

}

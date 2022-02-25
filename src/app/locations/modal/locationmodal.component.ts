import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-modal',
  templateUrl: './locationmodal.component.html',
  styleUrls: ['./locationmodal.component.less']
})
export class LocationModalComponent implements OnInit {
  add: { location: string; }; 
  hide = true;
  
  constructor(private router: Router){
    this.add={
      location:'',
    }
  }

  ngOnInit(): void {
  
  }

}

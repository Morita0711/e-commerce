import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpqueryService } from '../services/httpquery.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  constructor(private http:HttpqueryService, private router: Router){

  }

  ngOnInit(): void {
    this.http.params={
      module: "auth",
      action: "login",
    }
    this.http.sendPost().subscribe((result:any)=>{
      location.href="/";
    })
  }

}

import { Component } from '@angular/core';
import { HttpqueryService } from './services/httpquery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  navOpen: boolean = false;
  title = 'scanner';
  auth:boolean=false;
  userid:string=""; 
  pass:string="";
  constructor(private http:HttpqueryService){

  }
  ngOnInit(): void {
    console.log("init")
    this.http.params={
      module: "core",
      action: "index",
    }
    this.http.sendPost().subscribe((result:any)=>{
      console.log(result);
       this.auth=result.auth;
    })

  }
  doLogin(){

   if (this.userid!="" && this.pass!=""){

    this.http.params={
      module: "auth",
      action: "login",
      userid:this.userid,
      password:this.pass,

    }
    this.http.sendPost().subscribe((result:any)=>{
      console.log(result);
      this.auth=result.auth;
    })
   }
  }

  toggleNav(navOpen: boolean) {
    this.navOpen = !this.navOpen;
  }
}

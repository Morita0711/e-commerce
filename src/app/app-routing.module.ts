import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BarcodesComponent } from './barcodes/barcodes.component';
import { LocationsComponent } from './locations/locations.component';
import { UploadComponent } from './upload/upload.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [

  {path:"users", component:UsersComponent,data: {

  }},
  {path:"auth", component:AuthComponent,data: {

  }},
  {path:"locations", component:LocationsComponent,data: {

  }},

  {path:"barcodes", component:BarcodesComponent,data: {

  }},
  {path:"upload", component:UploadComponent,data: {

  }},
  {path:"**", component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

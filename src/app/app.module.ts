import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LocationsComponent } from './locations/locations.component';
import { BarcodesComponent } from './barcodes/barcodes.component';
import { UsersComponent } from './users/users.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { DDUploadDirective } from './directives/ddupload.directive';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';  
import { DataTablesModule } from 'angular-datatables';
import { StickyDirectiveModule } from './directives/stickytable';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserModalComponent } from './users/modal/usermodal.component';
import { LocationModalComponent } from './locations/modal/locationmodal.component';
import { UploadeModalCompoment } from './upload/modal/uploadmodal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


// import { ButtonsModule, WavesModule, CollapseModule } from 'angular-bootstrap-md'

@NgModule({ 
  declarations: [
    AppComponent,
    MenuComponent,
    LocationsComponent,
    BarcodesComponent,
    UsersComponent,
    UploadComponent,
    LoginComponent,
    DDUploadDirective,
    AuthComponent,
    UserModalComponent,
    LocationModalComponent,
    UploadeModalCompoment
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatTableModule,
    DataTablesModule,
    StickyDirectiveModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports:[],
  providers: [MatDatepickerModule, UserModalComponent, LocationModalComponent, UploadeModalCompoment],
  bootstrap: [AppComponent]
})
export class AppModule { }

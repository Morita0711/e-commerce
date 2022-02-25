import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpqueryService } from '../services/httpquery.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadeModalCompoment } from './modal/uploadmodal.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {
  file:any;
  text: string="Drop here CSV";
  alertshow:boolean=false;
  toRun: () => void;
  answer: string;
  constructor( private http:HttpqueryService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  dropFile(source){
    const formData = new FormData();
    formData.append("module",  "upload");
      formData.append("action",  "index");

    for (this.file of source) {
     formData.append("files[]",  this.file);
    }
  this.text="Uploading...";

    this.http.params=formData;
    this.http.sendFiles()
    .subscribe(res => {
      this.text="Drop here CSV"
    })
  }
  uploadFile(source:Event){
    let el=source.target as HTMLInputElement;
    let files=el.files;

    const formData = new FormData();
    formData.append("module",  "upload");
      formData.append("action",  "index");

    for (let i=0; i<files.length; i++) {
      console.log(files[i])
     formData.append("files[]",  files[i]);
    }
  this.text="Uploading...";

    this.http.params=formData;
    this.http.sendFiles()
    .subscribe(res => {
      this.text="Drop here CSV"
    })
  }
  Process(){
    if(this.answer=="YES"){
      this.answer="";
      this.toRun();
    }


  }
  Back(){
    this.alertshow=false;
    this.toRun =()=>{};
    this.answer="";
  }
  
  resetAllScans(){
    this.open()
    this.toRun =()=>{
      this.Back();
      this.http.params={
        module: "barcodes",
        action: "resetAllScans",
      }
      this.http.sendPost().subscribe((result:any)=>{
        this.router.navigate(['barcodes'],{
          queryParams:{
              'mode': "all",
          }
      });
      })
    }
  }

  resetOldScans(){
    this.open()
    this.toRun =()=>{
      this.Back();
      this.http.params={
        module: "barcodes",
        action: "resetOldScans",
      }
      this.http.sendPost().subscribe((result:any)=>{
       this.router.navigate(['barcodes'],{
          queryParams:{
              'mode': "all",
          }
      });
      })
    }
  }

  open() {
    const dialogRef = this.dialog.open(UploadeModalCompoment, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.Back()
      }

      if(result == false){
        this.Process()
      }
    });
  }

  deleteOldScans(){
    this.open()
    this.toRun =()=>{
      this.Back();
      this.http.params={
        module: "barcodes",
        action: "deleteOldScans",
      }
      this.http.sendPost().subscribe((result:any)=>{
        this.router.navigate(['barcodes'],{
          queryParams:{
              'mode': "all",

          }
      });
      })
    }
  }
  deleteMod2Scans(){
    this.open()
    this.toRun =()=>{
      this.Back();
      this.http.params={
        module: "barcodes",
        action: "deleteMod2Scans",
      }
      this.http.sendPost().subscribe((result:any)=>{
        this.router.navigate(['barcodes'],{
          queryParams:{
              'mode': "all",

          }
      });
      })
    }
  }
  deleteAll(){
    this.open()
    this.toRun =()=>{
      this.Back();
      this.http.params={
        module: "barcodes",
        action: "deleteAll",
      }
      this.http.sendPost().subscribe((result:any)=>{
        this.router.navigate(['barcodes'],{
          queryParams:{
              'mode': "all",

          }
      });
      })
    }
  }
}

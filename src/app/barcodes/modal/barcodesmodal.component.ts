import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  flag:boolean,
  location: string,
  stockid: string,
  barcode: string,
  quantity: number,
  user_id: string
}

@Component({
  selector: 'user-modal',
  templateUrl: './barcodesmodal.component.html',
  styleUrls: ['./barcodesmodal.component.less']
})
export class BarcodeModalComponent implements OnInit {
  add: { flag: boolean, location: string; stockid: string, barcode: string,  quantity: Number, user_id: string, };
  hide = true;

  constructor(private router: Router,public dialogRef: MatDialogRef<BarcodeModalComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) { 
    console.log("data=====>", data);
    this.add = {
      flag:true,
      location: data.location,
      stockid: data.stockid,
      barcode: data.barcode,
      quantity: data.quantity,
      user_id: data.user_id
    }
  }

  ngOnInit(): void {

  }

}

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  alldif: ""
  allold_quantity: ""
  allquantity: ""
  automode: ""
  barcode: ""
  dif: ""
  dif1: ""
  editpopup: 1
  id: ""
  isok: ""
  last_scan: ""
  last_scan1: ""
  location: ""
  old_quantity: ""
  original: ""
  outqty: "1"
  quantity: ""
  quantity1: ""
  stockid: ""
  user_id: ""
  user_id1: ""
}

@Component({
  selector: 'user-modal',
  templateUrl: './barcodesmodal.component.html',
  styleUrls: ['./barcodesmodal.component.less']
})
export class BarcodeModalComponent implements OnInit {
  add: {
    alldif: string
    allold_quantity: string
    allquantity: string
    automode: string
    barcode: string
    dif: string
    dif1: string
    editpopup: number
    id: string
    isok: string
    last_scan: string
    last_scan1: string
    location: string
    old_quantity: string
    original: string
    outqty: string
    quantity: string
    quantity1: string
    stockid: string
    user_id: string
    user_id1: string
  };
  hide = true;

  constructor(private router: Router, public dialogRef: MatDialogRef<BarcodeModalComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.add = {
      alldif: data[0].alldif,
      stockid: data[0].stockid,
      allold_quantity: data[0].allold_quantity,
      allquantity: data[0].allquantity,
      automode: data[0].automode,
      barcode: data[0].barcode,
      dif: data[0].dif,
      dif1: data[0].dif1,
      editpopup: data[0].editpopup,
      id: data[0].id,
      isok: data[0].isok,
      last_scan: data[0].last_scan,
      last_scan1: data[0].last_scan1,
      location: data[0].location,
      old_quantity: data[0].old_quantity,
      original: data[0].original,
      outqty: data[0].outqty,
      quantity: data[0].quantity,
      quantity1: data[0].quantity1,
      user_id: data[0].user_id,
      user_id1: data[0].user_id1,
    };
  }

  ngOnInit(): void {

  }

}

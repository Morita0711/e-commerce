import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpqueryService } from '../services/httpquery.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BarcodeModalComponent } from './modal/barcodesmodal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment} from 'moment';


// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
  },
};
interface barcodesInterface {
  flag: boolean,
  location: string,
  stockid: string,
  barcode: string,
  quantity: number,
  user_id: string
}

@Component({
  selector: 'app-barcodes',
  templateUrl: './barcodes.component.html',
  styleUrls: ['./barcodes.component.less'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],

    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})



export class BarcodesComponent implements AfterViewInit, OnDestroy, OnInit {
  tempItems: { field: string }[] = [
    { field: 'Option 1' },
    { field: 'Option 2' },
    { field: 'Option 3' }
  ]
  toppings: FormGroup;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  posts;

  @ViewChild('selectElem') el: ElementRef;
  items = new FormControl();
  itemList: string[] = ['Valid', 'Not Valid', 'Wrong', 'Error', 'All', 'Ok'];
  userList: any[] = [{ value: 'All', checked: true }, { value: 'User 1', checked: true }, { value: 'User 2', checked: true }];
  userList1: string[] = ['User 1', 'User 2'];
  validateList: string[] = ["Validate", "Validate DIF 1 = 0", "Validate DIF 2 = 0", "Reset Manual", "Reset Autoval", "Reset All Val", "Reset Current"]
  operators: any[] = [
    { value: "2", operator: '=' },
    { value: "3", operator: '!=' },
    { value: "0", operator: '<' },
    { value: "1", operator: '>' },
    { value: "4", operator: '<=' },
    { value: "5", operator: '>=' },
  ];

  validateStr: string = "All";
  checkboxStr: string = "Validate"
  value: string;
  selectedValue: string = "";
  mode: string = "all";
  hideqty: string = "";
  hideold: string = "";
  barcodes;
  pages: Array<any> = [];
  by: string = "id";
  sort: string = "desc";
  page: any;
  current_page: number = 1;
  npages: any;
  endpage: number = 0;
  startpage: number = 0;
  user_id: string = "";
  showfilter: boolean = false;
  location_id: any;
  byCond: string = "";
  users: Array<any> = [];
  searchfilters: { locations: { from: string; to: string; }[]; barcodes: { barcode: string; }[]; scandates: { from: string; to: string; }[]; scandates1: { from: string; to: string; }[]; qty: string; qty1: string; oldqty: string; dif: string; dif1: string; allqty: string; alloldqty: string; alldif: string; qtyopt: string; qtyopt1: string; oldqtyopt: string; difopt: string; difopt1: string; allqtyopt: string; alloldqtyopt: string; alldifopt: string; user1columns: string; stockid: string; user2columns: string; };
  nextpage: number = 0;
  prevpage: number = 0;
  progressbar = false;
  user_id2: string = "";
  addform: boolean = false;
  editform: boolean = false;
  deleteform: boolean = false;
  user1columns: string = "1";
  user2columns: string = "1";
  allcolumns: string = "1";
  fromPagination: boolean = false;
  isRefreshing: boolean = false;
  add: { flag: boolean, location: string; old_quantity: number, stockid: string, barcode: string, quantity: Number, user_id: string, quantity1: Number, user_id1: string };

  constructor(private route: ActivatedRoute, private http: HttpqueryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      pagingType: 'full_numbers',
      processing: false,
      lengthChange: true,
      ordering: true,
      responsive: false,
      info: false,
      paging: false,
      scrollY: "470",
    };
    this.resetFilter();
    this.resetAdd();
    this.route.queryParams.subscribe((params: any) => {
      this.mode = params.mode;
      this.user_id = params.id;
      this.location_id = params.id;
      this.users.splice(0);
      this.getUsers();
      this.getByMode();
      if (this.isRefreshing) {
        window.location.reload();
        this.isRefreshing = false;
      } else {
        this.isRefreshing = true;
      }
    })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(undefined);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      setTimeout(() => {
        dtInstance.draw();
        console.log(dtInstance.data())
      }, 5)
    });
  }

  sortUser(event) {
    if (event == "User 1") this.toggleUser1Columns()
    if (event == "User 2") this.toggleUser2Columns()
    if (event == "All") this.toggleAllColumns()
    this.rerender();
  }

  sortValidate(event) {
    this.checkboxStr = event
    if (event == "Validate") this.selectMatching()
    if (event == "Validate DIF 1 = 0") this.selectMatching1()
    if (event == "Validate DIF 2 = 0") this.selectMatching2()
    if (event == "Reset Manual") this.resetManual()
    if (event == "Reset Autoval") this.resetAuto()
    if (event == "Reset All Val") this.resetAll()
    if (event == "Reset Current") this.resetCurrent()
  }

  cancelClick(ev: MouseEvent) {
    ev.stopPropagation();
  }

  sam(e: String) {
    alert(e)
  }

  openPopup(code) {
    if (code.editpopup != 1 && code.deletepopup != 1 && code.editform != 1) {
      this.barcodes.forEach(barcode => {
        if (barcode.id != code.id) {
          barcode.editpopup = 0;
          barcode.deletepopup = 0;
          barcode.editform = 0;
        }

      })
      code.editpopup = 1;
    }
  }

  resetAdd() {
    this.add = {
      flag: true,
      location: "",
      old_quantity: 0,
      stockid: "",
      barcode: "",
      quantity: 0,
      quantity1: 0,
      user_id: "",
      user_id1: ""
    }
  }
  getUsers() {
    this.http.params = {
      module: "users",
      action: "index",
    }
    this.http.sendPost().subscribe((result: any) => {
      this.users = result.data;

    })
  }
  
  setUser(e:Event ){
      let ev=e as KeyboardEvent;
      let elem=ev.target as HTMLInputElement;
      this.user_id=elem.value
      this.getByMode();
  }

  setUser2(e:Event ){0
    let ev=e as KeyboardEvent;
    let elem=ev.target as HTMLInputElement;
    this.user_id2=elem.value;
    this.getByMode();
  }

  setValid(str: string) {
    this.validateStr = str;
    if (str == 'Valid') this.sortValid()
    if (str == "Not Valid") this.sortNotValid()
    if (str == "Wrong") this.sortWrong()
    if (str == "Error") this.sortNotExist()
    if (str == "All") this.sortAll()
    if (str == "Ok") this.sortOK()
  }

  filterByOperate(id: number) {
    var table = $('#barcodes').DataTable();

    table
      .column(id)
      .data()
      .filter(function (value, index) {
        // let filterValue = $('#filterValue' + id).val();
        // let filterOperator = $('#filterOperator' + id).val();
        // return filterValue == value ? true : false;
        return value = 1 ? true : false;
      })
  }

  Valid(e: Event, barcode) {
    let qty = 0;
    let elem = e.target as HTMLInputElement;
    if (elem.checked == false) qty = 0;
    else qty = barcode.quantity;


    this.http.params = {
      module: "barcodes",
      action: "valid",
      barcode: barcode.barcode,
      location: barcode.location,
      quantity: qty
    }
    this.http.sendPost().subscribe((result: any) => {
      barcode.outqty = qty;
    })
  }
  Valid2(e: Event, barcode) {
    let qty = 0;
    let elem = e.target as HTMLInputElement;
    if (elem.checked == false) qty = 0;
    else qty = barcode.quantity1;
    this.http.params = {
      module: "barcodes",
      action: "valid",
      barcode: barcode.barcode,
      location: barcode.location,
      quantity: qty
    }
    this.http.sendPost().subscribe((result: any) => {
      barcode.outqty = qty;

    })
  }
  ValidAll1() {
    var action = this.http.params.action;
    this.http.params.action = "CheckAll1";
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();

    });
    this.http.params.action = action;
  }
  ValidAll2() {
    var action = this.http.params.action;
    this.http.params.action = "CheckAll2";
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();

    })

    this.http.params.action = action;
  }
  resetCurrent() {
    var action = this.http.params.action;
    this.http.params.action = "resetCurrent";
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();

    })
    this.http.params.action = action;
  }
  updateStockID() {
    this.http.params = {
      module: "barcodes",
      action: "updateStockID",

    }
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  Apply1(e: Event, barcode) {
    let verified = 1;
    let elem = e.target as HTMLInputElement;
    if (elem.checked == false) verified = 0;


    this.http.params = {
      module: "barcodes",
      action: "verify",
      barcode: barcode.barcode,
      location: barcode.location,
      user_id: barcode.user_id,
      verified: verified
    }
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();

    })
  }
  Apply2(e: Event, barcode) {
    let verified = 1;
    let elem = e.target as HTMLInputElement;
    if (elem.checked == false) verified = 0;
    this.http.params = {
      module: "barcodes",
      action: "verify",
      barcode: barcode.barcode,
      location: barcode.location,
      user_id: barcode.uuser_id,
      verified: verified
    }
    this.http.sendPost().subscribe((result: any) => {
      // this.getByMode();

    })
  }
  setLocation(val) {
    let location = { from: val, to: "" };
    this.searchfilters.locations[0] = location;
    this.getByMode();
  }
  setBarcode(val) {
    let barcode = { barcode: val };
    this.searchfilters.barcodes[0] = barcode;
    this.getByMode();
  }
  addBarcode() {
    let barcode = {
      barcode: ""
    }
    this.searchfilters.barcodes.push(barcode)
  }
  addLocation() {
    let loction = {
      from: "",
      to: "",
    }
    this.searchfilters.locations.push(loction)
  }
  scandates() {
    let scandate = {
      from: "",
      to: ""
    }
    this.searchfilters.scandates.push(scandate)
  }

  getByMode() {
    this.progressbar = true;
    if (this.mode == "all") this.getModeAll();
    if (this.mode == "loc") this.getModeLoc();
    if (this.mode == "1") this.getMode1();
    if (this.mode == "2") this.getMode2();
    if (this.mode == "compare") this.getModeCompare();
  }

  getModeLoc() {
    this.http.params = {
      module: "barcodes",
      action: "getLocationScans",
      hideqty: this.hideqty,
      hideold: this.hideold,
      by: this.by,
      sort: this.sort,
      page: this.current_page,
      id: this.location_id,
      byCond: this.byCond,
      searchfilters: this.searchfilters,
      csv: 0
    }
    this.http.sendPost().subscribe((result: any) => {
      this.progressbar = false;
      this.barcodes = result.data.barcodes;
      let npages = result.data.links.pages;
      this.nextpage = result.data.links.end[0];
      this.endpage = result.data.links.end[1];
      this.startpage = result.data.links.start[0];
      this.prevpage = result.data.links.start[1];
      let pq = {
        page: 0
      };
      this.pages.splice(0);
      npages.forEach((page: number) => {

        let parr = { page: 0, link: "" };
        pq.page = page;
        parr.page = page;
        this.pages.push(parr);
      });

    })
  }

  getModeAll() {
    this.http.params = {
      module: "barcodes",
      action: "getAll",
      hideqty: this.hideqty,
      hideold: this.hideold,
      by: this.by,
      sort: this.sort,
      page: this.fromPagination ? this.current_page : 1,
      id: this.user_id,
      id2: this.user_id2,
      byCond: this.byCond,
      searchfilters: this.searchfilters,
      csv: 0
    }

    console.log(this.http.params)
    this.http.sendPost().subscribe(async (result: any) => {
      console.log(result);
      this.fromPagination = false;
      this.progressbar = false;
      this.barcodes = result.data.barcodes;
      let npages = result.data.links.pages;

      this.nextpage = result.data.links.end[0];
      this.endpage = result.data.links.end[1];
      this.startpage = result.data.links.start[0];
      this.prevpage = result.data.links.start[1];
      let pq = {
        page: 0
      };
      this.pages.splice(0);
      npages.forEach((page: number) => {
        let parr = { page: 0, link: "" };
        pq.page = page;
        parr.page = page;
        this.pages.push(parr);
      });
    })
  }

  getMode1() {
    this.http.params = {
      module: "barcodes",
      action: "getUserScans",
      hideqty: this.hideqty,
      hideold: this.hideold,
      by: this.by,
      sort: this.sort,
      page: this.fromPagination ? this.current_page : 1,
      id: this.user_id,
      byCond: this.byCond,
      searchfilters: this.searchfilters,
      csv: 0
    }
    this.http.sendPost().subscribe((result: any) => {
      this.fromPagination = false;
      this.progressbar = false;
      this.barcodes = result.data.barcodes;
      let npages = result.data.links.pages;
      this.nextpage = result.data.links.end[0];
      this.endpage = result.data.links.end[1];
      this.startpage = result.data.links.start[0];
      this.prevpage = result.data.links.start[1];
      let pq = {
        page: 0
      };
      this.pages.splice(0);
      npages.forEach((page: number) => {

        let parr = { page: 0, link: "" };
        pq.page = page;
        parr.page = page;
        this.pages.push(parr);
      });

    })
  }
  getMode2() {
    this.http.params = {
      module: "barcodes",
      action: "getUserScansMod2",
      hideqty: this.hideqty,
      hideold: this.hideold,
      by: this.by,
      sort: this.sort,
      page: this.fromPagination ? this.current_page : 1,
      id: this.user_id,
      byCond: this.byCond,
      searchfilters: this.searchfilters,
      csv: 0
    }
    this.http.sendPost().subscribe((result: any) => {
      this.fromPagination = false;
      this.progressbar = false;
      this.barcodes = result.data.barcodes;
      let npages = result.data.links.pages;
      this.nextpage = result.data.links.end[0];
      this.endpage = result.data.links.end[1];
      this.startpage = result.data.links.start[0];
      this.prevpage = result.data.links.start[1];
      let pq = {
        page: 0
      };
      this.pages.splice(0);
      npages.forEach((page: number) => {

        let parr = { page: 0, link: "" };
        pq.page = page;
        parr.page = page;
        this.pages.push(parr);
      });

    })
  }
  //////////////
  getModeCompare() {
    this.http.params = {
      module: "barcodes",
      action: "getUserCompareMod2",
      hideqty: this.hideqty,
      hideold: this.hideold,
      by: this.by,
      sort: this.sort,
      page: this.fromPagination ? this.current_page : 1,
      id: this.user_id,
      id2: this.user_id2,
      byCond: this.byCond,
      searchfilters: this.searchfilters,
      csv: 0
    }
    console.log("searchfilters", this.http.params)
    this.http.sendPost().subscribe((result: any) => {
      this.fromPagination = false;
      this.progressbar = false;
      this.barcodes = result.data.barcodes;
      let npages = result.data.links.pages;
      this.nextpage = result.data.links.end[0];
      this.endpage = result.data.links.end[1];
      this.startpage = result.data.links.start[0];
      this.prevpage = result.data.links.start[1];
      let pq = {
        page: 0
      };
      this.pages.splice(0);
      npages.forEach((page: number) => {

        let parr = { page: 0, link: "" };
        pq.page = page;
        parr.page = page;
        this.pages.push(parr);
      });

    })
  }
  createBarcode() {
    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "createBarcode",
        barcode: this.add
      }
    }

    if (this.mode == "compare") {
      this.http.params = {
        module: "barcodes",
        action: "createBarcode2",
        barcode: this.add
      }
    }
    console.log(this.add)
    this.http.sendPost().subscribe((result: any) => {
      console.log(this.add)
      this.resetAdd();
      this.by = "last_scan";
      this.sort = 'desc'

      this.getByMode();

    })
  }
  updateBarcode(barcode, i) {
    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "updateBarcode",
        barcode: barcode
      }
    }
    if (this.mode == "compare") {
      this.http.params = {
        module: "barcodes",
        action: "updateBarcode2",
        barcode: barcode
      }
    }
    console.log("barcode", barcode)
    this.http.sendPost().subscribe((result: any) => {
      this.getBarcode(barcode, i);

    })
  }
  getBarcode(barcode, i) {
    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "getBarcode",
        id: barcode.id,
      }

      this.http.sendPost().subscribe((result: any) => {
        console.log(result.data.barcode)
        this.barcodes[i] = result.data.barcode;
      })
    }
    if (this.mode == "compare") {
      this.getByMode();
    }
  }
  deleteBarcode(barcode) {
    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "deleteBarcode",
        id: barcode.id,

      }
    }
    if (this.mode == "compare") {
      this.http.params = {
        module: "barcodes",
        action: "deleteBarcode2",
        id: barcode.id,

      }
    }
    this.http.sendPost().subscribe((result: any) => {

      this.getByMode();
    })
  }
  applyFilter() {
    this.getByMode();
    this.showfilter = false;
  }
  resetFilter() {
    this.searchfilters = {
      locations: [{
        from: "",
        to: "",
      }],
      stockid: "",
      barcodes: [{
        barcode: ""
      }],
      scandates: [{
        from: "",
        to: "",
      }],
      scandates1: [{
        from: "",
        to: "",
      }],
      qty: "",
      qty1: "",
      oldqty: "",
      dif: "",
      dif1: "",
      allqty: "",
      alloldqty: "",
      alldif: "",
      qtyopt: "2",
      qtyopt1: "2",
      oldqtyopt: "2",
      difopt: "2",
      difopt1: "2",
      allqtyopt: "2",
      alloldqtyopt: "2",
      alldifopt: "2",
      user1columns: this.user1columns,
      user2columns: this.user2columns,
    }
    this.showfilter = false;
    this.getByMode();
  }
  selectMatching() {
    if (this.mode == "compare") {
      this.http.params = {
        module: "barcodes",
        action: "setAllOk",
        csv: 0
      }
    }
    this.progressbar = true;
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  selectMatching1() {

    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "setAllOk1",
        csv: 0
      }
    }
    this.progressbar = true;
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  selectMatching2() {

    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "setAllOk2",
        csv: 0
      }
    }
    this.progressbar = true;
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  resetAll() {

    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "resetAll",
        csv: 0
      }
    }
    if (this.mode == "compare") {
      this.http.params = {
        module: "barcodes",
        action: "resetAll2",
        csv: 0
      }
    }
    this.progressbar = true;
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  resetManual() {

    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "resetManual",
        csv: 0
      }
    }
    if (this.mode == "compare") {
      this.http.params = {
        module: "barcodes",
        action: "resetManual2",
        csv: 0
      }
    }
    this.progressbar = true;
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  resetAuto() {

    if (this.mode == "all") {
      this.http.params = {
        module: "barcodes",
        action: "resetAuto",
        csv: 0
      }
    }
    if (this.mode == "compare") {
      this.http.params = {
        module: "barcodes",
        action: "resetAuto2",
        csv: 0
      }
    }
    this.progressbar = true;
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  Download() {
    this.http.params.csv = "1";
    this.http.sendBlob()

  }
  filters() {
    this.showfilter = true;
  }
  sortAll() {
    this.byCond = "";
    this.getByMode();
  }
  async sortValid() {
    this.byCond = "valid";
    this.getByMode();
    var dtInstance = (await this.dtElement.dtInstance);
    dtInstance.draw();
  }
  async sortNotValid() {
    this.byCond = "notvalid";
    this.getByMode();

  }
  sortVerified() {
    this.byCond = "verified";
    this.getByMode();
  }
  sortOK() {
    this.byCond = "ok";
    this.getByMode();
  }
  async sortWrong() {
    this.byCond = "wrong";
    await this.getByMode();
    var dtInstance = (await this.dtElement.dtInstance);
    console.log(dtInstance)
    dtInstance.clear();
  }
  async sortNotExist() {
    this.byCond = "notexist";
    this.getByMode();
    var dtInstance = (await this.dtElement.dtInstance);
    console.log(dtInstance)
    dtInstance.draw(true);
  }
  Recalculate() {
    this.http.params = {
      module: "barcodes",
      action: "recalculate",
    }
    this.progressbar = true;
    this.http.sendPost().subscribe((result: any) => {
      this.getByMode();
    })
  }
  sortBy(item: string) {
    if (this.by == item) {
      if (this.sort == 'ask') this.sort = 'desc';
      else this.sort = 'ask';

    }
    else {
      this.by = item;
      this.sort = 'ask'
    }
    this.getByMode();
  }
  toggleQty() {

    if (this.hideqty == "1") this.hideqty = "";
    else this.hideqty = "1";
    this.getByMode();
  };

  toggleUser1Columns() {
    if (this.user1columns == "1") this.user1columns = "";
    else this.user1columns = "1";
    this.searchfilters.user1columns = this.user1columns;
    this.userList[1].checked = !this.userList[1].checked;
  };
  toggleUser2Columns() {
    if (this.user2columns == "1") this.user2columns = "";
    else this.user2columns = "1";
    this.searchfilters.user2columns = this.user2columns;
    this.userList[2].checked = !this.userList[2].checked;
  };
  toggleAllColumns() {
    if (this.allcolumns == "1") this.allcolumns = "";
    else this.allcolumns = "1";
    this.userList[0].checked = !this.userList[0].checked;
  };
  toggleOld() {
    if (this.hideold == "1") this.hideold = "";
    else this.hideold = "1";
    this.getByMode();
  };

  selectPage(page: any) {
    this.current_page = page;
    this.fromPagination = true;
    this.getByMode();
  }

  resetMode1() { }
  resetMode2() { }


  open(val: barcodesInterface, num: number, mode: string) {
    let sendata = [val, mode];
    const dialogRef = this.dialog.open(BarcodeModalComponent, {
      width: '450px',
      data: sendata
    });
    console.log("Original Data ===============>", val)
    dialogRef.afterClosed().subscribe(result => {
      this.add.flag = result.location
      if (result) {
        console.log("result====>", result)
        this.updateBarcode(result, num)
      }
      else {
        this.getByMode()
      }
    });
  }
}

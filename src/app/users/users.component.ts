import { asNativeElements, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpqueryService } from '../services/httpquery.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModalComponent } from './modal/usermodal.component';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  users: Array<any> = [];
  add: { userid: string; mode1: boolean; mode2: boolean; mode3: boolean; compare: boolean; password: string; };
  adduser: boolean = false;
  password: string = "";
  fileUrl: string = "";
  constructor(private http: HttpqueryService, public dialog: MatDialog) {
    this.add = {
      userid: '',
      mode1: false,
      mode2: false,
      mode3: false,
      compare: false,
      password: ''
    }
  }

  open() {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createUser(result);
      }
    });
  }

  createUser(user) {
    this.http.params = {
      module: "users",
      action: "addUser",
      userid: user.userid,
      mode1: user.mode1,
      mode2: user.mode2,
      mode3: user.mode3,
      compare: user.compare,
      password: user.password
    }
    this.http.sendPost().subscribe((result: any) => {
      if (result.data == true) {
        this.getUsers();
        this.cancelUser();
      }
    })
  }

  ngOnInit(): void {
    this.getUsers();
    this.dtOptions = {
      searching: true,
      pagingType: 'full_numbers',
      processing: true,
      lengthChange: true,
      ordering: true,
      responsive: false,
      info: true,
      paging: false,
      scrollY: "600",
    };
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

  Download() {
    this.http.params = {
      module: "users",
      action: "index",
      csv: "1"
    }
    this.http.sendBlob()

  }

  sortBy(item: string) {
    alert(item)
  }
  setPassword(e: Event, user: any) {
    let ev = e as KeyboardEvent;
    let elem = ev.target as HTMLInputElement;

    if (ev.key == "Enter") {
      this.http.params = {
        module: "users",
        action: "updatePassword",
        userid: user.id,
        password: elem.value
      }

      this.http.sendPost().subscribe((result: any) => {
        user.password = "";
        elem.value = "";
      })

    }
  }

  mode1(user: any) {
    if (user.mode1 == 1) user.mode1 = 0;
    else user.mode1 = 1;

    this.http.params = {
      module: "users",
      action: "updateMode",
      userid: user.id,
      mode: user.mode1 * 1
    }
    this.http.sendPost().subscribe((result: any) => {
    })
  }

  mode2(user: any) {
    if (user.mode2 == 1) user.mode2 = 0;
    else user.mode2 = 1;
    this.http.params = {
      module: "users",
      action: "updateMode2",
      userid: user.id,
      mode: user.mode2 * 1
    }
    this.http.sendPost().subscribe((result: any) => {
    })
  }

  mode3(user: any) {
    if (user.mode3 == 1) user.mode3 = 0;
    else user.mode3 = 1;
    this.http.params = {
      module: "users",
      action: "updateMode3",
      userid: user.id,
      mode: user.mode3 * 1
    }
    this.http.sendPost().subscribe((result: any) => {
    })
  }

  compare(user: any) {
    if (user.compare == 1) user.compare = 0;
    else user.compare = 1;
    this.http.params = {
      module: "users",
      action: "updateCompare",
      userid: user.id,
      compare: user.compare * 1
    }
    this.http.sendPost().subscribe((result: any) => {
    })
  }

  // setMode1(val:any){
  //  if(val.target.checked)
  //   this.add.mode1='1';
  //   else
  //   this.add.mode1='0';
  // }

  // setMode2(val:any){
  //   if(val.target.checked)
  //   this.add.mode2='1';
  //   else
  //   this.add.mode2='0';
  // }

  // setCompare(val:any){
  //   if(val.target.checked)
  //   this.add.compare='1';
  //   else
  //   this.add.compare='0';
  // }

  cancelUser() {
    this.adduser = false;
    this.add = {
      userid: '',
      mode1: false,
      mode2: false,
      mode3: false,
      compare: false,
      password: ''
    }
  }

  deleteUser(user) {
    console.log(user)
    this.http.params = {
      module: "users",
      action: "deleteUser",
      id: user.id,
    }
    this.http.sendPost().subscribe((result: any) => {
      if (result == "ok") this.getUsers();
      window.location.reload();
    })
  }
}
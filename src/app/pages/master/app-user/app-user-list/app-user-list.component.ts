import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { ResponseModalService } from '../../../../common-shared/response-modal/response-modal.service';
import { RoleService } from '../../role/role.service';
import { AppUserDetailComponent } from '../app-user-detail/app-user-detail.component';
import { AppUserService } from '../app-user.service';

@Component({
  selector: 'ngx-app-user-list',
  templateUrl: './app-user-list.component.html',
  styleUrls: ['./app-user-list.component.scss']
})
export class AppUserListComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["name","mobileNumber","status","actions"];
  searchColumns: any[] = [{ name: "name", canShow: true },{ name: "mobileNumber", canShow: true }];
  definedColumns = ["name","mobileNumber"];
  filters: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  users: any[] = [];

  constructor(
    private appUserService: AppUserService,
    private commonToastrService:CommonToastrService,
    private responseModalService:ResponseModalService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
      alert(data);
    });

    this.loadData();
  }
  loadData() {
    this.appUserService
      .getUsers(this.postPerPage, this.pageNumber, this.filters)
      .toPromise()
      .then((datas: any) => {
        this.users = datas?.data;
        this.datatrigger.emit(this.users);
        this.count = datas?.recordsTotal;
      });
  }

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };
  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  };

  deleteConfirm = (rowId: any) => {
    this.appUserService
      .deleteUser(rowId)
      .toPromise()
      .then((data: any) => {
        this.commonToastrService.showSuccess("Deleted Successfully","User");
        this.deleteFromList.emit(rowId);
        this.loadData();
      });
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

  detail = (event) => {
    this.appUserService.getUserById(event).toPromise().then((data: any[]) => {
      this.responseModalService.openModalRight(AppUserDetailComponent, data);
    })
  }

  changeStatus = (row) => {
    if (row?.isActive == true) {
      row.isActive = false;
      this.appUserService.addUser(row).toPromise().then((data: any) => {
        this.commonToastrService.showSuccess("Deactivated", "User");
        this.loadData();
      })
    } else {
      row.isActive = true;
      this.appUserService.addUser(row).toPromise().then((data: any) => {
        this.commonToastrService.showSuccess("Activated", "User");
        this.loadData();
      })
    }
  }

}

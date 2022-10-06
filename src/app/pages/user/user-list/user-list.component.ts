import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["firstName","mobileNo","actions"];
  searchColumns: any[] = [{ firstName: "firstName", mobileNo: "mobileNo",canShow: true }];
  definedColumns = ["firstName","mobileNo"];
  filters: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });

    this.loadData();
  }

  loadData() {
    this.userService
      .getUser(this.postPerPage, this.pageNumber, this.filters)
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

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

}

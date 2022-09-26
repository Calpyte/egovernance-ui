import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { RoleService } from '../role.service';

@Component({
  selector: 'ngx-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["Name", "actions"];
  searchColumns: any[] = [{ name: "name", canShow: true }];
  definedColumns = ["name"];
  filters: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  roles: any[] = [];

  constructor(private roleService: RoleService,private commonToastrService:CommonToastrService) {}

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
    this.roleService
      .getRoles(this.postPerPage, this.pageNumber, this.filters)
      .toPromise()
      .then((datas: any) => {
        this.roles = datas?.data;
        this.datatrigger.emit(this.roles);
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
    this.roleService
      .deleteRole(rowId)
      .toPromise()
      .then((data: any) => {
        this.commonToastrService.showSuccess("Deleted Successfully","Role");
        this.deleteFromList.emit(rowId);
        this.loadData();
      });
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

}

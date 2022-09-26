import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'ngx-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
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
  departments: any[] = [];

  constructor(
    private departmentService: DepartmentService,
    private commonToastrService:CommonToastrService) {}

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
    this.departmentService
      .getDepartments(this.postPerPage, this.pageNumber, this.filters)
      .toPromise()
      .then((datas: any) => {
        this.departments = datas?.data;
        this.datatrigger.emit(this.departments);
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
    this.departmentService
      .deleteDepartment(rowId)
      .toPromise()
      .then((data: any) => {
        this.commonToastrService.showSuccess("Deleted Successfully","Department");
        this.deleteFromList.emit(rowId);
        this.loadData();
      });
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

}

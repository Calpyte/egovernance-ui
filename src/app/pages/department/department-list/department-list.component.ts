import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'ngx-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["Name","actions"];
  searchColumns: any[] = [
    { name: "Name", canShow: false },

  ];
  definedColumns = ["name"];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  banners: any[] = [];
  filters: any[] = [];
  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData();
  }

  loadData = () => {
    this.departmentService
      .getDepartment(this.postPerPage, this.pageNumber, this.filters)
      .subscribe((datas: any) => {
        this.banners = datas?.data;
        this.datatrigger.emit(this.banners);
        this.count = datas?.recordsTotal;
      });
  };
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  };

  deleteConfirm = (rowId: any) => {
    this.departmentService.deleteDepartment(rowId).subscribe((data: any) => {
      this.loadData();
    });
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };
}

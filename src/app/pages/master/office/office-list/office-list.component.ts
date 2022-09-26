import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { OfficeService } from '../office.service';

@Component({
  selector: 'ngx-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {

  private eventsSubscription: Subscription;   
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  // @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["Name", "Description", "Latitude", "Longitude","actions"];
  searchColumns: any[] = [{ name: "name", description: "description", canShow: true }];
  definedColumns = ["name", "description", "latitude", "longitude"];
  filters: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  office: any[] = [];

  constructor(
    private officeService: OfficeService,
    private commonToastrService:CommonToastrService
  ) { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData();
  }

  loadData() {
    this.officeService.getOffice(this.postPerPage, this.pageNumber, this.filters)
      .toPromise()
      .then((datas: any) => {
        this.office = datas?.data;
        this.datatrigger.emit(this.office);
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

  // deleteConfirm = (rowId: any) => {
  //   this.officeService
  //     .deleteDepartment(rowId)
  //     .toPromise()
  //     .then((data: any) => {
  //       this.commonToastrService.showSuccess("Deleted Successfully","Department");
  //       this.deleteFromList.emit(rowId);
  //       this.loadData();
  //     });
  // };

  
  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

}

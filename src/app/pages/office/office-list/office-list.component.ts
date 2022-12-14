import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
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
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["Name","Description","Latitude","Longitude","actions"];
  searchColumns: any[] = [{ name: "name", canShow: true },{ name: "description", canShow: true }];
  definedColumns = ["name", "description", "lat", "lon",];
  filters: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  offices: any[] = [];

  constructor(private officeService: OfficeService,private commonToastrService:CommonToastrService) { }

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
    this.officeService
      .getOffice(this.postPerPage, this.pageNumber, this.filters)
      .toPromise()
      .then((datas: any) => {
        this.offices = datas?.data;
        this.datatrigger.emit(this.offices);
        this.count = datas?.recordsTotal;
      });
      console.log(this.loadData)
  }

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };
  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
    console.log(rowId)
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

  delete=(id:any)=>[
    this.officeService.deleteOfficer(id).toPromise().then((data:any)=>{
      this.commonToastrService.showSuccess("Deleted Successfully","Office");
      this.loadData();
  })
  ]


}

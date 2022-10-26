import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CommonToastrService } from '../../../common-shared/common-toastr/common-toastr.service';
import { OfficerService } from '../officer.service';

@Component({
  selector: 'ngx-officer-list',
  templateUrl: './officer-list.component.html',
  styleUrls: ['./officer-list.component.scss']
})
export class OfficerListComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["Name","actions"];
  searchColumns: any[] = [{ name: "name", canShow: true }];
  definedColumns = ["name"];
  filters: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  officers: any[] = [];

  constructor(private officerService: OfficerService,private commonToastrService:CommonToastrService) { }

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
    this.officerService
      .getOfficers(this.postPerPage, this.pageNumber, this.filters)
      .toPromise()
      .then((datas: any) => {
        this.officers = datas?.data;
        this.datatrigger.emit(this.officers);
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

  delete(id:any){
    this.officerService.deleteOfficer(id).toPromise().then((data:any)=>{
      this.commonToastrService.showSuccess("Deleted Successfully","Officer");
      this.loadData();
    })
  }

}

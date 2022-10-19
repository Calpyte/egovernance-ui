import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ResponseModalService } from '../../../common-shared/response-modal/response-modal.service';
import { ActivityDetailComponent } from '../activity-detail/activity-detail.component';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'ngx-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["name","ratings","actions"];
  searchColumns: any[] = [
    { name: "name", canShow: false }

  ];
  definedColumns = ["name"];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  banners: any[] = [];
  filters: any[] = [];
  constructor(private activityService: ActivityService,private responseModalService:ResponseModalService) {}

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
    this.activityService
      .getActivities(this.postPerPage, this.pageNumber, this.filters)
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

  detail = (rowId: any) => {
    this.activityService.getActivityById(rowId).toPromise().then((data:any)=>{
      this.responseModalService.openModalRight(ActivityDetailComponent,data);
    })
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };
}

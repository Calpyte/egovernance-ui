import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'ngx-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["CountryName"];
  searchColumns: any[] = [{ name: "name", canShow: true }];
  definedColumns = ["name"];
  filters: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  countries: any[] = [];

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnInit(): void{
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      // this.loadData();
    });
    // this.loadData();
  }

  loadData() {
    this.countryService
      .getCountries(this.postPerPage, this.pageNumber, this.filters)
      .toPromise()
      .then((datas: any) => {
        this.countries = datas?.data;
        this.datatrigger.emit(this.countries);
        this.count = datas?.recordsTotal;
      });
  }

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { debounce } from "lodash";

@Component({
  selector: 'ngx-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() title;
  @Input() buttonText;
  @Input() isAddShow: boolean = true;
  @Output() addEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();

  searchText: string;
  constructor(public dialog: MatDialog) {
    this.onSearchChange = debounce(this.onSearchChange, 3000);
  }

  ngOnInit(): void {}
  addClick = (data: any) => {
    this.addEvent.emit(data); //emit to parent while click on add
  };
  onSearchChange = (event) => {
    let filter = {
      key: "string",
      operation: ":",
      orPredicate: true,
      value: this.searchText,
    };
    this.searchEvent.emit(filter); //emit to parent while click on Search.
  };
}

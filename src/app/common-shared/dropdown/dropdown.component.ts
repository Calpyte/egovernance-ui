import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit,OnChanges {
  @Input() label :String;
  @Input() options: any[];
  @Output() selectionChange = new EventEmitter<any>();
  @Input() selectedOption:any = "";
  @Input() isMultiple:Boolean = false;
  public searchControl: FormControl = new FormControl();
  @Input() selectControl:FormControl;
  public searchFilter: any = new ReplaySubject(1);

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.searchFilter.next(this.options.slice());
  }

  ngOnInit() {
    this.searchFilter.next(this.options.slice());
    this.searchControl.valueChanges.subscribe(()=>{this.filter()});
  }

  onSelectionChange=(event:any)=>{
    this.selectionChange.emit(event);
  }
  protected filter() {
    if (!this.options) {
      return;
    }
    let search = this.searchControl.value;
    if (!search) {
      this.searchFilter.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.searchFilter.next(
      this.options.filter(
        (option) => option.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

}

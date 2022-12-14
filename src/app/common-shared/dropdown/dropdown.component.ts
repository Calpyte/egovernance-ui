import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ReplaySubject, Subject} from 'rxjs';

@Component({
  selector: 'ngx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit,OnChanges,OnDestroy{
  @Input() label :String;
  @Input() options: any[];
  @Output() selectionChange = new EventEmitter<any>();
  @Input() selectedOption:any = "";
  @Input() isMultiple:Boolean = false;
  @Input() appearance = "fill";
  @Input() selectControl:FormControl;
  public searchControl: FormControl = new FormControl();
  public searchFilter: any = new ReplaySubject(1);

  constructor() {}
  ngOnDestroy(): void {this.searchFilter.complete()}

  ngOnChanges(){this.searchFilter.next(this.options.slice())}

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(()=>this.filter());
  }

  onSelectionChange=(event:any)=>{
    this.selectedOption = event;
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
      this.options.filter((option) => option.name.toLowerCase().indexOf(search) > -1)
    );
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

}

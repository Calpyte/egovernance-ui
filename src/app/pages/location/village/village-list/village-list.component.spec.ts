/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VillageListComponent } from './village-list.component';

describe('VillageListComponent', () => {
  let component: VillageListComponent;
  let fixture: ComponentFixture<VillageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

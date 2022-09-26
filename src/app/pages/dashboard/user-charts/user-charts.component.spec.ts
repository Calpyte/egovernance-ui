/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserChartsComponent } from './user-charts.component';

describe('UserChartsComponent', () => {
  let component: UserChartsComponent;
  let fixture: ComponentFixture<UserChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

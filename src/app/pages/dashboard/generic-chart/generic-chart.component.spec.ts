/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenericChartComponent } from './generic-chart.component';

describe('GenericChartComponent', () => {
  let component: GenericChartComponent;
  let fixture: ComponentFixture<GenericChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

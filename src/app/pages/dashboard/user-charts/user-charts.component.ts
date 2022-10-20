import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'ngx-user-charts',
  templateUrl: './user-charts.component.html',
  styleUrls: ['./user-charts.component.scss']
})
export class UserChartsComponent implements OnInit {
  @ViewChild("charts", { static: true }) public chartEl: ElementRef;
  @ViewChild("activity",{ static: true }) public activityChart: ElementRef;

  myCustomOptions: any = {};
  chart: any = [];
  chartArray: any = [
  ];
  jsonData: any = [];
  cardArray: any[] = [];
  options:any= [{"id":"1","name":"Past 7 days"},{"id":"2","name":"Past 14 days"}];
  selectedOption = {};

  count:any = [];


  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.dashboardService.getDashBoardCount().toPromise().then((data:any[])=>{
      this.cardArray = data;
    })
    this.createChart(this.activityChart.nativeElement, this.myOptions);
  }
  createChart(el, cfg) {
    Highcharts.chart(el, cfg);
  }

  myOptions = {
    chart: {type: 'column'},
    title: {
      text: "Top 5 Offices By Activity Ratings"
    },
    xAxis: {
      min: 0,
      // title:{
      //   text:"Offices"
      // },
       categories: ['Office 1', 'Office 2', 'Office 3', 'Office 4', 'Office 5']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Ratings'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Office',
      data: [6, 5, 4, 3, 2]
    }]
  };
}

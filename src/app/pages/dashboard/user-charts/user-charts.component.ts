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

  charts:any;
  categories:any = Array;
  ratings:any = Array;


  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.dashboardService.getDashBoardCount().toPromise().then((data:any[])=>{
      this.cardArray = data;
    })
    this.dashboardService.getDashBoardChart().toPromise().then((data:any)=>{
      this.charts = data;
      this.charts?.chartData.forEach(element => {
        this.myOptions.series[0].data.push(element?.rating);
        this.myOptions.xAxis.categories.push(element?.key);
      });
      this.myOptions.yAxis.title.text = this.charts?.ytitle;
      this.myOptions.title.text = this.charts?.title;
      this.myOptions.series[0].name = this.charts?.xtitle;
      this.createChart(this.activityChart.nativeElement, this.myOptions);
    })
  }
  createChart(el, cfg) {
    Highcharts.chart(el, cfg);
  }

  myOptions = {
    chart: {type: 'column'},
    title: {
      text: ""
    },
    xAxis: {
      min: 0,
      // title:{
      //   text:"Offices"
      // },
       categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: ""
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
      name: '',
      data: []
    }]
  };
}

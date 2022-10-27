import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  // chartTarget: ElementRef<any>


  myCustomOptions: any = {};
  chart: any = [];
  chartArray: any = ["activity"];
  jsonData: any = [];
  cardArray: any[] = [];
  options:any= [
    {"id":7,"name":"Past 7 days"},
    {"id":14,"name":"Past 14 days"},
    {"id":30,"name":"Past 30 days"},
    {"id":60,"name":"Past 60 days"},
    {"id":90,"name":"Past 90 days"}
  ];
  selectedOption:any = [];
  count:any = [];
  charts:any;
  categories:any = Array;
  ratings:any = Array;
  chartForm:FormGroup;

  activity:Highcharts.Chart;
  activityOption:Highcharts.Options;
  chartData:any;



  constructor(
    private dashboardService: DashboardService,private formBuilder:FormBuilder,
    private route:Router) {

  }

  getPage=(card:any)=>{
     this.route.navigate(["pages/"+ card?.key.toLowerCase()]);
  }

  ngOnInit() {
    this.chartForm = this.formBuilder.group({
      type:[""]
    });
    this.dashboardService.getDashBoardCount().toPromise().then((data:any[])=>{
      this.cardArray = data;
    })
    this.selectedOption = this.options[0];
    this.onOptionChange(0);
    this.optionChange(this.options[0]);
  }

  onOptionChange=(event:any)=>{
    this.dashboardService.getDashBoardChart(this.selectedOption?.id).toPromise().then((data:any)=>{
      this.myOptions.series[0].data = [];
      this.myOptions.xAxis.categories = [];
      this.charts = data;
      this.charts?.chartData.forEach(element => {
        this.myOptions.series[0].data.push(element?.value);
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


  optionChange=(event:any)=>{
    this.dashboardService.getDashBoardChart(event?.id).toPromise().then((data:any)=>{
      this.charts = data;
    })
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

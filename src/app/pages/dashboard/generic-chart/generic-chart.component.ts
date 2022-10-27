import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ngx-generic-chart',
  templateUrl: './generic-chart.component.html',
  styleUrls: ['./generic-chart.component.scss']
})
export class GenericChartComponent implements OnInit {
  @ViewChild("chart", { static: true }) public chartEl: ElementRef;
  options:any= [
    {"id":7,"name":"Past 7 days"},
    {"id":14,"name":"Past 14 days"},
    {"id":30,"name":"Past 30 days"},
    {"id":60,"name":"Past 60 days"},
    {"id":90,"name":"Past 90 days"}
  ];
  chartForm:FormGroup;
  @Input() chartData:any = [];
  @Output() optionChange:any = new EventEmitter();
  selectedOption:any;


  onOptionChange=(event)=>{
    this.optionChange.emit(event);
  }

  createOptions(){
    this.myOptions.series[0].data = [];
    this.myOptions.xAxis.categories = [];
    this.chartData?.chartData.forEach(element => {
      this.myOptions.series[0].data.push(element?.value);
      this.myOptions.xAxis.categories.push(element?.key);
    });
    this.myOptions.yAxis.title.text = this.chartData?.ytitle;
    this.myOptions.title.text = this.chartData?.title;
    this.myOptions.series[0].name = this.chartData?.xtitle;
    this.createChart(this.chartEl.nativeElement, this.myOptions);
  }

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.chartForm = this.formBuilder.group({
      type:[""]
    });
    this.createOptions();
    console.log(this.chartData);
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

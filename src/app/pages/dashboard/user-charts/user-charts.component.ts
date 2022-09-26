import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'ngx-user-charts',
  templateUrl: './user-charts.component.html',
  styleUrls: ['./user-charts.component.scss']
})
export class UserChartsComponent implements OnInit {
  @ViewChild("charts", { static: true }) public chartEl: ElementRef;
  myCustomOptions: any = {};
  chart: any = [];
  chartArray: any = [
  ];
  jsonData: any = [];
  cardArray: any[] = [
    {
      "label": "User",
      "value": 30
    }

  ];

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.getChartData();

  }

  getChartData() {
    // this.dashboardService.getDashBoardChart().toPromise().then((data:any[])=>{
    //     if(data!=null){
    //       this.jsonData=data;
    //       this.prepareChart(this.jsonData);
    //     }
    // })

    this.jsonData = [
      {
        series: [
          {
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          }
        ],
        title:"sample"
      },
      {
        series: [
          {
            name: 'Installation',
            data: [ 97031, 119931, 137133, 154175,43934, 52503, 57177, 69658]
          }
        ],
        title:"sample"
      },

    ]
    this.prepareChart(this.jsonData);
  }
  prepareChart = (jsonData) => {
    jsonData.forEach((chartData) => {
      let defaultOptions: any = {
        chart: {
          type: "column",
        },
        csscharts: "col-lg-6",
        title: {
          text: "",
        },
        xAxis: {
          min: 0,
          title: {
            text: "x-name",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "y-name",
          },
        },
        series: [],
      };
      defaultOptions.title.text = chartData?.title,
        defaultOptions.series = chartData?.series;
      this.chartArray.push(defaultOptions);
    });
    this.getChart();
  };

  getChart = () => {
    this.chart = this.chartArray;
    this.chart.forEach((chartData) => {
      this.myCustomOptions = chartData;
      this.myCustomOptions["plotOptions"] = {
        column: { stacking: "", dataLabels: { enabled: true } },
      };
      this.createCustomChart(this.myCustomOptions, chartData?.csscharts);
    });
  };
  createCustomChart(myOpts: any, className?: string) {
    this.dashboardService.createChart(
      this.chartEl.nativeElement,
      myOpts,
      className
    );
  }

}

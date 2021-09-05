import { AfterViewInit, Component, OnInit,Inject, NgZone, PLATFORM_ID, APP_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';
import { HTTPService } from '../service/httpService.service';

const abc:[] = []

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {
  private chart: am4charts.XYChart;
  appList:any;

   dta = {
    research:0,
    country:''
  };
   dtarray=[];
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private Service:HTTPService,) { }
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnInit(): void {

    this.Service.getfhnAppData().subscribe(
      data=>{
        // data.versionNum = this.versionNum+1;
        // console.log(data.versionNum,"data . version number ")
       
        this.appList=data;
        // console.log(this.appList,"dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        this.appList.forEach(m => {
          this.dta.research= m.appId;
             this.dta.country = m.appSystem;
             this.dtarray.push(this.dta);
             this.dta={research:0,country:''}
        });
        //  this.appList.map(m=>{
             
            
        //  });
        
        //  console.log(this.dtarray,"bnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
         
// Apply chart themes
am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_kelly);

// Create chart instance
var chart = am4core.create("chartdiv1", am4charts.XYChart);

chart.marginRight = 400;

// Add data
chart.data = this.dtarray;

//console.log('chart', chart);

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.title.text = "App System";
categoryAxis.renderer.grid.template.location = 10;
categoryAxis.renderer.minGridDistance = 20;


var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "APP_Id";

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "research";
series.dataFields.categoryX = "country";
series.name = "country";
series.name = "App ID";
series.tooltipText = "{name}: [bold]{valueY}[/]";
series.stacked = true;
chart.legend = new am4charts.Legend();


chart.cursor = new am4charts.XYCursor();
         
      
        // console.log( this.appList);
      }
    )


  }

}



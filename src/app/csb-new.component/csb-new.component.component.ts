import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { HTTPService } from '../service/httpService.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { imagedata } from '../model/image-data';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RlanereportPopupComponent } from '../rlanereport-popup/rlanereport-popup.component';
import { SpinnerService } from '../service/spinner/spinner.service';
import { ChartPopupComponent } from '../chart-popup/chart-popup.component';

@Component({
  selector: 'app-csb-new.component',
  templateUrl: './csb-new.component.component.html',
  styleUrls: ['./csb-new.component.component.css'],
})
export class CsbNewComponentComponent implements OnInit {
  //@ViewChildren('chartdiv') chartdiv: ElementRef<HTMLElement>;


 // @ViewChildren(CsbNewComponentComponent, { read: chartdiv }) alerts: QueryList<chartdiv>
  hiddenchartdata: any;
  chartbarapp1: any;
  imagedata: imagedata;
  evaluatedapps: any;
  migration: any;
  selected = 'DataCriticality';
  caappmasterdata: any;
  CAAppMaster:any;
  downloadClicked:boolean=false;
  datacat: any;
  test:boolean=false;
  Rearch = [];
  Replace = [];
  Retain = [];
  Rehost = [];
  Replatform = [];
  Rebulid = [];
  appcat: any;
  DataCriticality = true;
  AppCriticality = false;
  selectedRadio: any;
  header: any;
  logo: any;
  body: any;
  footer: any;
  page2header: any;
  page3: any;
  page4: any;

  Rearch1 = [];
  Replace1 = [];
  Retain1 = [];
  Rehost1 = [];
  Replatform1 = [];
  Rebulid1 = [];
  datacentreview: any;
  DatavsIP: any;
  testchar:any;
  EnvironmentvsServerbyAPP: any;
  EnvironmentvsServerbyDATA: any;
  LOBchart: any;
  orgName: any;
  caAppList:any;
  lob: any;
  lobmap: any;
  rlane_strategy_lookup:any;
  rlane_strategy_lookup_map:Map<any,any>;
  orgId:any;
  rlaneList:any;
  rlanemap:Map<string,number>;
  constructor(private spinnerService:SpinnerService,
    private Service: HTTPService, private router: Router,private dialogue : MatDialog,) {}
  changeVal; 

 
  ngOnInit(): void 
  
  {
    this.orgId=sessionStorage.getItem("orgId");

    this.Service.getrlaneList().subscribe(data=>{
      this.rlaneList = data;
      this.rlanemap = new Map<string,number>();
      this.rlaneList.map(m=>{
        this.rlanemap.set(m.rlane_Strategy,m.rlane_Strategy_Id);
      })
    })

    this.Service.ca_rlane_strategy_lookup().subscribe((data)=>{
      this.rlane_strategy_lookup=data;
      console.log(this.rlane_strategy_lookup,"//////rlane_strategy_lookup/////////rlane_strategy_lookup//////////////////////////");
this.rlane_strategy_lookup.map(m=>{
  this.rlane_strategy_lookup_map.set(m.rlane_Strategy_Id,m.rlane_Strategy)
})
    });




    this.Service.getLobs(this.orgId).subscribe((data) => {
     
      this.lob = data;
      let d = new Map();
        //count starts
        this.lob.map((m) => {

          d.set(m.lobId,m.lobName);
        });
        this.lobmap = d;
        console.log(this.lobmap ,"?lobmap");


    }); //end



///getcamaster

    this.Service.getcamaster().subscribe((data)=>{
      this.caAppList=data;
      
      
    });
////


    this.orgName = sessionStorage.getItem('OrgName');

    this.getappPercent();
    this.selected = 'DataCriticality';
    this.Service.getmigrationdata(this.orgId).subscribe((data) => {
      this.migration = data;
      
    });
    this.createchart();
    this.Service.getAppCat().subscribe((data) => {
      debugger;
      this.appcat = data;
      console.log(this.appcat, 'AppppppCatttttttttttttttttt');
    });

    //1. Operating System version View by Data Center
    this.Service.datacentreview(this.orgId).subscribe((data) => {
      this.datacentreview = data;
      console.log(this.datacentreview, 'datacentreview.........');
    }); //end

    //2.	data center view bar graph
    this.Service.DatavsIP().subscribe((data) => {
      this.DatavsIP = data;
      console.log(this.DatavsIP, 'DatavsIP');
    }); //end

    //3.environmentvsServerbyAPP
    this.Service.EnvironmentvsServerbyAPP(this.orgId).subscribe((data) => {
      this.EnvironmentvsServerbyAPP = data;
      console.log(this.EnvironmentvsServerbyAPP, 'EnvironmentvsServerbyAPP');
    }); //end

    //4. EnvironmentvsServerbyDATA
    this.Service.EnvironmentvsServerbyDATA(this.orgId).subscribe((data) => {
      this.EnvironmentvsServerbyDATA = data;
      console.log(this.EnvironmentvsServerbyDATA, 'EnvironmentvsServerbyDATA');
    }); //end

    //4. LOB
    this.Service.LOBchart(this.orgId).subscribe((data) => {
      this.LOBchart = data;
      console.log(this.LOBchart, 'LOBchartta');
    }); //end

    this.Service.CAAppMaster(this.orgId).subscribe((data) => {
      this.CAAppMaster = data;
      console.log(this.CAAppMaster,"caappmaster");
      
     
 
    });



  }

  getappPercent() {
    this.Service.getapppercent(this.orgId).subscribe((data) => {
      this.caappmasterdata = data;
      console.log(this.caappmasterdata, 'ssssssssssssssssseeeeeeeeeeeeee');
      if (this.caappmasterdata) {
        let a = this.caappmasterdata[1].num;
       
        let b = this.caappmasterdata[0].num;
        this.evaluatedapps = (a / b) * 100;
      }
    });
  }

  Radio(event: any) {
    let target = event.source.selected._element.nativeElement;
    let selectedData = {
      value: event.value,
      text: target.innerText.trim(),
    };
    console.log(selectedData);
    if (selectedData.text === 'Data Criticality') {
      this.AppCriticality = false;
      this.DataCriticality = true;
      // this.destroycharts();
      this.createchart();
      // window.location.reload();
    } else if (selectedData.text === 'Application Criticality') {
      this.DataCriticality = false;
      this.AppCriticality = true;
      // this.destroycharts();
      this.createchart();
      this.ngOnInit();
    }
  }

  createchart() {
    this.Service.getmigrationdatacat(this.orgId).subscribe((data) => {
      if(data){
        this.test=true;
      this.datacat = data;
      console.log(this.datacat, 'ressssssssssssssssnnnnnnnnn');
      this.Replace = [];
      this.Retain = [];
      this.Replatform = [];
      this.Rearch = [];
      this.Rehost = [];
      this.Rebulid = [];

      this.datacat.filter((m) => {
        m.map((f) => {
          if (f.name == 'Replace') this.Replace.push(f);
        });
      });
      this.datacat.filter((m) => {
        m.map((f) => {
          if (f.name == 'Retain') this.Retain.push(f);
        });
      });
      this.datacat.filter((m) => {
        m.map((f) => {
          if (f.name == 'Replatform') this.Replatform.push(f);
        });
      });

      this.datacat.filter((m) => {
        m.map((f) => {
          if (f.name == 'Rehost') this.Rehost.push(f);
        });
      });

      this.datacat.filter((m) => {
        m.map((f) => {
          if (f.name == 'Rearchitect') this.Rearch.push(f);
        });
      });

      this.datacat.filter((m) => {
        m.map((f) => {
          if (f.name == 'Rebuild') this.Rebulid.push(f);
        });
      });
      //app-cat
    }
      this.Service.getAppCatmigration(this.orgId).subscribe((data) => {
        this.appcat = data;
        console.log(this.appcat, 'ressssssssssssapppppppppppppptttttttttt');
        this.Replace1 = [];
        this.Retain1 = [];
        this.Replatform1 = [];
        this.Rearch1 = [];
        this.Rehost1 = [];
        this.Rebulid1 = [];
        this.appcat.filter((m) => {
          m.map((f) => {
            if (f.name == 'Rehost') this.Rehost1.push(f);
          });
        });
        this.appcat.filter((m) => {
          m.map((f) => {
            if (f.name == 'Replatform') this.Replatform1.push(f);
          });
        });

        console.log(this.Replatform1, '?????????????????????');

        this.appcat.filter((m) => {
          m.map((f) => {
            if (f.name == 'Rebuild') this.Rebulid1.push(f);
          });
        });

        this.appcat.filter((m) => {
          m.map((f) => {
            if (f.name == 'Rearchitect') this.Rearch1.push(f);
          });
        });
        this.appcat.filter((m) => {
          m.map((f) => {
            if (f.name == 'Replace') this.Replace1.push(f);
          });
        });
        this.appcat.filter((m) => {
          m.map((f) => {
            if (f.name == 'Retain') this.Retain1.push(f);
          });
        });

        console.log(this.Rehost1, 'checkkkkkbussssss');
        console.log(this.Retain, 'checkkkkkretain');
        console.log(this.Replace, 'checkkkkk');

        let chartdivarch = am4core.create('chartdivarch', am4charts.PieChart);
        let resultarchi = { DataCat: '', num: 0 };
        let Rearchi = [];
        this.Rearch.forEach((m) => {
          resultarchi.DataCat = m.migration_Strategy;
          resultarchi.num = m.num;
          Rearchi.push(resultarchi);
          resultarchi = { DataCat: '', num: 0 };
        });

        chartdivarch.data = Rearchi;

        let pieSeriesarch = chartdivarch.series.push(new am4charts.PieSeries());
        pieSeriesarch.dataFields.value = 'num';
        pieSeriesarch.dataFields.category = 'DataCat';
        chartdivarch.legend = new am4charts.Legend();
        pieSeriesarch.legendSettings.valueText = "{value}";
        pieSeriesarch.ticks.template.disabled = true;
        pieSeriesarch.alignLabels = false;
        pieSeriesarch.labels.template.text = '{value}';
        pieSeriesarch.labels.template.fontWeight = "bold";
        pieSeriesarch.labels.template.radius = am4core.percent(-40);

        pieSeriesarch.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'), ];
 pieSeriesarch.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

 pieSeriesarch.slices.template.events.on("hit", function(ev) {
  displayelements = [];
  valueselected = ev.target.dataItem.properties.category;
  console.log(valueselected)
  topopup=[];
  list.map(m=>{
    if(m.dataCatApp==valueselected && m.rlaneStrategyId==4){
      // rlanemap.get(m.rlaneStrategyId)
      displayelements.push(m);
      var obj ={lobname:'',appname:'',appid:0}
      obj.lobname = locallob.get(m.lobId)
      obj.appname = m.appName
      obj.appid = m.appId
      topopup.push(obj);
    }
  });
  var dref = reftodilog.open(ChartPopupComponent ,
    {
      height: '75%',
      width: '60%',
      disableClose:false,
      data: {
        dataKey: topopup,
title:valueselected,
// Datacriticalitydata:true,
// Applicationcriticalitydata:false,
piechartname:'Rearchitect'
      }
    });
  })
















        //replace=retire
        let chartdiv1 = am4core.create('chartdivreplace', am4charts.PieChart);

        let result1 = { DataCat: '', num: 0 };
        let arrayobj1 = [];
        this.Replace.forEach((m) => {
          result1.DataCat = m.migration_Strategy;
          result1.num = m.num;
          arrayobj1.push(result1);
          result1 = { DataCat: '', num: 0 };
        });

        chartdiv1.data = arrayobj1;

        let pieSeries1 = chartdiv1.series.push(new am4charts.PieSeries());
        pieSeries1.dataFields.value = 'num';
        pieSeries1.dataFields.category = 'DataCat';
        chartdiv1.legend = new am4charts.Legend();
  pieSeries1.legendSettings.valueText = "{value}";
        pieSeries1.ticks.template.disabled = true;
        pieSeries1.alignLabels = false;
        pieSeries1.labels.template.text = '{value}';
        pieSeries1.labels.template.fontWeight = "bold";
        pieSeries1.labels.template.radius = am4core.percent(-40);

        pieSeries1.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];
        pieSeries1.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        pieSeries1.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.dataCatApp==valueselected && m.rlaneStrategyId==6){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
    title:valueselected,
    // Datacriticalitydata:true,
    // Applicationcriticalitydata:false,
    piechartname:'Replace'
              }
            });
          })







        let chartdiv2 = am4core.create(
          'chartdivreplatform',
          am4charts.PieChart
        );

        let result2 = { DataCat: '', num: 0 };
        let arrayobj2 = [];
        this.Replatform.forEach((m) => {
          result2.DataCat = m.migration_Strategy;
          result2.num = m.num;
          arrayobj2.push(result2);
          result2 = { DataCat: '', num: 0 };
        });

        chartdiv2.data = arrayobj2;

        let pieSeries2 = chartdiv2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = 'num';
        pieSeries2.dataFields.category = 'DataCat';
        chartdiv2.legend = new am4charts.Legend();
        pieSeries2.legendSettings.valueText = "{value}";
        pieSeries2.ticks.template.disabled = true;
        pieSeries2.alignLabels = false;
        pieSeries2.labels.template.text = '{value}';
        pieSeries2.labels.template.fontWeight = "bold";
        pieSeries2.labels.template.radius = am4core.percent(-40);

        pieSeries2.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];

        pieSeries2.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;


        pieSeries2.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.dataCatApp==valueselected && m.rlaneStrategyId==3){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
    title:valueselected,
    // Datacriticalitydata:true,
    // Applicationcriticalitydata:false,
    piechartname:'Replatform'
              }
            });
          })



//remove
     


let chartdivretain = am4core.create('chartdivretain', am4charts.PieChart);

let resultretain = { DataCat: '', num: 0 };
let arrayobjretain = [];
this.Retain.forEach((m) => {
  resultretain.DataCat = m.migration_Strategy;
  resultretain.num = m.num;
  arrayobjretain.push(resultretain);
  resultretain = { DataCat: '', num: 0 };
});

chartdivretain.data = arrayobjretain;

let retain = chartdivretain.series.push(new am4charts.PieSeries());
retain.dataFields.value = 'num';
retain.dataFields.category = 'DataCat';
chartdivretain.legend = new am4charts.Legend();
retain.legendSettings.valueText = "{value}";

retain.ticks.template.disabled = true;
retain.alignLabels = false;
retain.labels.template.text = '{value}';
retain.labels.template.fontWeight = "bold";
retain.labels.template.radius = am4core.percent(-40);

retain.colors.list = [
      am4core.color('#CED2D9'),
      am4core.color('#AAB5CA'),
      am4core.color('#9DB0D8'),
      am4core.color('#81A9F8'),
      am4core.color('#5188F6'),
      am4core.color('#3A79F8'),
];
retain.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

retain.slices.template.events.on("hit", function(ev) {
  displayelements = [];
  valueselected = ev.target.dataItem.properties.category;
  console.log(valueselected)
  topopup=[];
  list.map(m=>{
    if(m.dataCatApp==valueselected && m.rlaneStrategyId==2){
      // rlanemap.get(m.rlaneStrategyId)
      displayelements.push(m);
      var obj ={lobname:'',appname:'',appid:0}
      obj.lobname = locallob.get(m.lobId)
      obj.appname = m.appName
      obj.appid = m.appId
      topopup.push(obj);
    }
  });
  var dref = reftodilog.open(ChartPopupComponent ,
    {
      height: '75%',
      width: '60%',
      disableClose:false,
      data: {
        dataKey: topopup,
title:valueselected,
// Datacriticalitydata:true,
// Applicationcriticalitydata:false,
piechartname:'Retain'
      }
    });
  })














       
        let chartdivhost = am4core.create('chartdivhost', am4charts.PieChart);

        let resulthost = { DataCat: '', num: 0 };
        let arrayobjhost = [];
        this.Rehost.forEach((m) => {
          resulthost.DataCat = m.migration_Strategy;
          resulthost.num = m.num;
          arrayobjhost.push(resulthost);
          resulthost = { DataCat: '', num: 0 };
        });

        chartdivhost.data = arrayobjhost;

        let rehostpie = chartdivhost.series.push(new am4charts.PieSeries());
        rehostpie.dataFields.value = 'num';
        rehostpie.dataFields.category = 'DataCat';
        chartdivhost.legend = new am4charts.Legend();
        rehostpie.legendSettings.valueText = "{value}";

        rehostpie.ticks.template.disabled = true;
        rehostpie.alignLabels = false;
        rehostpie.labels.template.text = '{value}';
        rehostpie.labels.template.fontWeight = "bold";
        rehostpie.labels.template.radius = am4core.percent(-40);

        rehostpie.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];

        rehostpie.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        let reftodilog = this.dialogue;
        let valueselected ;
        let displayelements =[];
        let list = this.caAppList;
        let locallob = this.lobmap;
        // let rlanemap = this.rlane_strategy_lookup_map;
        let topopup=[];
        console.log(list,"/Applist????????????????????????????????????")
        rehostpie.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.dataCatApp==valueselected && m.rlaneStrategyId==1){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
    title:valueselected,
    // Datacriticalitydata:true,
    // Applicationcriticalitydata:false,
    piechartname:'Rehost'
              }
            });
          })




     


let chartdivbuild = am4core.create(
  'chartdivbuild',
  am4charts.PieChart
);

let databuild = { DataCat: '', num: 0 };
let build = [];
this.Rebulid.forEach((m) => {
  databuild.DataCat = m.migration_Strategy;
  databuild.num = m.num;
  build.push(databuild);
  databuild = { DataCat: '', num: 0 };
});

console.log(build, 'lets check');

chartdivbuild.data = build;

let pieSeriesbuild = chartdivbuild.series.push(
  new am4charts.PieSeries()
);
pieSeriesbuild.dataFields.value = 'num';
pieSeriesbuild.dataFields.category = 'DataCat';
chartdivbuild.legend = new am4charts.Legend();
pieSeriesbuild.legendSettings.valueText = "{value}";
pieSeriesbuild.ticks.template.disabled = true;
pieSeriesbuild.alignLabels = false;
pieSeriesbuild.labels.template.text = '{value}';
pieSeriesbuild.labels.template.fontWeight = "bold";
pieSeriesbuild.labels.template.radius = am4core.percent(-40);
pieSeriesbuild.colors.list = [
      am4core.color('#CED2D9'),
      am4core.color('#AAB5CA'),
      am4core.color('#9DB0D8'),
      am4core.color('#81A9F8'),
      am4core.color('#5188F6'),
      am4core.color('#3A79F8'),
];
pieSeriesbuild.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

pieSeriesbuild.slices.template.events.on("hit", function(ev) {
  displayelements = [];
  valueselected = ev.target.dataItem.properties.category;
  console.log(valueselected)
  topopup=[];
  list.map(m=>{
    if(m.dataCatApp==valueselected && m.rlaneStrategyId==5){
      // rlanemap.get(m.rlaneStrategyId)
      displayelements.push(m);
      var obj ={lobname:'',appname:'',appid:0}
      obj.lobname = locallob.get(m.lobId)
      obj.appname = m.appName
      obj.appid = m.appId
      topopup.push(obj);
    }
  });
  var dref = reftodilog.open(ChartPopupComponent ,
    {
      height: '75%',
      width: '60%',
      disableClose:false,
      data: {
        dataKey: topopup,
title:valueselected,
// Datacriticalitydata:true,
// Applicationcriticalitydata:false,
piechartname:'ReBuild'
      }
    });
  })







        

        //------AppCat-starts-------

        let chartdivbuss = am4core.create('chartdivbuss', am4charts.PieChart);

        let resultbuss = { DataCat: '', num: 0 };
        let arraybuss = [];
        this.Rehost1.forEach((m) => {
          resultbuss.DataCat = m.migration_Strategy;
          resultbuss.num = m.num;
          arraybuss.push(resultbuss);
          resultbuss = { DataCat: '', num: 0 };
        });

        console.log(arraybuss, 'objobjjjjarraybussarraybussjjjjj');

        chartdivbuss.data = arraybuss;

        let pieSeriesbuss = chartdivbuss.series.push(new am4charts.PieSeries());
        pieSeriesbuss.dataFields.value = 'num';
        pieSeriesbuss.dataFields.category = 'DataCat';
        chartdivbuss.legend = new am4charts.Legend();
        pieSeriesbuss.legendSettings.valueText = "{value}";
        pieSeriesbuss.ticks.template.disabled = true;
        pieSeriesbuss.alignLabels = false;
        pieSeriesbuss.labels.template.text = '{value}';
        pieSeriesbuss.labels.template.fontWeight = "bold";
        pieSeriesbuss.labels.template.radius = am4core.percent(-40);

        pieSeriesbuss.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];

        pieSeriesbuss.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        pieSeriesbuss.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.applicationCriticality==valueselected && m.rlaneStrategyId==1){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
        title:valueselected,
        // Datacriticalitydata:true,
        // Applicationcriticalitydata:false,
        piechartname:'Rehost'
              }
            });
          })
        













        let chartdivappreplat = am4core.create(
          'chartdivreplatformapp',
          am4charts.PieChart
        );

        let appreplat = { DataCat: '', num: 0 };
        let appreplatobj = [];
        this.Replatform1.forEach((m) => {
          appreplat.DataCat = m.migration_Strategy;
          appreplat.num = m.num;
          appreplatobj.push(appreplat);
          appreplat = { DataCat: '', num: 0 };
        });

        console.log(appreplatobj, 'lets check');

        chartdivappreplat.data = appreplatobj;

        let pieSeriesreplatapp = chartdivappreplat.series.push(
          new am4charts.PieSeries()
        );
        pieSeriesreplatapp.dataFields.value = 'num';
        pieSeriesreplatapp.dataFields.category = 'DataCat';
        chartdivappreplat.legend = new am4charts.Legend();
        pieSeriesreplatapp.legendSettings.valueText = "{value}";
        pieSeriesreplatapp.ticks.template.disabled = true;
        pieSeriesreplatapp.alignLabels = false;
        pieSeriesreplatapp.labels.template.text = '{value}';
        pieSeriesreplatapp.labels.template.fontWeight = "bold";
        pieSeriesreplatapp.labels.template.radius = am4core.percent(-40);
        pieSeriesreplatapp.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];
        pieSeriesreplatapp.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;


        pieSeriesreplatapp.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.applicationCriticality==valueselected && m.rlaneStrategyId==3){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
        title:valueselected,
        // Datacriticalitydata:true,
        // Applicationcriticalitydata:false,
        piechartname:'Replatform'
              }
            });
          })
        









        //replace=repurchase
        let chartdvrepurapp = am4core.create(
          'chartdivreplaceapp',
          am4charts.PieChart
        );

        let repurapp = { DataCat: '', num: 0 };
        let repurappobj = [];
        this.Replace1.forEach((m) => {
          repurapp.DataCat = m.migration_Strategy;
          repurapp.num = m.num;
          repurappobj.push(repurapp);
          repurapp = { DataCat: '', num: 0 };
        });

        chartdvrepurapp.data = repurappobj;

        let pieSeriesrepurapp = chartdvrepurapp.series.push(
          new am4charts.PieSeries()
        );
        pieSeriesrepurapp.dataFields.value = 'num';
        pieSeriesrepurapp.dataFields.category = 'DataCat';
        chartdvrepurapp.legend = new am4charts.Legend();
        pieSeriesrepurapp.legendSettings.valueText = "{value}";
        pieSeriesrepurapp.ticks.template.disabled = true;
        pieSeriesrepurapp.alignLabels = false;
        pieSeriesrepurapp.labels.template.text = '{value}';
        pieSeriesrepurapp.labels.template.fontWeight = "bold";
        pieSeriesrepurapp.labels.template.radius = am4core.percent(-40);

        pieSeriesrepurapp.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];
        pieSeriesrepurapp.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;


        pieSeriesrepurapp.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.applicationCriticality==valueselected && m.rlaneStrategyId==6){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
        title:valueselected,
        // Datacriticalitydata:true,
        // Applicationcriticalitydata:false,
        piechartname:'Replace'
              }
            });
          })





        let chartdivarchapp = am4core.create(
          'chartdivarchapp',
          am4charts.PieChart
        );
        let resultarchiapp = { DataCat: '', num: 0 };
        let Rearchiapp = [];
        this.Rearch1.forEach((m) => {
          resultarchiapp.DataCat = m.migration_Strategy;
          resultarchiapp.num = m.num;
          Rearchiapp.push(resultarchiapp);
          resultarchiapp = { DataCat: '', num: 0 };
        });

        chartdivarchapp.data = Rearchiapp;

        let pieSeriesarchapp = chartdivarchapp.series.push(
          new am4charts.PieSeries()
        );
        pieSeriesarchapp.dataFields.value = 'num';
        pieSeriesarchapp.dataFields.category = 'DataCat';
        chartdivarchapp.legend = new am4charts.Legend();
        pieSeriesarchapp.legendSettings.valueText = "{value}";
        pieSeriesarchapp.ticks.template.disabled = true;
        pieSeriesarchapp.alignLabels = false;
        pieSeriesarchapp.labels.template.text = '{value}';
        pieSeriesarchapp.labels.template.fontWeight = "bold";
        pieSeriesarchapp.labels.template.radius = am4core.percent(-40);

        pieSeriesarchapp.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];
        pieSeriesarchapp.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        pieSeriesarchapp.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.applicationCriticality==valueselected && m.rlaneStrategyId==4){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
        title:valueselected,
        // Datacriticalitydata:true,
        // Applicationcriticalitydata:false,
        piechartname:'Rearchitect'
              }
            });
          })

//remove
        


//remove
let chartdivrebuild= am4core.create(
  'chartdivbuildapp',
  am4charts.PieChart
);
let resultbuildapp = { DataCat: '', num: 0 };
let repurchaseapp = [];
this.Rebulid1.forEach((m) => {
  resultbuildapp.DataCat = m.migration_Strategy;
  resultbuildapp.num = m.num;
  repurchaseapp.push(resultbuildapp);
  resultbuildapp = { DataCat: '', num: 0 };
});
chartdivrebuild.data = repurchaseapp;

        let pieSeriesbuildapp = chartdivrebuild.series.push(
          new am4charts.PieSeries()
        );
        pieSeriesbuildapp.dataFields.value = 'num';
        pieSeriesbuildapp.dataFields.category = 'DataCat';
        chartdivrebuild.legend = new am4charts.Legend();
        pieSeriesbuildapp.legendSettings.valueText = "{value}";
        pieSeriesbuildapp.ticks.template.disabled = true;
        pieSeriesbuildapp.alignLabels = false;
        pieSeriesbuildapp.labels.template.text = '{value}';
        pieSeriesbuildapp.labels.template.fontWeight = "bold";
        pieSeriesbuildapp.labels.template.radius = am4core.percent(-40);

        pieSeriesbuildapp.colors.list = [
          am4core.color('#CED2D9'),
          am4core.color('#AAB5CA'),
          am4core.color('#9DB0D8'),
          am4core.color('#81A9F8'),
          am4core.color('#5188F6'),
          am4core.color('#3A79F8'),
        ];
        pieSeriesbuildapp.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        pieSeriesbuildapp.slices.template.events.on("hit", function(ev) {
          displayelements = [];
          valueselected = ev.target.dataItem.properties.category;
          console.log(valueselected)
          topopup=[];
          list.map(m=>{
            if(m.applicationCriticality==valueselected && m.rlaneStrategyId==5){
              // rlanemap.get(m.rlaneStrategyId)
              displayelements.push(m);
              var obj ={lobname:'',appname:'',appid:0}
              obj.lobname = locallob.get(m.lobId)
              obj.appname = m.appName
              obj.appid = m.appId
              topopup.push(obj);
            }
          });
          var dref = reftodilog.open(ChartPopupComponent ,
            {
              height: '75%',
              width: '60%',
              disableClose:false,
              data: {
                dataKey: topopup,
        title:valueselected,
        // Datacriticalitydata:true,
        // Applicationcriticalitydata:false,
        piechartname:'Retire'
              }
            });
          })





     

        let chartdivretire= am4core.create(
          'chartdivretaiapp',
          am4charts.PieChart
        );
        let retireapp = { DataCat: '', num: 0 };
        let resultretireapp = [];
        this.Retain1.forEach((m) => {
          retireapp.DataCat = m.migration_Strategy;
          retireapp.num = m.num;
          resultretireapp.push(retireapp);
          retireapp = { DataCat: '', num: 0 };
        });
        chartdivretire.data = resultretireapp;
        
                let pieSeriesretire = chartdivretire.series.push(
                  new am4charts.PieSeries()
                );
                pieSeriesretire.dataFields.value = 'num';
                pieSeriesretire.dataFields.category = 'DataCat';
                chartdivretire.legend = new am4charts.Legend();
                pieSeriesretire.legendSettings.valueText = "{value}";
                pieSeriesretire.ticks.template.disabled = true;
                pieSeriesretire.alignLabels = false;
                pieSeriesretire.labels.template.text = '{value}';
                pieSeriesretire.labels.template.fontWeight = "bold";
                pieSeriesretire.labels.template.radius = am4core.percent(-40);
        
                pieSeriesretire.colors.list = [
                  am4core.color('#CED2D9'),
                  am4core.color('#AAB5CA'),
                  am4core.color('#9DB0D8'),
                  am4core.color('#81A9F8'),
                  am4core.color('#5188F6'),
                  am4core.color('#3A79F8'),
                ];
                pieSeriesretire.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

                pieSeriesretire.slices.template.events.on("hit", function(ev) {
                  displayelements = [];
                  valueselected = ev.target.dataItem.properties.category;
                  console.log(valueselected)
                  topopup=[];
                  list.map(m=>{
                    if(m.applicationCriticality==valueselected && m.rlaneStrategyId==2){
                      // rlanemap.get(m.rlaneStrategyId)
                      displayelements.push(m);
                      var obj ={lobname:'',appname:'',appid:0}
                      obj.lobname = locallob.get(m.lobId)
                      obj.appname = m.appName
                      obj.appid = m.appId
                      topopup.push(obj);
                    }
                  });
                  var dref = reftodilog.open(ChartPopupComponent ,
                    {
                      height: '75%',
                      width: '60%',
                      disableClose:false,
                      data: {
                        dataKey: topopup,
                title:valueselected,
                // Datacriticalitydata:true,
                // Applicationcriticalitydata:false,
                piechartname:'Retire'
                      }
                    });
                  })
        
        
        




 
      });
    });
  }

  beforedownload() {
    this.downloadClicked=true;
    this.spinnerService.requestStarted();
    this.PDFcreate();
    this.DataCenterView();
    this.ApplicationView();
    this.Lobview();
    this.DatabaseView();
    if (this.hiddenchartdata) {
      this.downloadpdf();
    }
  }
  downloadpdf() {
    this.downloadClicked=true;
    var imgd = new imagedata();
    this.header = imgd.getheader();
    this.logo = imgd.getlogo();
    this.body = imgd.getbody();
    this.footer = imgd.getfooter();
    this.page2header = imgd.getpage2header();
    this.page3 = imgd.getpage3();
    this.page4 = imgd.getpage4();
    var doc = new jsPDF();
    doc.setFontSize(12);

    var d = new Date();
    var element = document.getElementById('chartdivison');
    var element1 = document.getElementById('chartdivDataIP');
    var element2 = document.getElementById('chartdivcentre');
    var element3 = document.getElementById('ApplicationView');
    var element4 = document.getElementById('DatabaseView');
    var element5 = document.getElementById('LobView');
    html2canvas(element).then((canvas) => {
      doc.addImage(this.header, 0, 0, 208, 25);

      doc.addImage(this.logo, 10, 35, 65, 25);

      doc.addImage(this.logo, 135, 35, 65, 25);
      doc.text('Customer Name :', 10, 75);
      doc.text(this.orgName, 46, 75);

      doc.addImage(this.body, -15, 85, 250, 100);
      doc.addImage(this.footer, 0, 270, 200, 25);

      html2canvas(element1).then((canvas1) => {
        //page
        var imgdata1 = canvas1.toDataURL('image/png');
        doc.addPage();
        doc.addImage(this.header, 0, 0, 208, 25);
        doc.addImage(this.page2header, -5, 25, 205, 65);
        doc.text('•	Data Center View ', 5, 100);

        doc.addImage(imgdata1, 20, 105, 150, 70);

        doc.text('•	Operating System version View by Data Center ', 5, 195);
        html2canvas(element2).then((canvas2) => {
          var imgdata2 = canvas2.toDataURL('image/png');
          doc.addImage(imgdata2, 40, 210, 105, 60);
          doc.addImage(this.footer, 0, 270, 200, 25);

          //graph page2
          doc.addPage();

          html2canvas(element3).then((canvas3) => {
            var imgdata3 = canvas3.toDataURL('image/png');
            doc.addImage(this.header, 0, 0, 208, 25);
            doc.text('• Environment by Application View', 5, 35);
            doc.addImage(imgdata3, 25, 50, 150, 75);

            html2canvas(element4).then((canvas4) => {
              var imgdata4 = canvas4.toDataURL('image/png');
              doc.text('• Database Server View by Environment ', 5, 140);
              doc.addImage(imgdata4, 25, 175, 150, 75);
              doc.addImage(this.footer, 0, 270, 200, 25);

              //graph2 end

              //page 3 starts
              doc.addPage();
              doc.addImage(this.header, 0, 0, 208, 25);
              doc.addImage(this.page3, 0, 35, 210, 200);
              doc.addImage(this.footer, 0, 270, 200, 25);

              //page 3 end

              //page 4 starts
              doc.addPage();
              doc.addImage(this.header, 0, 0, 208, 25);
              doc.addImage(this.page4, 0, 25, 210, 250);
              doc.addImage(this.footer, 0, 270, 200, 25);
              doc.addPage();

              var imgdata = canvas.toDataURL('image/png');
              doc.addImage(this.header, 0, 0, 208, 25);
              doc.addImage(imgdata, 0, 30, 208, 150);
              html2canvas(element5).then((canvas5) => {
                var imgdata5 = canvas5.toDataURL('image/png');
                doc.text('•	Application View By LOB  ', 5, 185);
                doc.addImage(imgdata5, 25, 210, 150, 60);
                // doc.text("Generated on-",10,265);
                // doc.text(d.toString(),10,267);
                doc.addImage(this.footer, 0, 270, 200, 25);
                var downloaded = doc.save('R-lane-Report.pdf');

                if (downloaded) {
                 //window.location.reload();
                 this.spinnerService.requestEnded();
                 this.downloadClicked=false;
                }
              });
            });
          });
        });
      });
    });
  }
  // DC VS IP
  PDFcreate() {
    // xy bar graph ip
    let resultretiredapp = { DataCat: '', num: 0 };
    let DatavsIP = [];
    this.DatavsIP.forEach((m) => {
      resultretiredapp.DataCat = m.name;
      resultretiredapp.num = m.count;
      DatavsIP.push(resultretiredapp);
      resultretiredapp = { DataCat: '', num: 0 };
    });
    this.chartbarapp1 = am4core.create('chartdivDataIP', am4charts.XYChart);

    this.chartbarapp1.data = DatavsIP;

    let categoryAxisapp1 = this.chartbarapp1.xAxes.push(
      new am4charts.CategoryAxis()
    );
    categoryAxisapp1.dataFields.category = 'DataCat';
    categoryAxisapp1.title.text = 'DataCenter-view';

    let valueAxisapp1 = this.chartbarapp1.yAxes.push(new am4charts.ValueAxis());
    valueAxisapp1.title.text = 'Value';

    let seriesapp1 = this.chartbarapp1.series.push(
      new am4charts.ColumnSeries()
    );
 
    seriesapp1.columns.template.tooltipText =
      'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';
    seriesapp1.columns.template.fill = am4core.color('#00416D'); // fill
    seriesapp1.dataFields.valueY = 'num';
    seriesapp1.dataFields.categoryX = 'DataCat';
  }

  //1. Operating System version View by Data Center pie
  DataCenterView() {
    let chartdivarch = am4core.create('chartdivcentre', am4charts.PieChart);
    let result = { name: '', count: 0 };
    let osdata1 = [];
    this.datacentreview.forEach((m) => {
      result.name = m.name;
      result.count = m.count;
      osdata1.push(result);
      result = { name: '', count: 0 };
    });

    chartdivarch.data = osdata1;
    console.log(osdata1, 'checkkkkOsNamecentrre view??????????????');
    let pieSeriesarch = chartdivarch.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'count';
    pieSeriesarch.dataFields.category = 'name';
    chartdivarch.legend = new am4charts.Legend();
    pieSeriesarch.legendSettings.valueText = "{value}";
    pieSeriesarch.ticks.template.disabled = true;
    pieSeriesarch.alignLabels = false;
    pieSeriesarch.labels.template.text = "{value}"
    pieSeriesarch.labels.template.radius = am4core.percent(-40);

    pieSeriesarch.colors.list = [
      am4core.color('#00416D'),
      am4core.color('#ADC1CE'),
      am4core.color('#464A52'),
      am4core.color('#E9EDEF'),
    ];
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();
   
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  
    this.dialogue.open(RlanereportPopupComponent,{width: '330px',
    height: '400px',
    disableClose:true,
    autoFocus:true,
    id:"modal-component",
  
    
  });
  }
  ApplicationView() {
    let resultretiredapp = { DataCat: '', num: 0 };
    let DatavsIP = [];
    this.EnvironmentvsServerbyAPP.forEach((m) => {
      resultretiredapp.DataCat = m.migration_Strategy;
      resultretiredapp.num = m.num;
      DatavsIP.push(resultretiredapp);
      resultretiredapp = { DataCat: '', num: 0 };
    });
    this.chartbarapp1 = am4core.create('ApplicationView', am4charts.XYChart);

    this.chartbarapp1.data = DatavsIP;
    console.log(DatavsIP, 'applicationnnnnnappppapppapp');
    let categoryAxisapp1 = this.chartbarapp1.xAxes.push(
      new am4charts.CategoryAxis()
    );
    categoryAxisapp1.dataFields.category = 'DataCat';
    categoryAxisapp1.title.text = 'Environment view';

    let valueAxisapp1 = this.chartbarapp1.yAxes.push(new am4charts.ValueAxis());
    valueAxisapp1.title.text = 'Value';

    let seriesapp1 = this.chartbarapp1.series.push(
      new am4charts.ColumnSeries()
    );

    seriesapp1.columns.template.tooltipText =
      'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';
    seriesapp1.columns.template.fill = am4core.color('#464A52'); // fill
    seriesapp1.dataFields.valueY = 'num';
    seriesapp1.dataFields.categoryX = 'DataCat';
  }

  DatabaseView() {
    let resultretiredapp = { DataCat: '', num: 0 };
    let DatavsIP = [];
    this.EnvironmentvsServerbyDATA.forEach((m) => {
      resultretiredapp.DataCat = m.migration_Strategy;
      resultretiredapp.num = m.num;
      DatavsIP.push(resultretiredapp);
      resultretiredapp = { DataCat: '', num: 0 };
    });
    this.chartbarapp1 = am4core.create('DatabaseView', am4charts.XYChart);

    this.chartbarapp1.data = DatavsIP;
    console.log(DatavsIP, 'DATADATAENVVVVV');
    let categoryAxisapp1 = this.chartbarapp1.xAxes.push(
      new am4charts.CategoryAxis()
    );
    categoryAxisapp1.dataFields.category = 'DataCat';
    categoryAxisapp1.title.text = 'Environment view';

    let valueAxisapp1 = this.chartbarapp1.yAxes.push(new am4charts.ValueAxis());
    valueAxisapp1.title.text = 'Value';

    let seriesapp1 = this.chartbarapp1.series.push(
      new am4charts.ColumnSeries()
    );

    seriesapp1.columns.template.tooltipText =
      'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';
    seriesapp1.columns.template.fill = am4core.color('#E9EDEF'); // fill
    seriesapp1.dataFields.valueY = 'num';
    seriesapp1.dataFields.categoryX = 'DataCat';
  }

  Lobview() {
    let resultretiredapp = { DataCat: '', num: 0 };
    let DatavsIP = [];
    this.LOBchart.forEach((m) => {
      resultretiredapp.DataCat = m.migration_Strategy;
      resultretiredapp.num = m.num;
      DatavsIP.push(resultretiredapp);
      resultretiredapp = { DataCat: '', num: 0 };
    });
    this.chartbarapp1 = am4core.create('LobView', am4charts.XYChart);

    this.chartbarapp1.data = DatavsIP;
    console.log(DatavsIP, 'LOBOBOBOBOBOBBBB');
    let categoryAxisapp1 = this.chartbarapp1.xAxes.push(
      new am4charts.CategoryAxis()
    );
    categoryAxisapp1.dataFields.category = 'DataCat';
    categoryAxisapp1.title.text = 'Lob View';

    let valueAxisapp1 = this.chartbarapp1.yAxes.push(new am4charts.ValueAxis());
    valueAxisapp1.title.text = 'Value';

    let seriesapp1 = this.chartbarapp1.series.push(
      new am4charts.ColumnSeries()
    );

    seriesapp1.columns.template.tooltipText =
      'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';
    seriesapp1.columns.template.fill = am4core.color('#00416D'); // fill
    seriesapp1.dataFields.valueY = 'num';
    seriesapp1.dataFields.categoryX = 'DataCat';
    this.hiddenchartdata = true;
  }

  showpopup(rlaneName){
    let applist =[];
    this.CAAppMaster.map(f=>{
      if(this.rlanemap.get(rlaneName)==f[0].rlaneStrategyId){
        let obj = {lobname:'',appid:'',appname:''}
        obj.appid= f[0].appId;
        obj.appname= f[0].appName;
        obj.lobname= this.lobmap.get(f[0].lobId);
        applist.push(obj);
      }
    });
    var dref = this.dialogue.open(ChartPopupComponent, {
      height: '75%',
      width: '60%',
      disableClose: false,
      data: {
        dataKey: applist,
        title: rlaneName,

        piechartname: 'Application related to'
      },
    });
  

    
  }
}

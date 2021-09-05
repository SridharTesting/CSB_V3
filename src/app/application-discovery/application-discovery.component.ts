import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../service/httpService.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { DashboardPopupComponent } from '../dialog-reports/dashboard-popup/dashboard-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ChartPopupComponent } from '../chart-popup/chart-popup.component';
import { InfraPopupComponent } from '../infra-popup/infra-popup.component';

@Component({
  selector: 'app-application-discovery',
  templateUrl: './application-discovery.component.html',
  styleUrls: ['./application-discovery.component.css'],
})
export class ApplicationDiscoveryComponent implements OnInit {
  chartbarapp1:any;
  LOBchart:any;
  lobmap: any;
  lobbchart:any;
  lobbmap = new Map();
  osdata: any;
  appReport: string = 'Application Discovery Report';
  physicaldata: any;
  OSvsData: any;
  Oscount: any;
  Environmentcount: any;
  lobcount: any;
  infradatacount: object;
  caappmasterdata: any;
  updateddate: any;
  vendorcount: any;
  lob: any;
  EnvironmentvsServerbyAPP: any;
  Applicationcriticalitydata: any;
  Datacriticalitydata: any;
  lobdata: any;
  caAppList: any;
  CAInfradata: any;
  CAInframapping:any;
  orgId:any;
  chartdata = {};
  loblist:any[]=[];

  constructor(
    private Service: HTTPService,
    private router: Router,
    private dialogue: MatDialog
  ) {}

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
    this.Service.getLobs(this.orgId).subscribe((data) => {
      this.lobbchart = data;
      // console.log(this.lobbchart,"lobdatalobbchartlobbchart");
      this.lobbchart.map(m=>{
        this.lobbmap.set(m.lobName,m.lobId)
        // console.log(this.lobbmap,"lobloblbolbollobbmaplobbmaplobbmapb")
      })


      let count = 0;
      this.lob = data;
      let d = new Map();
      //count starts
      this.lob.map((m) => {
        count = count + 1;
        d.set(m.lobId, m.lobName);
      });
      this.lobmap = d;
      // console.log(this.lobmap, '?lobmap');
      this.lobcount = count; //ends
      // console.log(this.lob, 'check lob datatatatat???');
    }); //end

    this.Service.CAInfradata().subscribe((data) => {
      this.CAInfradata = data;
      // console.log(this.CAInfradata, 'checkkkkCAInfradata00000000o');
      this.ApplicationbyEnvironment();
    }); //end

    this.Service.getcamaster().subscribe((data) => {
      this.caAppList = data;
      //  console.log(
      //  this.caAppList,
      //   '////////////////////getcamaster///////////getcamaster//////////'
      //  );
      this.ApplicationCriticality();
      this.AppbyDatacriticality();
    });

    this.Service.getapppercent(this.orgId).subscribe((data) => {
      this.caappmasterdata = data[0].num;
      if (this.caappmasterdata == 0) {
        this.openDialog();
      }
      // console.log(this.caappmasterdata, 'ssssssssssssssssseeeeeeeeeeeeee');
    });

    this.Service.CAInframapping().subscribe((data) => {
      this.CAInframapping = data;
      // console.log(this.CAInframapping, 'CAInframappingCAInframapping');
    });

    this.Service.getvendoranddate(this.orgId).subscribe((data) => {
      // console.log(data, 'vendorcountvendorcountvendorcountvendorcount');
      this.vendorcount = data[0].vendorcount;
      this.updateddate = data[0].dateupdated;
      // this.updateddate = data[0].migration_Strategy;
     this.updateddate = this.updateddate.split(' ')[0]
    //  console.log(this.updateddate);
    //   console.log(this.updateddate, 'updateddateupdateddatevendorcount');
    });

    //OSData
    this.Service.getOStochart(this.orgId).subscribe((data) => {
      this.osdata = data;
      //this.createOSNamechart();
      let windows = 0;
      let linux = 0;
      let windowsServer = 0;
      this.osdata.map((m) => {
        if (m.name == 'Windows') windows = m.count;
        if (m.name == 'Linux') linux = m.count;
        // if(m.name=='Microsoft Windows Server 2012 Datacenter')
        // windowsServer = m.count;
      });
    });

    //Physical
    this.Service.getPhysicaltochart(this.orgId).subscribe((data) => {
      this.physicaldata = data;
      // console.log(this.physicaldata, 'checkkkkPhysical');
      //this.PhysicalvsVirtual();
    }); //end

    //OSvsData
    this.Service.OSvsData(this.orgId).subscribe((data) => {
      this.OSvsData = data;
      // console.log(this.OSvsData, 'checkkkkOSvsData');
      //this.OSvsDatachart();
    }); //end
    this.Service.LOBchart(this.orgId).subscribe((data) => {
      this.LOBchart = data;
      // console.log(this.LOBchart, 'LOBchartta');
      this.lobBarChart();
    }); //end
    this.Service.getlobcount(this.orgId).subscribe((data) => {
      this.lobdata = data;
      // console.log(this.lobdata,"getlobcountgetlobcountgetlobcountgetlobcount");
      
      // let hrms=0;let shared=0;let finance=0;let it=0;
      // console.log(this.lobdata, 'lobdata???????????????????????????');
      // let wpercent = 0;
      // let c = '#00416';
      // let outerdiv = document.getElementById('dynamicdiv');
      // outerdiv.style.width = '800px';
      // this.lobdata.map((m) => {
      //   wpercent = wpercent + parseInt(m.vendorcount);
      });

      // this.lobdata.map((m, i) => {
      //   let name = m.dateupdated.split(' ').join('');
      //   var nametag = document.createElement('span');
      //   var innerdiv = document.createElement('div');
      //   let ppercent = (m.vendorcount / wpercent) * 100;
      //   innerdiv.setAttribute('id', name);
      //   nametag.innerText = name;
      //   innerdiv.style.paddingRight = ppercent / 2 + '%';
      //   innerdiv.style.paddingLeft = ppercent / 2 + '%';
      //   innerdiv.style.cursor = 'pointer';
      //   innerdiv.innerText = name;
      //   innerdiv.addEventListener('click', () => {
      //     ////

      //     let reftodilog = this.dialogue;

      //     let displayelements = [];
      //     let list = this.lob;
      //     let appmastertable = this.caAppList;
      //     let topopup = [];
      //     console.log(list,"???");
          
      //     displayelements = [];

      //     topopup = [];
      //     list.map((x) => {
            
      //       if (x.lobName == m.dateupdated) {
      //         let lobid = x.lobId;
      //         appmastertable.map((f) => {
      //           if (f.lobId == lobid) {
      //             var obj = { lobname: '', appname: '', appid: 0 };
      //             obj.lobname = x.lobName;
      //             obj.appname = f.appName;
      //             obj.appid = f.appId;
      //             topopup.push(obj);
      //           }
      //         });
      //       }
      //     });
      //     var dref = reftodilog.open(ChartPopupComponent, {
      //       height: '75%',
      //       width: '60%',
      //       disableClose: false,
      //       data: {
      //         dataKey: topopup,
      //         title: m.dateupdated,

      //         piechartname: 'Application By LOB',
      //       },
      //     });

      //     //////
      //   });
      //   if (i % 2 == 0) {
      //     innerdiv.style.backgroundColor = c + i;
      //     innerdiv.style.color = 'white';
      //   } else {
      //     innerdiv.style.backgroundColor = 'lightblue';
      //     innerdiv.style.color = 'black';
      //   }
      //   outerdiv.appendChild(innerdiv);
      // });
    // }); //end

    //OScount stackedbar graph
    this.Service.Oscount().subscribe((data) => {
      this.Oscount = data;
      // console.log(this.Oscount, 'check OS COUNT GRAPHHHHHH');
      // this.OSvsDatachart();
    }); //end

    //Physical

    //OScount stackedbar graph
    this.Service.Environmentcount(this.orgId).subscribe((data) => {
      this.Environmentcount = data;
      let prodcount = 0;
      let devcount = 0;
      let testcount = 0;
      let preprodcount = 0;
      let drcount = 0;
      // console.log(this.Environmentcount, 'check Environmentcount GRAPHHHHHH');
      this.Environmentcount.map((m) => {
        if (m.migration_Strategy == 'Prod') prodcount = m.num;
        if (m.migration_Strategy == 'Pre Prod') preprodcount = m.num;
        if (m.migration_Strategy == 'Test') testcount = m.num;
        if (m.migration_Strategy == 'DR') drcount = m.num;
        if (m.migration_Strategy == 'Dev') devcount = m.num;
        // console.log(
        //   this.Environmentcount,
        //   'check Environmentcount COUNT GRAPHHHHHH'
        // );
      });

    
    }); //end
    //lobcount

    //infraapplication count
    this.Service.infradatacount(this.orgId).subscribe((data) => {
      this.infradatacount = data[0].num;
      // this.updateddate = data[0].migration_Strategy;
      // this.updateddate = this.updateddate.split(' ')[0];
      console.log(this.infradatacount, 'check infradatacount');
      //     //infraapplication count
    }); //end
  } //ngonInit

  AppbyDatacriticality() {
    this.Service.datacritical(this.orgId).subscribe((data) => {
      this.Datacriticalitydata = data;
      // console.log(
      //   this.Applicationcriticalitydata,
      //   'DatacriticalitydataApplicationcriticalitydata'
      // );
      this.Datacriticality();
    }); //end
  }

  ApplicationbyEnvironment() {
    //3.environmentvsServerbyAPP
    this.Service.EnvironmentvsServerbyAPP(this.orgId).subscribe((data) => {
      this.EnvironmentvsServerbyAPP = data;
      // console.log(this.EnvironmentvsServerbyAPP, 'EnvironmentvsServerbyAPP');
      this.EnvinornmentvsApp();
    }); //end
  }

  ApplicationCriticality() {
    this.Service.Applicationcriticalitygraph(this.orgId).subscribe((data) => {
      this.Applicationcriticalitydata = data;
      // console.log(
      //   this.Applicationcriticalitydata,
      //   'ApplicationcriticalitydataApplicationcriticalitydata'
      // );
      this.Applicationcriticality();
    }); //end
  }

  popup() {
    var dialogRef = this.dialogue.open(DashboardPopupComponent, {
      height: '50%',
      width: '40%',
      disableClose: true,
      data: 'test',
    });
    dialogRef.afterClosed().subscribe((result) => {
      let res = result;
    });
  }

  //
  EnvinornmentvsApp() {
    let chartdivarch = am4core.create('chartENV', am4charts.PieChart);
    let result = { migration_Strategy: '', num: 0 };
    let osdata2 = [];
    this.EnvironmentvsServerbyAPP.forEach((m) => {
      result.migration_Strategy = m.migration_Strategy;
      result.num = m.num;
      osdata2.push(result);
      result = { migration_Strategy: '', num: 0 };
    });

    chartdivarch.data = osdata2;
    // console.log(osdata2, 'checkkkkENVVVVVVVVVVdatatatat');
    let pieSeriesarch = chartdivarch.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    chartdivarch.legend = new am4charts.Legend();
    chartdivarch.legend.labels.template.maxWidth = 15;
    chartdivarch.legend.labels.template.truncate = true;

    pieSeriesarch.legendSettings.valueText = '{value}';
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
      am4core.color('#3A79F8'),
    ];
    pieSeriesarch.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    let reftodilog = this.dialogue;
    let valueselected = '';
    let displayelements = [];
    let list = this.CAInfradata;
    let CAInframappingApp = this.CAInframapping;
    let topopup = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      // console.log(topopup, '?????????????????????????????????');
      list.map((m) => {
        CAInframappingApp.map((f)=>{
        if (m.environment == valueselected && f.infra_Id==m.infraId ) {
          displayelements = [];
          displayelements.push(m);

          var obj = {
            Host_Name: '',
            IP_Address: '',
            Environment: '',
            Data_Center: '',
          };
          obj.Host_Name = m.hostName;
          obj.IP_Address = m.ipAddress;
          obj.Environment = m.environment;
          obj.Data_Center = m.dataCenter;
          topopup.push(obj);
        }
      });
    });
      var dref = reftodilog.open(InfraPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,
          datacenter: false,
          physicalvsvirtual: true,
          // Environment:true,
          piechartname: 'Application By Environment',
        },
      });
    });
  }
  ///////

  Applicationcriticality() {
    let chartdivarch = am4core.create(
      'chartApplicationcriticality',
      am4charts.PieChart
    );

    let result = { dateupdated: '', vendorcount: 0 };
    let osdata2 = [];
    this.Applicationcriticalitydata.forEach((m) => {
      result.dateupdated = m.dateupdated;
      result.vendorcount = m.vendorcount;
      osdata2.push(result);
      result = { dateupdated: '', vendorcount: 0 };
    });

    chartdivarch.data = osdata2;
    // console.log(
    //   osdata2,
    //   'checkkkkENVVVVVVVVVVdatatatat Applicationcriticalitydata'
    // );
    let pieSeriesarch = chartdivarch.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'vendorcount';
    pieSeriesarch.dataFields.category = 'dateupdated';
    chartdivarch.legend = new am4charts.Legend();
    pieSeriesarch.legendSettings.valueText = '{value}';
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
      am4core.color('#3A79F8'),
    ];
    pieSeriesarch.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    let reftodilog = this.dialogue;
    let valueselected;
    let displayelements = [];
    let list = this.caAppList;
    let locallob = this.lobmap;
    let topopup = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      list.map((m) => {
        if (m.applicationCriticality == valueselected) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m.lobId);
          obj.appname = m.appName;
          obj.appid = m.appId;
          topopup.push(obj);
        }
      });
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,

          piechartname: 'Application By Application Criticality',
        },
      });
    });
  }

  Datacriticality() {
    let chartdivarch = am4core.create(
      'chartdatacriticality',
      am4charts.PieChart
    );
    let result = { dateupdated: '', vendorcount: 0 };
    let osdata2 = [];
    this.Datacriticalitydata.forEach((m) => {
      result.dateupdated = m.dateupdated;
      result.vendorcount = m.vendorcount;
      osdata2.push(result);
      result = { dateupdated: '', vendorcount: 0 };
    });

    chartdivarch.data = osdata2;
    // console.log(
    //   osdata2,
    //   'checkkkkENVVVVVVVVVVdatatatat Applicationcriticalitydata'
    // );
    let pieSeriesarch = chartdivarch.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'vendorcount';
    pieSeriesarch.dataFields.category = 'dateupdated';
    chartdivarch.legend = new am4charts.Legend();
    pieSeriesarch.legendSettings.valueText = '{value}';
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
      am4core.color('#3A79F8'),
    ];
    pieSeriesarch.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    let reftodilog = this.dialogue;
    let valueselected;
    let displayelements = [];
    let list = this.caAppList;
    let locallob = this.lobmap;
    let topopup = [];
    // console.log(list, '/Applist????????????????????????????????????');
    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      // console.log("clicked on piechart ", ev.target);

      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      list.map((m) => {
        if (m.dataCatApp == valueselected) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m.lobId);
          obj.appname = m.appName;
          obj.appid = m.appId;
          topopup.push(obj);
        }
      });
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,
          Datacriticalitydata: true,
          Applicationcriticalitydata: false,
          piechartname: 'Application By Data Criticality',
        },
      });
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialogue.open(DialogboxComponent, {
      width: '40%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      disableClose: true,
      autoFocus: true,
      id: 'modal-component',

      data: {
        dataKey: this.appReport,
      },
    });
  


  
  }
  getlobcount(){
    this.Service.getlobcount(this.orgId).subscribe((data:any[]) => {
      data.map(m=>{
        this.loblist.push(m);
        // console.log(this.loblist,"loblist");
      })
      this.lobBarChart();
    })
  }

  

lobBarChart(){
  // xy bar graph ip
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
  // console.log(DatavsIP, 'LOBOBOBOBOBOBBBB');
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

  seriesapp1.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  seriesapp1.columns.template.tooltipText =
    'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';
  seriesapp1.columns.template.fill = am4core.color('#00416D'); // fill
  seriesapp1.dataFields.valueY = 'num';
  seriesapp1.dataFields.categoryX = 'DataCat';

 

  // let reftodilog = this.dialogue;
  let valueclicked=[];
let arraytodisplay=[];
let displayelementchart = [];
let reftodilog = this.dialogue;
 let localcaapplist = [];
 localcaapplist = this.caAppList

 let locallobmap= this.lobbmap ;


 seriesapp1.columns.template.events.on("hit", function(ev) {
  // console.log("clicked on ", ev.target);
  // series.columns.template.events.on("hit", function(ev) {
  //   console.log("clicked on ", ev.target);
  // }, this);
  // valueclicked = ev.target.dataItem.properties.category;
  // let name =ev.target.dataItem.categoryX;
let name= ev.target.dataItem.categoryX;
  arraytodisplay=[]

  displayelementchart = [];
  let lobid = locallobmap.get(name);
  arraytodisplay = [];
  localcaapplist.map((m) => {
    if(m.lobId==lobid){
      let obj={lobname:'',appid:'',appname:''}
      obj.appid=m.appId;
      obj.appname=m.appName;
      obj.lobname=name;
     arraytodisplay.push(obj);
    }







   });
  //  console.log(arraytodisplay,'//////////////');
   var dref = reftodilog.open(ChartPopupComponent, {
    height: '75%',
    width: '60%',
    disableClose: false,
    data: {
      dataKey: arraytodisplay,
      title: name,

      piechartname: 'Application by LOB',
    },
  });
   
});

  




  
  //     let displayelements = [];
  //     let list = this.lob;
  //     let appmastertable = this.caAppList;
  //     let topopup = [];
  //     console.log(list,"???");
      
  //     displayelements = [];

  //     topopup = [];
  //     list.map((x) => {
        
  //       if (x.lobName == m.dateupdated) {
  //         let lobid = x.lobId;
  //         appmastertable.map((f) => {
  //           if (f.lobId == lobid) {
  //             var obj = { lobname: '', appname: '', appid: 0 };
  //             obj.lobname = x.lobName;
  //             obj.appname = f.appName;
  //             obj.appid = f.appId;
  //             topopup.push(obj);
  //           }
  //         });
  //       }
  //     });
  //     var dref = reftodilog.open(ChartPopupComponent, {
  //       height: '75%',
  //       width: '60%',
  //       disableClose: false,
  //       data: {
  //         dataKey: topopup,
  //         title: m.dateupdated,

  //         piechartname: 'Application By LOB',
  //       },
  //     });

}

}

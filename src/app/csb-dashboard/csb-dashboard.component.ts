import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { HTTPService } from '../service/httpService.service';
import { MatDialog } from '@angular/material/dialog';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { CategoryAxis, ValueAxis } from '@amcharts/amcharts4/charts';
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';
import { Router } from '@angular/router';
import { DashboardPopupComponent } from '../dialog-reports/dashboard-popup/dashboard-popup.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { DialogReportsComponent } from '../dialog-reports/dialog-reports.component';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ChartPopupComponent } from '../chart-popup/chart-popup.component';
import { InfraPopupComponent } from '../infra-popup/infra-popup.component';

// import { ApplicationPopupComponent } from '../application-popup/application-popup.component';

@Component({
  selector: 'app-csb-dashboard',
  templateUrl: './csb-dashboard.component.html',
  styleUrls: ['./csb-dashboard.component.css'],
})
export class CsbDashboardComponent implements OnInit {
  lobarr = [];
  arrtohtml = [];
  modelobject = {
    lobname: '',
    total: '',
    active: '',
    notactiveapplications: [],
  };
  loblist: any;
  modelobjectArray = [];
  @ViewChild('chartElement') chartElement: ElementRef<HTMLElement>;
  rehostcount=0;
  replatformcount=0;
  replacecount=0;
  csbReport: string = 'CSB Dashboard';
  rearchiturecount=0;
  retaincount=0;
  retirecount=0;
  rlanesubtitle = '';
  test = [];
  subTitle = '';
  rlanePercent: any; 
  rlanecount = 0;
  noofenvironment: any;
  Environmentcounting: any;
  // popup1=true;

  infradatacountdisplay = 0;
  Environmentcount: any;
  osdata: any;
  lobdata: any;
  appSurvey: boolean = false;
  caappmasterdata: any;
  evaluatedapps: any;
  applicationcount = 0;
  Rlane: any;
  infradatacount: any;
  updateddate: any;
  lobcount: any;

  vendorcount = 0;
  datacentercount = 0;
  ApplicationSurveycount: any;
  CAAppMaster: any;
  lob: any;
  lobmap: any;
  CAInfradata: any;
  datacentreview: object;
  orgId: any;
  constructor(
    private Service: HTTPService,
    private dialogue: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");

    this.Service.CAAppMaster(this.orgId).subscribe((data:any[]) => {
      this.CAAppMaster = data;
      // this.CAAppMaster=undefined;
     if(data.length==0)
     {
this.popup();
     }
 
    });

    this.Service.CAInfradata().subscribe((data) => {
      this.CAInfradata = data;
    }); //end

    this.Service.getLobs(this.orgId).subscribe((data) => {
      this.lob = data;
      let d = new Map();
      //count starts
      this.lob.map((m) => {
        d.set(m.lobId, m.lobName);
      });
      this.lobmap = d;
    }); //end
  }
  popup() {
    var dialogRef = this.dialogue.open(DialogboxComponent, {
      width: '40%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',

      disableClose: true,

      data: {
        dataKey: this.csbReport,
      },
    });
    // this.popup1=false;
    //this.router.navigate(['/dashboardpopup'])
    dialogRef.afterClosed().subscribe((result) => {
      let res = result;
    });
  }
  appque() {
    this.router.navigate(['/appque']);
  }
  ngAfterViewInit() {
    this.getrlanedata();
    this.getappPercent();

    this.Service.datacentreview(this.orgId).subscribe((data) => {
      this.datacentercount = Object.keys(data).length;
    });

    this.Service.ApplicationSurveycount(this.orgId).subscribe((data) => {
      this.ApplicationSurveycount = data;
      let marr = [];
      
      this.ApplicationSurveycount.map((m, i) => {
        let lobobj = { lobname: '', app: [] };
        let application = { appname: '', activestatus: '' };
        if (i == 0) {
          lobobj = { lobname: '', app: [] };
          application = { appname: '', activestatus: '' };
          application.appname = m.app_Name;
          application.activestatus = m.app_Suv_Status;
          lobobj.lobname = m.lob_Name;
          lobobj.app.push(application);
          marr.push(lobobj);
        } else {
          marr.map((f) => {
            lobobj = { lobname: '', app: [] };
            application = { appname: '', activestatus: '' };
            if (f.lobname == m.lob_Name) {
              application.appname = m.app_Name;
              application.activestatus = m.app_Suv_Status;
              f.app.push(application);
            } else {
              lobobj = { lobname: '', app: [] };
              application = { appname: '', activestatus: '' };
              lobobj.lobname = m.lob_Name;
              application.appname = m.app_Name;
              application.activestatus = m.app_Suv_Status;
              lobobj.app.push(application);
            }
          });
          marr.push(lobobj);
        }
      });
      marr.filter((f) => {
        if (f.lobname !== '') {
          this.modelobjectArray.push(f);
        }
      });
      console.log(this.modelobjectArray,"model object ");
      
      let newarrtohtml = [];
      this.modelobjectArray.filter((f, i) => {
        if (i == 0) {
          this.arrtohtml.push(f);
        } 
        else if (f.lobname !== this.modelobjectArray[i - 1].lobname) {
          this.arrtohtml.push(f);
        }
      });
      
      newarrtohtml = this.arrtohtml;
      let res =[];
      this.arrtohtml.map((m,i)=>{
        if(i==0){
          res.push(m);
        }
        else{
          let pusar = [];
        for(let j=0;j<res.length;j++){
          let pushing =true;
          if(res[j].lobname != m.lobname){
              pushing = true;     pusar.push(pushing);       
          }else{
            pushing = false; pusar.push(pushing);  
          }
        }
      
        if(!pusar.includes(false)){
          res.push(m);
        }
      }
      });
      this.arrtohtml = res;
      
      this.arrtohtml.map((m) => {
        this.modelobject = {
          lobname: '',
          total: '',
          active: '',
          notactiveapplications: [],
        };
        this.modelobject.total = m.app.length;
        this.modelobject.lobname = m.lobname;
        let c = 0;
        m.app.map((h) => {
          if (h.activestatus == 1) {
            c = c + 1;
          } else {
            this.modelobject.notactiveapplications.push(h);
          }
        });
        this.modelobject.active = c + '';
        this.lobarr.push(this.modelobject);
      });
    });

   

    this.Service.infradatacount(this.orgId).subscribe((data) => {
      // this.infradatacountdisplay=Object.keys(data).length=0;

      if (Object.keys(data).length > 0) {
        this.infradatacountdisplay = data[0].num;
        this.updateddate = data[0].migration_Strategy;
        this.updateddate = this.updateddate.split(' ')[0];
      } else if (Object.keys(data).length == 0) {
        // this.popup();
      } else {
      }

      //     //infraapplication count
    }); //end

    //lobcount
    this.Service.getLobs(this.orgId).subscribe((data) => {
      let count = 0;
      this.lobcount = data;
      this.loblist = data;

      this.lobcount.map((m) => {
        count = count + 1;
      });
      this.lobcount = count;


      let d = new Map();
      //count starts
      this.lob.map((m) => {

        d.set(m.lobId,m.lobName);
      });
     

      
    }); //end

    this.Service.getvendoranddate(this.orgId).subscribe((data) => {
      this.vendorcount = data[0].vendorcount;
      this.updateddate = data[0].dateupdated;
      this.updateddate = this.updateddate.split(' ')[0];
    });

    //OSData
    this.Service.getOStochart(this.orgId).subscribe((data) => {
      this.osdata = data;

      let wpercent = 0;
      let c = '#00416';
      let outerdiv = document.getElementById('dynamicdiv');
      outerdiv.style.width = '200px';
      this.osdata.map((m) => {
        wpercent = wpercent + parseInt(m.count);
      });

      this.osdata.map((m, i) => {
        let name = m.name.split(' ').join('');
        var nametag = document.createElement('span');
        var innerdiv = document.createElement('div');
        let ppercent = (m.count / wpercent) * 100;
        innerdiv.setAttribute('id', name);
        nametag.innerText = name;
        innerdiv.style.paddingRight = ppercent / 2 + '%';
        innerdiv.style.paddingLeft = ppercent / 2 + '%';
        innerdiv.style.cursor = 'pointer';
        innerdiv.innerText = name;
        innerdiv.addEventListener('click', () => {
          ////

          let reftodilog = this.dialogue;

          let displayelements = [];

          let infratable = this.CAInfradata;
          let topopup = [];

          displayelements = [];

          topopup = [];

          infratable.map((f) => {
            if (f.osType == m.name) {
              var obj = {
                Host_Name: '',
                IP_Address: '',
                Environment: '',
                Data_Center: '',
              };
              obj.Host_Name = f.hostName;
              obj.IP_Address = f.ipAddress;
              obj.Environment = f.environment;
              obj.Data_Center = f.dataCenter;
              topopup.push(obj);
            }
          });

          var dref = reftodilog.open(InfraPopupComponent, {
            height: '75%',
            width: '60%',
            disableClose: false,
            data: {
              dataKey: topopup,
              title: m.name,
              datacenter: false,
              physicalvsvirtual: true,
              piechartname: 'OS Type',
            },
          });

          //////
        });
        if (i % 2 == 0) {
          innerdiv.style.backgroundColor = c + i;
          innerdiv.style.color = 'white';
        } else {
          innerdiv.style.backgroundColor = 'lightblue';
          innerdiv.style.color = 'black';
        }
        outerdiv.appendChild(innerdiv);
      });
    }); //end
    this.Service.getOStochart(this.orgId).subscribe((data) => {
      this.osdata = data;
      // this.createOSNamechart();
      let windows = 0;
      let linux = 0;
      let windowsServer = 0;
      this.osdata.map((m) => {
        if (m.name == 'Windows') windows = m.count;
        if (m.name == 'Linux') linux = m.count;
      });
      windows = Math.round(windows / 3);
      // windowsServer =  Math.round(windowsServer/3);
      linux = Math.round(linux / 3);

      var prod = document.getElementById('windows');
      prod.style.width = windows + 'px';
      prod.style.backgroundColor = '#00416D';

      var preprod = document.getElementById('Linux');
      preprod.style.width = linux + 'px';
      preprod.style.backgroundColor = '#007ACC';
    });

    //OScount stackedbar graph Environment
    this.Service.Environmentcount(this.orgId).subscribe((data) => {
      this.Environmentcount = data;

      this.Environmentcounting = Object.keys(data).length;

      let wpercent = 0;
      let c = '#00416';
      let outerdiv = document.getElementById('dynamicdivenv');
      outerdiv.style.width = '400px';
      this.Environmentcount.map((m) => {
        wpercent = wpercent + parseInt(m.num);
      });

      this.Environmentcount.map((map, i) => {
        let name = map.migration_Strategy.split(' ').join('');
        var nametag = document.createElement('span');
        var innerdiv = document.createElement('div');
        let ppercent = (map.num / wpercent) * 100;
        innerdiv.setAttribute('id', name);
        nametag.innerText = name;
        innerdiv.style.paddingRight = ppercent / 2 + '%';
        innerdiv.style.paddingLeft = ppercent / 2 + '%';
        innerdiv.style.cursor = 'pointer';
        // innerdiv.innerText = name;
        innerdiv.appendChild(nametag);
        if (i % 2 == 0) {
          innerdiv.style.backgroundColor = c + i;
          innerdiv.style.color = 'white';
        } else {
          innerdiv.style.backgroundColor = 'lightblue';
          innerdiv.style.color = 'black';
        }
        outerdiv.appendChild(innerdiv);
        innerdiv.addEventListener('click', () => {
          let reftodilog = this.dialogue;
          let displayelements = [];
          let list = this.CAInfradata;
          let topopup = [];
          displayelements = [];
          topopup = [];
          list.map((m) => {
            if (m.environment.split(' ').join('') == name) {
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
          var dref = reftodilog.open(InfraPopupComponent, {
            height: '75%',
            width: '60%',
            disableClose: false,
            data: {
              dataKey: topopup,
              title: name,
              datacenter: false,
              physicalvsvirtual: true,
              // Environment:true,
              piechartname: 'Environment',
            },
          });
        });
      });
    });

    //lob name n count
    this.Service.getlobcount(this.orgId).subscribe((data) => {
      this.lobdata = data;
    });
  }
  // total progress
  getappPercent() {
    this.Service.getapppercent(parseInt(this.orgId)).subscribe((data) => {
      this.caappmasterdata = data;

      if (this.caappmasterdata) {
        let a = this.caappmasterdata[1].num;
        let b = this.caappmasterdata[0].num;
        this.subTitle = a + '/' + b;
        this.applicationcount = this.caappmasterdata[0].num;

        this.evaluatedapps = (a / b) * 100;

        this.createradar();
        this.getrlanedata();
      }
    }); // total progressends
  }

 

  createradar() {
    var chart = am4core.create(
      'chartdivEnvironmentvsServer',
      am4charts.RadarChart
    );

    let resultretiredapp = { DataCat: '', num: 0 };
    let DatavsIP = [];
    this.Rlane.forEach((m) => {
      resultretiredapp.DataCat = m.migration_Strategy;
      resultretiredapp.num = m.num;
      DatavsIP.push(resultretiredapp);
      this.rlanecount = this.rlanecount + m.num;
      resultretiredapp = { DataCat: '', num: 0 };
    });

    this.calculaterlanePercent();

    chart.data = DatavsIP;

    /* Create axes */
    var categoryAxis = chart.xAxes.push(
      new CategoryAxis<am4charts.AxisRendererCircular>()
    );
    // categoryAxis._renderer._gridType =

    categoryAxis.dataFields.category = 'DataCat';
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.001;

    var valueAxis = chart.yAxes.push(
      new ValueAxis<am4charts.AxisRendererRadial>()
    );
    valueAxis.renderer.gridType = 'polygons';
    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

    /* Create and configure series */
    var series = chart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = 'num';
    series.dataFields.categoryX = 'DataCat';
    series.name = 'DataCat';
    series.strokeWidth = 3;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.lineY.disabled = true;
    chart.cursor.lineX.fill = chart.colors.getIndex(3);
    chart.cursor.lineX.fillOpacity = 0.3;
  }

  calculaterlanePercent() {
    debugger;

    this.rlanePercent = (this.rlanecount / this.applicationcount) * 100;
    this.rlanesubtitle = this.rlanecount + '/' + this.applicationcount;
    if (this.rlanecount > 0) {
      this.appSurvey = true;
    }
  }

  Rehostingdata() {
    debugger;
    let chartdivphysical = am4core.create('rehosting', am4charts.PieChart);
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    resultphysical.num = this.rehostcount;
    resultphysical.migration_Strategy = 'rehost';
    physicaldata.push(resultphysical);
    resultphysical = { migration_Strategy: '', num: 0 };
    resultphysical.num = this.rlanecount;

    resultphysical.migration_Strategy = 'total';
    physicaldata.push(resultphysical);
    console.log(physicaldata,"physicaldata");
    
    chartdivphysical.data = physicaldata;

    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    // chartdivphysical.legend = new am4charts.Legend();
    pieSeriesarch.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
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
    

    let reftodilog = this.dialogue;
    let valueselected;
    let displayelements = [];
    let list = this.CAAppMaster;
    let locallob = this.lobmap;
    let topopup = [];
    let aa = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      aa = [];
      list.map((m) => {
        if (m[0].rlaneStrategyId == 1 && valueselected == 'rehost') {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          topopup.push(obj);
        } else if (valueselected != 'rehost' && m[0].rlaneStrategyId != 0) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          aa.push(obj);
        }
      });
      if (aa.length > 0) {
        topopup = aa;
      }
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,
          Applicationcriticalitydata: true,
          Datacriticalitydata: false,
          piechartname: 'Rehost',
        },
      });
    });
  }

  Replatformdata() {
    debugger;
    let chartdivphysical = am4core.create('Replatformdata', am4charts.PieChart);
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    resultphysical.num = this.replatformcount;
    resultphysical.migration_Strategy = 'Replatform';
    physicaldata.push(resultphysical);
    resultphysical = { migration_Strategy: '', num: 0 };
    resultphysical.num = this.rlanecount;
    resultphysical.migration_Strategy = 'total';
    physicaldata.push(resultphysical);

    chartdivphysical.data = physicaldata;

    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    // chartdivphysical.legend = new am4charts.Legend();

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
    let list = this.CAAppMaster;
    let locallob = this.lobmap;
    let topopup = [];
    let aa = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      aa = [];
      list.map((m) => {
        if (m[0].rlaneStrategyId == 3 && valueselected == 'Replatform') {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          topopup.push(obj);
        } else if (valueselected != 'Replatform' && m[0].rlaneStrategyId != 0) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          aa.push(obj);
        }
      });
      if (aa.length > 0) {
        topopup = aa;
      }
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,

          piechartname: 'Replatform',
        },
      });
    });
  }

  Repurchasingdata() {
    debugger;
    let chartdivphysical = am4core.create('Replacedata', am4charts.PieChart);
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    resultphysical.num = this.replacecount;
    resultphysical.migration_Strategy = 'Replace';
    physicaldata.push(resultphysical);
    resultphysical = { migration_Strategy: '', num: 0 };
    resultphysical.num = this.rlanecount;
    resultphysical.migration_Strategy = 'total';
    physicaldata.push(resultphysical);

    chartdivphysical.data = physicaldata;

    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    // chartdivphysical.legend = new am4charts.Legend();

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
    let list = this.CAAppMaster;
    let locallob = this.lobmap;
    let topopup = [];
    let aa = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      aa = [];
      list.map((m) => {
        if (m[0].rlaneStrategyId == 6 && valueselected == 'Replace') {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          topopup.push(obj);
        } else if (valueselected != 'Replace' && m[0].rlaneStrategyId != 0) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          aa.push(obj);
        }
      });
      if (aa.length > 0) {
        topopup = aa;
      }
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,

          piechartname: 'Replace',
        },
      });
    });
  }

  Rearchitecting() {
    let chartdivphysical = am4core.create(
      this.chartElement.nativeElement,
      am4charts.PieChart
    );
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    resultphysical.num = this.rearchiturecount;
    resultphysical.migration_Strategy = 'Rearchitect';
    physicaldata.push(resultphysical);
    resultphysical = { migration_Strategy: '', num: 0 };
    resultphysical.num = this.rlanecount;
    resultphysical.migration_Strategy = 'total';
    physicaldata.push(resultphysical);

    chartdivphysical.data = physicaldata;

    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    // chartdivphysical.legend = new am4charts.Legend();

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
    let list = this.CAAppMaster;
    let locallob = this.lobmap;
    let topopup = [];
    let aa = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      aa = [];
      list.map((m) => {
        if (m[0].rlaneStrategyId == 4 && valueselected == 'Rearchitect') {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          topopup.push(obj);
        } else if (valueselected != 'Rearchitect' && m[0].rlaneStrategyId != 0) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          aa.push(obj);
        }
      });
      if (aa.length > 0) {
        topopup = aa;
      }
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,

          piechartname: 'Rearchitect',
        },
      });
    });
  }

  Retaindata() {
    let chartdivphysical = am4core.create('Retaindata', am4charts.PieChart);
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    resultphysical.num = this.retaincount;
    resultphysical.migration_Strategy = 'Retain';
    physicaldata.push(resultphysical);
    resultphysical = { migration_Strategy: '', num: 0 };
    resultphysical.num = this.rlanecount;
    resultphysical.migration_Strategy = 'total';

    physicaldata.push(resultphysical);

    chartdivphysical.data = physicaldata;

    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    // chartdivphysical.legend = new am4charts.Legend();

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
    let list = this.CAAppMaster;
    let locallob = this.lobmap;
    let topopup = [];
    let aa = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      aa = [];
      list.map((m) => {
        if (m[0].rlaneStrategyId == 2 && valueselected == 'Retain') {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          topopup.push(obj);
        } else if (valueselected != 'Retain' && m[0].rlaneStrategyId != 0) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          aa.push(obj);
        }
      });
      if (aa.length > 0) {
        topopup = aa;
      }
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,

          piechartname: 'Retain',
        },
      });
    });
  }

  Retire() {
    let chartdivphysical = am4core.create('Retiredata', am4charts.PieChart);
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    resultphysical.num = this.retirecount;
    resultphysical.migration_Strategy = 'ReBuild';
    physicaldata.push(resultphysical);
    resultphysical = { migration_Strategy: '', num: 0 };
    resultphysical.num = this.rlanecount;
    resultphysical.migration_Strategy = 'total';
    physicaldata.push(resultphysical);

    chartdivphysical.data = physicaldata;

    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    // chartdivphysical.legend = new am4charts.Legend();

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
    let list = this.CAAppMaster;
    let locallob = this.lobmap;
    let topopup = [];
    let aa = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      aa = [];
      list.map((m) => {
        if (m[0].rlaneStrategyId == 5 && valueselected == 'ReBuild') {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          topopup.push(obj);
        } else if (valueselected != 'ReBuild' && m[0].rlaneStrategyId != 0) {
          displayelements.push(m);
          var obj = { lobname: '', appname: '', appid: 0 };
          obj.lobname = locallob.get(m[0].lobId);
          obj.appname = m[0].appName;
          obj.appid = m[0].appId;
          aa.push(obj);
        }
      });
      if (aa.length > 0) {
        topopup = aa;
      }
      var dref = reftodilog.open(ChartPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,

          piechartname: 'ReBuild',
        },
      });
    });
  }

  getrlanedata() {
    
    this.Service.getmigrationdata(this.orgId).subscribe((data) => {
      this.Rlane = data;
      

      this.Rlane.map((m) => {
        if (m.migration_Strategy == 'Rehost') {
          this.rehostcount = m.num;
        }
        if (m.migration_Strategy == 'Replatform') {
          this.replatformcount = m.num;
        }

        if (m.migration_Strategy == 'Replace') {
          this.replacecount = m.num;
        }

        if (m.migration_Strategy == 'Rearchitect') {
          this.rearchiturecount = m.num;
        }
        if (m.migration_Strategy == 'Retain') {
          this.retaincount = m.num;
        }
        if (m.migration_Strategy == 'ReBuild') {
          this.retirecount = m.num;
        }
      });
    });

    this.Rearchitecting();
    this.Repurchasingdata();

    this.Replatformdata();
    this.Rehostingdata();
    this.Retaindata();
    this.Retire();
  }

  appnamechanged(event, lobname) {
    let selectedappid = '';
    let selectedlobid = '';

    this.CAAppMaster.map((m) => {
      if (m[0].appName == event) {
        selectedappid = m[0].appId;
      }
    });
    this.loblist.map((m) => {
      if (lobname == m.lobName) {
        selectedlobid = m.lobName;
      }
    });
    sessionStorage.removeItem('apploblist');
    sessionStorage.removeItem('appidfrompopup');
    sessionStorage.removeItem('appnamefrompopup');

    sessionStorage.setItem('apploblist', selectedlobid);
    sessionStorage.setItem('appidfrompopup', selectedappid);
    sessionStorage.setItem('appnamefrompopup', event);
    this.router.navigate(['/appque']);
  }



}

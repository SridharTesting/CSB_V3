import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../service/httpService.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { count } from 'rxjs/operators';
import { DashboardPopupComponent } from '../dialog-reports/dashboard-popup/dashboard-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ChartPopupComponent } from '../chart-popup/chart-popup.component';
import { InfraPopupComponent } from '../infra-popup/infra-popup.component';

@Component({
  selector: 'app-infra-discovery',
  templateUrl: './infra-discovery.component.html',
  styleUrls: ['./infra-discovery.component.css'],
})
export class InfraDiscoveryComponent implements OnInit {
  osdata: any;
  physicaldata: any;
  OSvsData: any;
  Oscount: any;
  Environmentcount: any;
  lobcount: any;
  infradatacount: any;
  infraReport: string = 'Infra Discovery Report';
  caappmasterdata: any;
  updateddate: any;
  EnvironmentvsServerbyDATA: any;
  CAInfradata: any;
  caAppList: any;
  lobmap: any;
  CAInframapping: any;
  orgId:any;
  constructor(
    private Service: HTTPService,
    private router: Router,
    private dialogue: MatDialog
  ) {}
  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
  }
  ngAfterViewInit() {
    this.Service.CAInfradata().subscribe((data) => {
      this.CAInfradata = data;
      // console.log(this.CAInfradata, 'checkkkkCAInfradata00000000o');
      this.createphysicalchart();
      this.creatOSVS();
      this.Environment();
    }); //end

    this.Service.datacentreview(this.orgId).subscribe((data) => {
      this.caappmasterdata = Object.keys(data).length;
      if (this.caappmasterdata == 0) {
        console.log('SUmana testing' + this.caappmasterdata);
        //this.openDialog();
      }
      // console.log(this.caappmasterdata, 'ssssssssssssssssseeeeeeeeeeeeee');
    });
   
    //OSData
    this.Service.getOStochart(this.orgId).subscribe((data) => {
      this.osdata = data;
    
      // console.log(this.osdata, 'osdataosdataosdataosdataosdata');
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
          // console.log(m.name);

          let reftodilog = this.dialogue;

          let displayelements = [];

          let infratable = this.CAInfradata;
          let topopup = [];

          displayelements = [];

          topopup = [];

          infratable.map((f) => {
            if (f.osType == m.name) {
              var obj = { Host_Name:'',	IP_Address:'',	Environment:'',	Data_Center:'' };
              obj.Host_Name = f.hostName;
              obj.IP_Address = f.ipAddress;
              obj.Environment = f.environment;
              obj.Data_Center =  f.dataCenter;
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

    //OScount stackedbar graph
    this.Service.Oscount().subscribe((data) => {
      this.Oscount = data;
      // console.log(this.Oscount, 'check OS COUNT GRAPHHHHHH');
      // this.OSvsDatachart();
    }); //end

   

    //OScount stackedbar graph
    this.Service.Environmentcount(this.orgId).subscribe((data) => {
      this.Environmentcount = data;
      // console.log(
      //   this.Environmentcount,
      //   'check Environmentcount COUNT GRAPHHHHHH'
      // );

      // console.log(
      //   this.Environmentcount,
      //   'EnvironmentcountEnvironmentcountEnvironmentcountEnvironmentcountEnvironmentcount'
      // );
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

    // let prodcount = 0;
    // let devcount = 0;
    // let testcount = 0;
    // let preprodcount = 0;
    // let drcount = 0;
    // console.log(this.Environmentcount, 'check Environmentcount GRAPHHHHHH');
    // this.Environmentcount.map((m) => {
    //   if (m.migration_Strategy == 'Prod') prodcount = m.num;
    //   if (m.migration_Strategy == 'Pre Prod') preprodcount = m.num;
    //   if (m.migration_Strategy == 'Test') testcount = m.num;
    //   if (m.migration_Strategy == 'DR') drcount = m.num;
    //   if (m.migration_Strategy == 'Dev') devcount = m.num;

    // prodcount = Math.round(prodcount / 3);
    // devcount = Math.round(devcount / 3);
    // testcount = Math.round(testcount / 3);
    // preprodcount = Math.round(preprodcount / 3);
    // drcount = Math.round(drcount / 3);

    // var prod = document.getElementById('Prod');
    // prod.style.width = prodcount + 'px';
    // prod.style.backgroundColor = '#00416D';

    // var preprod = document.getElementById('Pre-prod');
    // preprod.style.width = preprodcount + 'px';
    // preprod.style.backgroundColor = '#007ACC';

    // var test = document.getElementById('Test');
    // test.style.width = testcount + 'px';
    // test.style.backgroundColor = 'rgba(0, 65, 109, 0.8)';

    // var Dev = document.getElementById('Dev');
    // Dev.style.width = devcount + 'px';
    // Dev.style.backgroundColor = '#00416D';

    // var DR = document.getElementById('DR');
    // DR.style.width = drcount + 'px';
    // DR.style.backgroundColor = '#99D6FF';

    //end
    //lobcount
    this.Service.getLobs(this.orgId).subscribe((data) => {
      let count = 0;
      this.lobcount = data;
      // console.log(this.lobcount, 'check lobcount lobcount checkcheck');
      this.lobcount.map((m) => {
        count = count + 1;
      });
      this.lobcount = count;
      // console.log(this.lobcount, 'check lobcount lobcount');
    }); //end

    //infraapplication count
    this.Service.infradatacount(this.orgId).subscribe((data) => {
      this.infradatacount = data[0].num;
      this.updateddate = data[0].migration_Strategy;
      this.updateddate = this.updateddate.split(' ')[0];
      // console.log(this.infradatacount, 'check infradatacount');
      //     //infraapplication count
    }); //end
  } //ngonInit

  
  createphysicalchart() {
    //Physical
    this.Service.getPhysicaltochart(this.orgId).subscribe((data) => {
      this.physicaldata = data;
      // console.log(this.physicaldata, 'checkkkkPhysical');
      this.PhysicalvsVirtual();
    }); //end
  }

  creatOSVS() {
    //Physical
    this.Service.OSvsData(this.orgId).subscribe((data) => {
      this.OSvsData = data;
      // console.log(this.OSvsData, 'checkkkkOSvsData');
      this.OSvsDatachart();
    }); //end
  }

  Environment() {
    //4. EnvironmentvsServerbyDATA
    this.Service.EnvironmentvsServerbyDATA(this.orgId).subscribe((data) => {
      this.EnvironmentvsServerbyDATA = data;
      // console.log(this.EnvironmentvsServerbyDATA, 'EnvironmentvsServerbyDATA');
      this.EnvironmentvsServerDatachart();
    }); //end
  }

  PhysicalvsVirtual() {
    let chartdivphysical = am4core.create(
      'chartdivphysical',
      am4charts.PieChart
    );
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    this.physicaldata.forEach((m) => {
      resultphysical.migration_Strategy = m.migration_Strategy;
      resultphysical.num = m.num;
      physicaldata.push(resultphysical);
      resultphysical = { migration_Strategy: '', num: 0 };
    });

    chartdivphysical.data = physicaldata;
    // console.log(physicaldata, 'checkkkkPhysical??????????????');
    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    chartdivphysical.legend = new am4charts.Legend();
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
    let topopup = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      list.map((m) => {
        if (m.physicalOrVirtual && m.physicalOrVirtual.toLowerCase() == valueselected.toLowerCase()) {
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
          title: valueselected,
          datacenter: false,
          physicalvsvirtual: true,
          piechartname: 'Physical VS Virtual',
        },
      });
    });
  }

  OSvsDatachart() {
    let chartdivarch = am4core.create('chartOSvsData', am4charts.PieChart);
    let result = { name: '', count: 0 };
    let osdata1 = [];
    this.OSvsData.forEach((m) => {
      result.name = m.name;
      result.count = m.count;
      osdata1.push(result);
      result = { name: '', count: 0 };
    });

    chartdivarch.data = osdata1;
    // console.log(osdata1, 'checkkkkOSvsData??????????????');
    let pieSeriesarch = chartdivarch.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'count';
    pieSeriesarch.dataFields.category = 'name';
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
    let valueselected = '';
    let displayelements = [];
    let list = this.CAInfradata;
    let topopup = [];

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      list.map((m) => {
        if (m.dataCenter == valueselected) {
          displayelements.push(m);
          var obj = {
            Host_Name: '',
            IP_Address: '',
            Environment: '',
            Server_Type: '',
          };
          obj.Host_Name = m.hostName;
          obj.IP_Address = m.ipAddress;
          obj.Environment = m.environment;
          obj.Server_Type = m.serverType;
          topopup.push(obj);
        }
      });
      var dref = reftodilog.open(InfraPopupComponent, {
        height: '75%',
        width: '60%',
        disableClose: false,
        data: {
          dataKey: topopup,
          title: valueselected,
          datacenter: true,
          physicalvsvirtual: false,
          piechartname: 'Servers by Data Center',
        },
      });
    });
  }

  EnvironmentvsServerDatachart() {
    let chartdivphysical = am4core.create(
      'chartdivEnvironmentvsServer',
      am4charts.PieChart
    );
    let resultphysical = { migration_Strategy: '', num: 0 };
    let physicaldata = [];
    this.EnvironmentvsServerbyDATA.forEach((m) => {
      resultphysical.migration_Strategy = m.migration_Strategy;
      resultphysical.num = m.num;
      physicaldata.push(resultphysical);
      resultphysical = { migration_Strategy: '', num: 0 };
    });

    chartdivphysical.data = physicaldata;
    // console.log(physicaldata, 'checkkkkPhysical??????????????');
    let pieSeriesarch = chartdivphysical.series.push(new am4charts.PieSeries());
    pieSeriesarch.dataFields.value = 'num';
    pieSeriesarch.dataFields.category = 'migration_Strategy';
    chartdivphysical.legend = new am4charts.Legend();
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
    let topopup = [];
    let CAInframappingApp=this.CAInframapping

    pieSeriesarch.slices.template.events.on('hit', function (ev) {
      displayelements = [];
      valueselected = ev.target.dataItem.properties.category;
      topopup = [];
      list.map((m) => {
        // CAInframappingApp.map((f)=>{
        if (m.environment == valueselected && m.serverType == 'Database') {
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
    // })
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
          piechartname: 'Database by Environment',
        },
      });
    });
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
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    //dialogConfig.height = "350px";
    //dialogConfig.width = "600px";
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
        dataKey: this.infraReport,
      },
    });
  }
}

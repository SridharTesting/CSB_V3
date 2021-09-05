import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { HTTPService } from '../service/httpService.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { rgb } from '@amcharts/amcharts4/.internal/core/utils/Colors';
import * as _ from 'lodash';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { ChartPopupComponent } from '../chart-popup/chart-popup.component';
import { InfraPopupComponent } from '../infra-popup/infra-popup.component';
//import { AnyTxtRecord } from 'dns';


@Component({
  selector: 'app-apr-dashboard',
  templateUrl: './apr-dashboard.component.html',
  styleUrls: ['./apr-dashboard.component.css'],
})
export class AprDashboardComponent implements OnInit {
  @ViewChild('chartElement') chartElement: ElementRef<HTMLElement>;
  lobmap = new Map();
  chartdata = {};
  content=true;
  loblist:any[]=[];
  lobdata: any;
  caAppList: any;
  lobcount:any;
  infradatacount:any;
  updateddate:any;
  caappmasterdata:any;
  osdata: any;
  CAInfradata: any;
  Environmentcount: any;
  Environmentcounting: any;
  vendorcount: any;
  lob: any;
  datacentercount: any;
  ApplicationSurveycount: any;
  modelobjectArray: any;
  arrtohtml: any;
  modelobject: { lobname: string; total: string; active: string; notactiveapplications: any[]; };
  lobarr: any;
  CAAppMaster: object;
  infradatacountdisplay: any;
  applicationcount:any;
  orgId: any;
  constructor( private Service: HTTPService,
    private router: Router,
    private dialogue: MatDialog,
    private accord:AccordionModule) {}

    ngOnInit():void{
      this.orgId=sessionStorage.getItem('orgId');
      this.Service.getapppercent(this.orgId).subscribe(result =>{
       this.applicationcount = result[0].num;
      })
  
      this.Service.CAInfradata().subscribe((data) => {
        this.CAInfradata = data;
      });
  //datacenter count
    this.Service.datacentreview(this.orgId).subscribe((data) => {
      this.datacentercount = Object.keys(data).length;
    });
    

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
      this.infradatacount=data;
      // console.log(this.infradatacount, 'check infradatacount');
      this.infradatacount = data[0].num;
      this.updateddate = data[0].migration_Strategy;
      this.updateddate = this.updateddate.split(' ')[0];
      // console.log(this.updateddate, 'check infradatacount');
      //     //infraapplication count
    }); //
    
       
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
              var obj = { Host_Name:'',
              	IP_Address:'',	
                Environment:'',	
                Data_Center:'' ,
              };
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
              piechartname: 'Application By LOB',
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
      piechartname: 'Database by Environment',
    },
  });
    });
    
  });
});
//vendorcount
this.Service.getvendoranddate(this.orgId).subscribe((data) => {
  this.vendorcount = data[0].vendorcount;
  this.updateddate = data[0].dateupdated;
  this.updateddate = this.updateddate.split(' ')[0];
  // console.log(this.vendorcount, 'vendorcount');
});




this.Service.getapppercent(this.orgId).subscribe((data) => {
      this.caappmasterdata = data[0].num;
     
      // console.log(this.caappmasterdata, 'ssssssssssssssssseeeeeeeeeeeeee');
    });

    

  
    this.Service.getLobs(this.orgId).subscribe((data) => {
      this.lobdata = data;
      console.log(this.lobdata,"lobdata");
      this.lobdata.map(m=>{
        this.lobmap.set(m.lobName,m.lobId)
      })
      
    },(err)=>{
      console.log(err);
    },()=>{
      this.Service.getcamaster().subscribe((data) => {
        this.caAppList = data;
        console.log(
          this.caAppList,
          '////////////////////getcamaster///////////getcamaster//////////'
        );
      },(err)=>{console.log(err);},
      ()=>{
        this.buildData();
        this.getlobcount();
      });
    });

  }
  ngAfterViewInit() {





    
  }





  getlobcount(){
    this.Service.getlobcount(this.orgId).subscribe((data:any[]) => {
      data.map(m=>{
        this.loblist.push(m);
        // console.log(this.loblist,"loblist");
      })
      this.createtreechart();
    })
  }

  buildData(){
    
    let name='';
    this.lobdata.map(m=>{
      // m.lobName = {}
      this.caAppList.map(f=>{
        if(m.lobId==f.lobId){
          let obj = {}
          // obj.appid = ;
          obj[f.appName.split(' ').join('')] =parseInt(f.appId);
          this.chartdata[m.lobName.split(' ').join('')]=obj;    
        }
      })
      
    })
    // console.log(this.chartdata,"???????????????");
    


    
  }

  createtreechart() {
    let chartdata = [];
    let lastcode = 109;
    let middlecode = 65;
    this.loblist.sort((a,b)=>{
        return parseInt(b.vendorcount) -parseInt(a.vendorcount)
    });
    
    this.loblist.map((m,i)=>{
      let colour = 'rgb(0,';
      
      if(i!=0)
      {
        middlecode= middlecode+12;
        lastcode = lastcode + 20;
      }
      colour = colour + middlecode+ ','+lastcode+')';
      // console.log(colour,"///////////////////////colour");
      
     let obj = {name:'',value:0,  color:''};
     obj.name = m.dateupdated;
     obj.value = parseInt(m.vendorcount);
     obj.color = colour;
    //  console.log(obj,"////////////////////////object");
     
     chartdata.push(obj);
    })
    

    var chart = am4core.create("chartdiv", am4charts.TreeMap);
    chart.data = chartdata;
    // chart.dataFields.color="#00416d";
    chart.dataFields.color = "color";
    
    /* Set color step */
    // chart.colors.step = 2;
    
    /* Define data fields */
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
chart.layoutAlgorithm=chart.squarify;


var level1 = chart.seriesTemplates.create("0");
var level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
level1_bullet.locationY = 0.5;
level1_bullet.locationX = 0.5;
level1_bullet.label.text = " {value} Applications ";
level1_bullet.label.fill = am4core.color("#fff");

var level2 = chart.seriesTemplates.create("0");
var level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
level2_bullet.locationY = 0.9;
level2_bullet.locationX = 0.2;
level2_bullet.label.text = "{name}  ";
level2_bullet.label.fill = am4core.color("#fff");
let arraytodisplay=[];
let reftodilog = this.dialogue;
 let localcaapplist = [];
 localcaapplist = this.caAppList

 let locallobmap=this.lobmap;
level1.columns.template.events.on("hit", function(ev) {
  let name = ev.target._dataItem.dataContext['properties'].name;
  arraytodisplay=[]

   let lobid = locallobmap.get(name);
   localcaapplist.map(m=>{
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

  }




  
}


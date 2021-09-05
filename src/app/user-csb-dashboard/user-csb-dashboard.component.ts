import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../service/httpService.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { CategoryAxis, ValueAxis } from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-user-csb-dashboard',
  templateUrl: './user-csb-dashboard.component.html',
  styleUrls: ['./user-csb-dashboard.component.css']
})
export class UserCSBDashboardComponent implements OnInit {
  lobname:any;
  evaluatedapps:any;
  caappmasterdata:any;
  subTitle = '';
  rlanesubtitle = '';
  appSurvey: boolean = false;
  rlanePercent: any;
  rlanecount = 0;
  applicationcount = 0;
  Rlane:any;
  userName:string;
  name:string;
  userDisplayName:string;
  orgId:any;
  lobdata:any;
  lobcount:any;
  lobId:any;
  userdashboard:any;
  modelobjectArray=[];
  ApplicationSurveycount: any;
  loblist:any;
  arrtohtml =[];
  modelobject = {
    lobname: '',
    total: '',
    active: '',
    notactiveapplications: [],
  };
  lobarr=[];
  lobwithapplications:any;
  CAAppMaster:any;
  constructor( private Service: HTTPService,private router: Router) { }
  ngAfterViewInit() {
this.radardata();
console.log("after view init");

  }
  ngOnInit(): void {
    console.log("ng oninit");
    this.orgId=sessionStorage.getItem("orgId");
    this.lobId=sessionStorage.getItem("LobId");

    this.Service.CAAppMaster(this.orgId).subscribe((data) => {
      this.CAAppMaster = data;
    });


    this.Service.getuserdashboard(this.lobId).subscribe((data) => {
      this.userdashboard=data;
      
          });
  
    this.userDisplayName = sessionStorage.getItem('username');

   this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));

   this.userName=this.name.charAt(0).toUpperCase();
   
    

     //lobcount
     this.Service.getLobs(this.orgId).subscribe((data) => {
      let count = 0;
      this.lobcount = data;
      this.loblist = data;
      
      this.lobcount.map((m) => {
        count = count + 1;
        if(this.lobId==m.lobId)
        this.lobname = m.lobName;
      });
      this.lobcount = count;
      
    }); //end




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
      this.lobarr.map(m=>{
        if(this.lobname ==m.lobname){
          this.lobwithapplications = m;
          console.log(this.lobwithapplications,"lobwithapplicationssssssssssssssssssssss")
        }
      })
     
    });



    // this.radardata();

  }
  radardata()
  {
    this.Service.getrlane(this.orgId,this.lobId).subscribe((data) => {
    this.Rlane = data;
    
    this.buildradar();
  })
}
  calculaterlanePercent() {
    debugger;

    this.rlanePercent = (this.rlanecount / this.userdashboard[0].total) * 100;
    this.rlanesubtitle = this.rlanecount + '/' +this.userdashboard[0].total;
    if (this.rlanecount > 0) {
      this.appSurvey = true;
    }
  }
 // total progress
 BuildTotalSurveyStatus() {
  this.evaluatedapps = (this.rlanecount/ this.userdashboard[0].total) * 100;
    this.subTitle = this.rlanecount+ '/' + this.userdashboard[0].total;
}

  buildradar(){
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
    this.BuildTotalSurveyStatus();
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

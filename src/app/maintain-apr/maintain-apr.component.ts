import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateapplicationComponent } from '../createapplication/createapplication.component';
import { DeleteapplicationPopupComponent } from '../deleteapplication-popup/deleteapplication-popup.component';
import { DialogComponent } from '../dialog/dialog.component';
import { CA_App_Master } from '../model/CA_App_Master';
import { FHNAppData } from '../model/FHN_APP_Data';
import { FHNVersion } from '../model/FHN_Version';
import { HTTPService } from '../service/httpService.service';

@Component({
  selector: 'app-maintain-apr',
  templateUrl: './maintain-apr.component.html',
  styleUrls: ['./maintain-apr.component.css'],
})
export class MaintainAprComponent implements OnInit {
  viewtype: any;
  caAppMasterData: any;
  appmasterheader = [];
  CAInfradata: any;
  inframasterheader = [];
  infrapage = 1;
  page = 1;
  AppMasterFormGroup: FormGroup;
  AppMasterTable: FormControl;
  userDisplayName: string;
  orgId: any; 
  orgName: string;
  versionNum: number;
  versionData:any;
  appDetails: any;
  appList: FHNAppData[];
  search:string;
  searchinfra:string;
  reusecaAppMasterData:any;
  reuseinfraData:any;

  constructor(
    private http: HTTPService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");

    
    this.viewtype = 'application';
    this.AppMasterFormGroup = new FormGroup({});
    this.http.CAAppMaster(this.orgId).subscribe((data) => {
      this.reusecaAppMasterData = data;
      this.caAppMasterData = data;
      console.log(this.caAppMasterData,"caapppppppppppppppppppppppppppppppppp")
    });

    this.http.getInfraData(this.orgId).subscribe((data) => {
      this.CAInfradata = data;
      this.reuseinfraData=data;
      console.log(this.CAInfradata,"infraaaaaaaaaaaaaaaaaaaaaaaaa")
    }); //end
  }

  changed(data, event, value) {
    // console.log(data, 'data');
    event.target.style['background-color'] = 'Yellow';
    this.caAppMasterData.map((m) => {
      if (data[0].appId == m[0].appId) 
      {m[0][value] = event.target.value;}
    });

    // console.log(this.caAppMasterData);
  }

  changedinfra(data, event, value) {
    // console.log(data, 'data');
    event.target.style['background-color'] = 'Yellow';
    this.CAInfradata.map((m) => {
      if (data.infraId == m.infraId) 
      {m[value] = event.target.value;}
    });

    // console.log(this.CAInfradata);
  }

  submitCaAppMaster() {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '28%',
      width: '28%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      let selectedOption = result;

      if (selectedOption == 'true') {
        let ca_applist=[]
        this.caAppMasterData.map(m=>
          {
            ca_applist.push(m[0])
          })
        this.http.updatecaappmaster(ca_applist).subscribe(
          (data) => {
            this._snackBar.open('Saved Successfully', 'close', {
              duration: 5000,
            });
           
        
          },
          (err) => {
            // console.log('error!!!');
          },
          () => {

            this.http.CAAppMaster(this.orgId).subscribe((data) => {
              this.reusecaAppMasterData = data;
              this.caAppMasterData = data;
              console.log(this.caAppMasterData,"caapppppppppppppppppppppppppppppppppp")
            });
          }
        );
      }
    });
  }

  submitinfra() {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '28%',
      width: '28%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      let selectedOption = result;
      if (selectedOption == 'true') {
        this.http.updateinfra(this.CAInfradata).subscribe(
          (data) => {},
          (err) => {
            // console.log('error!!!');
          },
          () => {
            alert('success');
          }
        );
      }
    });
  }

  DeleteApplication(appid) {
    let dialogRef = this.dialog.open(DeleteapplicationPopupComponent, {
      height: '28%',
      width: '28%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      let selectedOption = result;
      // console.log(result);

      if (selectedOption == 'true') {
        this.http.DeleteAppData(appid).subscribe(
          (data) => {},
          (err) => {
            alert('Failed');
          },
          () => {
            this.http.CAAppMaster(this.orgId).subscribe((data) => {
              this.reusecaAppMasterData = data;
              this.caAppMasterData = data;
            });
          }
        );
      }
    });
  }

  DeleteApplicationinfra(infraId) {
    let dialogRef = this.dialog.open(DeleteapplicationPopupComponent, {
      height: '28%',
      width: '28%',
      data:{
        applicationoruser : 'Application'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      let selectedOption = result;
      if (selectedOption == 'true') {
        this.http.DeleteinfraData(infraId).subscribe(
          (data) => {},
          (err) => {
            alert('Failed');
          },
          () => {
            this.http.getInfraData(this.orgId).subscribe((data) => {
              this.CAInfradata = data;
            });
          }
        );
      }
    });
  }

  addApplication() {
    let dialogref = this.dialog.open(CreateapplicationComponent, {
      height: '57%',
      data: { viewtype: 'application' },
    });
    dialogref.afterClosed().subscribe((result) => {
      let formgroupfrompopup = result.data.value;
      let pushtodb = true;
      if (result) {
        this.caAppMasterData.map((m) => {
          if (m.Application_ID == formgroupfrompopup.appId) {
            alert('app already exists');
            pushtodb = false;
          } else {
            pushtodb = true;
          }
        });
      }
      if (pushtodb) {
        this.http.createApplication(formgroupfrompopup).subscribe(
          (data) => {
            // console.log(data);
          },
          (err) => {
            alert('falsed');
          },
          () => {
            alert('complete');
          }
        );
      }
    });
  }

  addinfra() {
    let dialogref = this.dialog.open(CreateapplicationComponent, {
      data: {
        height: '57%',
        viewtype: 'infrastructure',
        caAppMasterData: this.caAppMasterData,
        cainfraData: this.CAInfradata,
      },
    });
    dialogref.afterClosed().subscribe((result) => {
      let formgroupfrompopup = result.data.value;

      let pushtodb = true;
      if (result) {
        this.CAInfradata.map((m) => {
          if (m.ipAddress == formgroupfrompopup.ipAddress) {
            alert('Ip Address already exists');
            pushtodb = false;
          } else {
            pushtodb = true;
          }
        });
      }

      if (pushtodb) {
        this.http.createinfrarecord(formgroupfrompopup).subscribe(
          (data) => {},
          (err) => {
            alert('false');
          },
          () => {
            this.http.getInfraData(this.orgId).subscribe((data) => {
              this.CAInfradata = data;

              console.log(this.CAInfradata,'ca infraaaaaaaaaaaa')
            });
          }
        );
      }
    });
  }

  saveBaselineApplication() {
    this.userDisplayName = sessionStorage.getItem('username');
    this.orgId = sessionStorage.getItem('orgId');
    this.orgName = sessionStorage.getItem('OrgName');

    this.http.getnewVersion(this.orgName, 1).subscribe((data) => {
      this.versionData = new FHNVersion();
      this.versionNum = data ? parseInt(data) : 0;

      this.versionNum = this.versionNum + 1;

      this.versionData.author = this.userDisplayName.substring(
        0,
        this.userDisplayName.lastIndexOf('@')
      );
      this.versionData.orgId = this.orgId;
      this.versionData.createdDate = new Date().toISOString();
      this.versionData.selectview = 1;
      this.versionData.description =
        'version' +
        this.versionNum +
        '-' +
        this.versionData.createdDate +
        '-' +
        this.versionData.author;
      this.versionData.versionNum = this.versionNum;
console.log(this.versionData,"lets check");
      this.http.createVersion(this.versionData).subscribe((result) => {
        this.appDetails = result;
let ca_applist=[]
this.caAppMasterData.map(m=>
  {
    ca_applist.push(m[0])
  })
        this.http.ApplicationVersionData(
            ca_applist,
            this.appDetails.versionId
          )
          .subscribe(
            (res) => {
              this._snackBar.open('BaselineData saved Successfully', 'close', {
                duration: 5000,
              });
            },
            (error) => {
              this._snackBar.open(
                'Could not save BaselineData, Please try again',
                'close',
                {
                  duration: 5000,
                }
              );
            }
          );
      });
    });
  }

  saveBaselineinfra() {
    this.userDisplayName = sessionStorage.getItem('username');
    this.orgId = parseInt (sessionStorage.getItem('orgId'));
    this.orgName =  sessionStorage.getItem('OrgName');
    
    this.http.getnewVersion(this.orgName, 2).subscribe((data) => {
      this.versionData = new FHNVersion();
      this.versionNum = data ? parseInt(data) : 0;

      this.versionNum = this.versionNum + 1;

      this.versionData.author = this.userDisplayName.substring(
        0,
        this.userDisplayName.lastIndexOf('@')
      );
      this.versionData.orgId = this.orgId;
      this.versionData.createdDate = new Date().toISOString();
      this.versionData.selectview = 2;
      this.versionData.description =
        'version' +
        this.versionNum +
        '-' +
        this.versionData.createdDate +
        '-' +
        this.versionData.author;
      this.versionData.versionNum = this.versionNum;
      let tempdata;

    this.http.createVersion(this.versionData).subscribe((result) => {
    
      tempdata = result;
    
      
      this.http.InfraVersionData(this.CAInfradata, tempdata.versionId).subscribe(
        (res) => {
          this._snackBar.open('BaselineData saved Successfully', 'close');
        },
        (error) => {
          this._snackBar.open(
            'Could not save BaselineData, Please try again',
            'close'
          );
        }
      );
    });

    });
    
  }
  SearchFilter(){

  if(this.search==''){
    this.caAppMasterData = this.reusecaAppMasterData; 
}
else{
  this.caAppMasterData = this.caAppMasterData.filter(res=>{
    let appname = res[0].appName.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
    let appid = res[0].appId.toString().toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
    if(appname){
      return appname
    }else if(appid){ 
      return appid;
    }
  });
}

}
  SearchFilterinfra(){
   
    if(this.searchinfra==''){
      this.CAInfradata = this.reuseinfraData; 
  }
  else{
    this.CAInfradata = this.CAInfradata.filter(res=>{
      let ipAddress = res.ipAddress.toString().toLocaleLowerCase().includes(this.searchinfra.toLocaleLowerCase());
      let hostName = res.hostName.toLocaleLowerCase().includes(this.searchinfra.toLocaleLowerCase())
      if(ipAddress){
        return ipAddress
      }else if(hostName){
        return hostName;
      }
    });
  }




  }
}

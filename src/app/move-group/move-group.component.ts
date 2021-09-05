import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMovegroupComponent } from '../create-movegroup/create-movegroup.component';
import { NgModule } from '@angular/core';
import { HTTPService } from '../service/httpService.service';

@Component({
  selector: 'app-move-group',
  templateUrl: './move-group.component.html',
  styleUrls: ['./move-group.component.css']
})
export class MoveGroupComponent implements OnInit {

  CAAppMaster: any;
  orgId: any;
 
  constructor(public dialog: MatDialog,
    private Service: HTTPService) { }

  ngOnInit(): void {
     
    debugger
    this.orgId=sessionStorage.getItem("orgId");

    this.Service.CAAppMaster(this.orgId).subscribe((data:any[]) => {
      this.CAAppMaster = data;
      console.log(this.CAAppMaster,'cappmasterrrrrrrrrrrrrrr');
     
    });
    

}

  createGroup()  {
    let topopup = [];
 let aa = [];
 let list=this.CAAppMaster;
 let displayelements = [];
  list.map((m) => {
    if (m[0].rlaneStrategyId == 1) {
      displayelements.push(m);
      var obj = {  appname: '' };
     // obj.lobname = locallob.get(m[0].lobId);
      obj.appname = m[0].appName;
     // obj.appid = m[0].appId;
      topopup.push(obj);
    }
  });
    
    let dialogref = this.dialog.open(CreateMovegroupComponent , {
    
      height: '500px',
      width:'500px',
      data: {
        dataKey: topopup,
      },
      
      
    });
}
  }

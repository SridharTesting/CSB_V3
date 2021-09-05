import { Component, OnInit, Inject } from '@angular/core';
import { HTTPService } from '../service/httpService.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-movegroup',
  templateUrl: './create-movegroup.component.html',
  styleUrls: ['./create-movegroup.component.css']
})
export class CreateMovegroupComponent implements OnInit {

  reusechartvalue: any;
  search: string;
  caAppMasterData: any[];
  reusecaAppMasterData: any[];
  chartvalue: any;
  CAAppMaster: any;
  orgId: any;
  
  constructor(private Service: HTTPService, @Inject(MAT_DIALOG_DATA) public data: any,) { }


  ngOnInit(): void {
    
    this.orgId=sessionStorage.getItem("orgId");

    this.Service.CAAppMaster(this.orgId).subscribe((data:any[]) => {
      this.caAppMasterData = data;
      this.reusecaAppMasterData=data;
      console.log(this.CAAppMaster,'cappmasterrrrrrrrrrrrrrr');
     
    });

this.chartvalue=this.data.dataKey;
this.reusechartvalue=this.data.dataKey;
}

SearchFilter(){
  
  if(this.search==''){
    this.chartvalue = this.reusechartvalue; 
}
else{
  this.chartvalue = this.chartvalue.filter(res=>{
    let appname1 = res[0].appname.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
    if(appname1){
      return appname1
    }
  });
}

}

}
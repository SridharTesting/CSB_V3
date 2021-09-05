import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../service/httpService.service';
// import { ValuePipe } from '../pipes/value.pipe';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ExcelService } from '../service/excel-service.service';

@Component({
  selector: 'app-test-git',
  templateUrl: './compare-apr.component.html',
  styleUrls: ['./compare-apr.component.css']
})
export class CompareAPRComponent implements OnInit {










  
  opened = true;
  verList:any[];
  infraList:any;
  processList:any[];
  errorMsg:string;
  pageOfItems: Array<any>;
  totalRecords:number;
  page:number=1;
  displayList = false;
  compare:boolean = false;
  selectedver:any;
  selectedver1:any;
  pageListdata=false;
  userName:any;
  openform1=false;
  openform2=false;
  openform3=false;
  openform4=false;
  dispinfo1=false;
  dispinfo2=false;
  dispinfo3=false;
  dispinfo4=false;
  property:string;
  carbtn=true;
  VerVal="";
  data1: any;
  data2: any;
  id1:number;
  id2:number;
  compList:[];
  applicationName:[];
  attribute:[];
  newval:[];
  oldVal:[];
  appSystem:any;
  test:any[]=[];
  orgId : number;
  viewtype:number;
  
  selected_version_1 = '';
  selected_version_2 = '';
  infraVerList : any[];
  processVerList : any[];
  infrastructure=false;
  application=true;
  process = false;
  orgName:any;
  loggedIn:boolean=true;
  checked:boolean=false;
  trail:[]=[];
  Added:[]=[];
  Deleted:[]=[];
  orderdCompareList:[];
  constructor(private excelService:ExcelService,private Versionservice: HTTPService,private router: Router,private formBuilder: FormBuilder,private service: HTTPService, private _snackBar: MatSnackBar) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);
   }

   exportAsXLSX():void {
     console.log(this.compList);
    this.excelService.exportAsExcelFile(this.compList,this.Added,this.Deleted,'Comparsion Extract');
 
  }



  ngOnInit(): void {
    debugger;
    this.orgName=sessionStorage.getItem("OrgName");
    this.verList=[];
    this.orgId= parseInt(sessionStorage.getItem('orgId'));
    this.Versionservice.getVerforComparision(this.orgId,1).subscribe(
      data=>{
        console.log(data,"data ccc")
        this.verList=data;

        console.log(this.verList,"okok");
      },
      error=>{
        this.errorMsg="Some error"
      })
      this.onClickOpenForm1();


  }
  loadpage(){
    console.log("inside verList");
    this.verList=[];
    this.orgId= parseInt(sessionStorage.getItem('orgId'));
    this.Versionservice.getVerforComparision(this.orgId,1).subscribe(
      data=>{

        this.verList=data;
        console.log(this.verList,"okok");
      },
      error=>{
        this.errorMsg="Some error"
      }


         )


  }

  dropDownChanged(event:Event){
    // console.log(this.mySelect,"My select");

    console.log(this.selected_version_1,"selected value");
    console.log(this.selected_version_2,"selected value");

  }
 // Compares data of 2 Versions Selected in the dropdown
  compareClicked(){
    debugger;
     // Validation
     if (this.selected_version_1 == '' || this.selected_version_2 == '') {
      // alert('Please select both Versions to compare');
      this.compare = false;
      this._snackBar.open("Please select both the versions to compare!", "Dismiss", {
        duration: 5000,
      });

    } else if (this.selected_version_1 == this.selected_version_2) {
      // alert('Cannot Compare same Versions');
      this.compare = false;
      this._snackBar.open("Cannot Compare same Versions", "Dismiss", {
        duration: 5000,
      });

    } else if (!this.selected_version_1 || !this.selected_version_2) {
      this.compare = false;
      this._snackBar.open("Please select both the versions to compare!", "Dismiss", {
        duration: 5000,
      });
    } else {
    this.compare = true;
    console.log(this.selected_version_1[1],"selected_version_1");
    console.log(this.selected_version_2[1],"selected_version_1");
    if(this.infrastructure){
    this.service.comparever(this.orgId,parseInt(this.selected_version_1[1]),parseInt(this.selected_version_2[1])).subscribe(
      (data)=>{

        this.compList = data;
        console.log(this.compList,"working good");

      })
    }
    if(this.process){
      this.service.compareverProcess(parseInt(this.selected_version_1[1]),parseInt(this.selected_version_2[1])).subscribe(
        (data)=>{

          this.compList = data;
          console.log(this.compList,"working good");

        }
      )
    }
    if(this.application){
      this.service.compareverApplication(parseInt(this.selected_version_1[1]),parseInt(this.selected_version_2[1])).subscribe(
        (data)=>{

          this.compList = data;
          console.log(this.compList);

        }
      )
    }
  }
  }

  // compareClicked(id1:number,:number){
  //   //comparever
  //   debugger;
  //   this.compare = true;
  //   this.id1=38;
  //    this.id2=40;
  //    this.service.comparever(this.id1,this.id2).subscribe(
  // (data)=>{

  //   this.compList = data;
  //   console.log(this.compList);

  // })
  // }




  selectChangeHandler(event:any)
  {
    this.selectedver=event.target.value;
    console.log(this.selectedver);

  }
  selectChangeHandler1(event:any)
  {
    this.selectedver1=event.target.value;
    console.log(this.selectedver1);
  }

  alert(){
  if(this.selectChangeHandler(this.selectedver)==this.selectChangeHandler1(this.selectedver1))
  {
    console.log("error");
  }


  }



  /*selectChangeHandler1(event:any)
  {
    this.selectedver1=event;
    console.log(this.selectedver);
    if (this.selectedver==this.selectedver1){
      this.selectedver1=false;
    }
  }*/
  removeButton(){
    this.carbtn=false;
    return this.carbtn;

  }
  onClickOpenForm1(){
    this.checked=true;
    if(this.openform2){
      this.openform2 = false;
    }
    else if(this.openform3){
      this.openform3 =false;
    }
    this.openform1=true;
    return this.openform1;

  }
// infrastructure Compare Version table selected
  onClickOpenForm2(){
    this.checked=true;
    if(this.openform1){
      this.openform1 = false;
    }
    else if(this.openform3){
      this.openform3 =false;
    }
    this.openform2=true;
    return this.openform2;

  }
 // process Compare Version table selected
  onClickOpenForm3(){
    this.checked=true;

    if(this.openform1){
      this.openform1 = false;
    }
    else if(this.openform2){
      this.openform2 =false;
    }
    this.openform3=true;
    return this.openform3;

  }
  handleChange($event: any)
  {
    this.application = true;
    this.Versionservice.getVerforComparision(this.orgId,1).subscribe(
      data=>{
        this.verList=data;
        console.log(this.verList,"version list to drop down");
      },
      error=>{
        this.errorMsg="Some error"
      })
    this.onClickOpenForm1();
    this.removeButton();
  }

  handleChange1($event: any)

  {
    debugger;
    this.infrastructure=true;
    this.Versionservice.getVerforComparision(this.orgId,2).subscribe(
      data=>{
        this.infraVerList=data;
        console.log(this.infraVerList,"version list to drop down");
      },
      error=>{
        this.errorMsg="Some error"
      })
      this.service.comparever(this.orgId,parseInt(this.selected_version_1[1]),parseInt(this.selected_version_2[1])).subscribe(
        (data)=>{

          this.compList = data;
          console.log(this.compList);

        })

    this.onClickOpenForm2();
    this.removeButton();
  }
  handleChange2($event: any)
  {
    this.process = true;
    this.Versionservice.getVerforComparision(this.orgId,3).subscribe(
      data=>{
        this.processVerList=data;
        console.log(this.processVerList,"version list to drop down");
      },
      error=>{
        this.errorMsg="Some error"
      })

      this.service.comparever(this.orgId,parseInt(this.selected_version_1[1]),parseInt(this.selected_version_2[1])).subscribe(
        (data)=>{

          this.compList = data;

         



         
          console.log(this.compList);

        }
      )

    this.onClickOpenForm3();
    this.removeButton();
  }
  registerForm = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm1 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm2 = this.formBuilder.group({
    AppId:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm3 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });
  registerForm4 = this.formBuilder.group({
    ca1:['', Validators.required],
    ca2:['',Validators.required],
    ca3:['',Validators.required],
    ca4:['',Validators.required]
  });

  Compare(){
    console.log(this.selected_version_1,"selected_version_1");
    console.log(this.selected_version_2,"selected_version_2");
  }
}

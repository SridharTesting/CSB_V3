import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { map } from 'rxjs/operators';
import { FHN_Application_Table } from './../../../model/infra';
import { HTTPService } from 'src/app/service/httpService.service';
import { FHN_Process_Data } from 'src/app/model/FHN_Process_Data';
import { FHN_Infra_Data } from 'src/app/model/FHN_Infra_data';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DownloadPopupComponent} from 'src/app/download-popup/download-popup.component';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet',
};

@Component({
  selector: 'app-upload-files-apr',
  templateUrl: './upload-files-apr.component.html',
  styleUrls: ['./upload-files-apr.component.css'],
})
export class UploadFilesAprComponent implements OnInit {
push=true;
appIdlist:any[]=[];
appIdlist2:any[]=[];

  orgName: string = '';
  selectedFile: File = null;
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedFileinfra: File = null;
  //docList: DocumentsUploaded;
  fhnInfraData : FHN_Infra_Data[] = [];
  csvRecords: any;
  header = false;
  orgId:any;
  processList: Array<FHN_Process_Data> = [];
  csvRecordsinfra: any;
  UserName ='';
  fhndata: FHN_Application_Table[] = [];
  fhnProcessdata:FHN_Process_Data[] = [];
   element = {}
   appList:FHN_Application_Table[] = [];

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  constructor(
    private router: Router,
    private http: HTTPService,
    private ngxCsvParser: NgxCsvParser,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orgName = sessionStorage.getItem('OrgName');
    this.orgId=sessionStorage.getItem("orgId");
    this.UserName=sessionStorage.getItem('username');
    this.http.getfhnAppData().subscribe(
      data=>{
        this.appList=data;
        console.log( this.appList,"this is appLis t");
      },
      error=>{
        console.log("error!!");
      });
  }

  onApplicationClicked() {
    // debugger
    // const formdata: FormData = new FormData();
    // formdata.append('file', this.selectedFile);
    // this.http.post(`http://localhost:8080/upl`,formdata).subscribe(res =>
    // {console.log(res);
    // alert("file uploaded");
    // this.onRemove0(this.selectedFile)});
  }

  submitQuestions() {}

  maintainInfo() {}

  goBack() {
    this.router.navigate(['homePage/capture']);
  }

//   onSelect0(event) {
//     debugger;
//     this.files1.push(...event.addedFiles);
//     this.selectedFile = this.files1[0];
//     this.ngxCsvParser
//       .parse(this.selectedFile, { header: this.header, delimiter: ',' })
//       .pipe()
//       .subscribe(
//         (result) => {
//           console.log(result)
//           this.csvRecords = result;
         
//           this.csvRecords.map((data,index) => {
//             debugger;
//             if(index> 0)
//             this.fhndata.push(

//               new FHN_Application_Table (

//              data[0],
//              data.orgId=this.orgId,
//                 data[1],

//                 data[2],

//                 data[3],

//                 data[4],

//                 data[5],

//                 data[6],

//                 data[7],

//                 data[8],

//                 data[9],
               
//                 data[10]
               

               

              

               


//               )
//             );
//             return;
//           });
//           console.log('fhn data', this.fhndata);
// this.http.postFHNUploadedData(this.fhndata).subscribe(
//              data => {
//                console.log(data);
//                this.files1=[];
            

//              },
//              (error)=>{
//                console.log(error)
//              },
//              ()=>{
//               this.http.UploadFileasBlob(this.selectedFile,this.UserName,this.orgId,1).subscribe(
//                 (file) => {
//                   console.log(file,"Successfully uploaded");
//                   this._snackBar.open("File Uploaded Successfully","X");
//                 },
//                 (error) =>{
//                   console.log(error,"There was an error!!");
//                 }
//               );
//              }

//            );

//         },

//       );

//   }


  onProcessClicked(){

  }



  onRemove0(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect2(event) {
     
    this.files3.push(...event.addedFiles);
    this.selectedFile = this.files3[0];
    var dataArray = [];

    this.ngxCsvParser
      .parse(this.selectedFile, { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result) => {
          console.log(result)
          this.csvRecords = result;
          this.csvRecords.map((data,index) => {
            debugger;
            if(index> 0)
            this.fhnProcessdata.push(

              new FHN_Process_Data (

                data.orgId=this.orgId,
                data[0],
               
                data[1],

                data[2],

                data[3],

                data[4],

                data[5],

                data[6],

                data[7],

                data[8],

                data[9],

                data[10],

                data[11],

                data[12],

                data[13],

                data[14],

                data[15],

                data[16],

                data[17],

                data[18],

                data[19],

                data[20],
                data[21],
                data[22],
                data[23],
               
                
                


              )
              
            );
            //dataArray.push(data);
        
            return ;
            
          });
          //this.fhnProcessdata=this.fhnProcessdata.push(sessionStorage.getItem("orgId"));
          console.log('fhn infra data', this.fhnProcessdata);

          // compare appId 
          this.fhnProcessdata.map(m =>{
             this.appIdlist.push( m.appId.toString());
          })
  
          this.appList.map(m =>{
            this.appIdlist2.push(m.appId.toString());
         })
        
        this.appIdlist.forEach(e =>{
          //get false here 
          if(this.push){
         this.push =  this.appIdlist2.includes(e);
          }    
        })
      
  console.log( this.appIdlist2,"Eotrrrrrrrrrrrr222222222")
  console.log( this.appIdlist,"Eotrrrrrrrrrrrr1111111111111111")
        if(!this.push){
          this._snackBar.open("Data mismatch with respect to App-System, please Review and Update the file","X");
          // window.location.reload();
        }
        else if(this.push)
        {
          this.http.getFHNProcessData(this.fhnProcessdata).subscribe(
            data => {
  debugger;
            this.files2= [];
              
              console.log(data);
              
            },
            (error)=>{
              console.log(error);
              
            },
            () =>{
              this.http.UploadFileasBlob(this.selectedFile,this.UserName,this.orgId,2).subscribe(
                (file) => {
                  console.log(file,"Successfully uploaded");
                  this._snackBar.open("File Uploaded Successfully","X");
                  window.location.reload();
                },
                (error) =>{
                  console.log(error,"There was an error!!");
                }
              );
            });
        }
        else {
            this._snackBar.open("Mismatch in ID please check and Upload","X");
        }
      
            
      
          // console.log(this.fhnInfraData[0].appId,"this is app id from fhninfra data");
           
          // 
       
  
       }
  
     );
  }

  onRemove2(event) {
    console.log(event);
    this.files3.splice(this.files3.indexOf(event), 1);
  }

  onSelect1(event) {

    console.log(event);
    this.files2.push(...event.addedFiles);
    this.selectedFileinfra = this.files2[0];

    this.ngxCsvParser
    .parse(this.selectedFileinfra, { header: this.header, delimiter: ',' })
    .pipe()
    .subscribe(
      (result) => {
        console.log(result)
        this.csvRecordsinfra = result;
        // console.log(this.csvRecordsinfra,"csv file converted");
        this.csvRecordsinfra.map((data,index)=>{
          if(index> 0)
          {

            this.fhnInfraData.push(

              new FHN_Infra_Data(
                data.orgId=this.orgId,
                data[0],

                data[1],

                data[2],

                data[3],

                data[4],

                data[5],

                data[6],

                data[7],

                data[8],

                data[9],

                data[10],
                data[11],
                data[12],
                data[13],
                data[14],
                data[15],
                data[16],
               


              )
            );
            return;
          }
        });
        console.log('fhn infra data', this.fhnInfraData);

        // compare appId 
        this.fhnInfraData.map(m =>{
           this.appIdlist.push( m.appId.toString());
        })

        this.appList.map(m =>{
          this.appIdlist2.push(m.appId.toString());
       })
      
      this.appIdlist.forEach(e =>{
        //get false here 
        if(this.push){
       this.push =  this.appIdlist2.includes(e);
        }    
      })
    
console.log( this.appIdlist2,"Eotrrrrrrrrrrrr222222222")
console.log( this.appIdlist,"Eotrrrrrrrrrrrr1111111111111111")
      if(!this.push){
        this._snackBar.open("Data mismatch with respect to App-System, please Review and Update the file","X");
        // window.location.reload();
      }
      else if(this.push)
      {
        this.http.pushFHNInfraData(this.fhnInfraData).subscribe(
          data => {
debugger;
          this.files2= [];
            
            console.log(data);
            
          },
          (error)=>{
            console.log(error);
            
          },
          () =>{
            this.http.UploadFileasBlob(this.selectedFileinfra,this.UserName,this.orgId,2).subscribe(
              (file) => {
                console.log(file,"Successfully uploaded");
                this._snackBar.open("File Uploaded Successfully","X");
                window.location.reload();
              },
              (error) =>{
                console.log(error,"There was an error!!");
              }
            );
          });
      }
      else {
          this._snackBar.open("Mismatch in ID please check and Upload","X");
      }
    
          
    
        // console.log(this.fhnInfraData[0].appId,"this is app id from fhninfra data");
         
        // 
     

     }

   );
}

  onRemove1(event) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  downloadthis() {
    // this.http
    //   .get(
    //     'http://localhost:8080/downloadFile/05d54c95-000d-4dbd-b13b-6ae2a31c4247',
    //     { responseType: 'blob' }
    //   )
    //   .subscribe((res) => {
    //     saveAs(res);
    //   });
  }

  getversion() {
    // this.http.get('http://localhost:8080/doc-list').subscribe((res) => {
    //   console.log(res);
    // });
  }
  InfrastructureClicked(){
    this.http.pushFHNInfraData(this.fhnInfraData).subscribe(
      data => {
        console.log(data);
  
      }
  
    );
  
  }

  ApplicationTemplateClicked(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DownloadPopupComponent,  {
              height: '600px',
              width: '820px',
              data:"application"
            });
  }

  InfrastructureTemplateClicked(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DownloadPopupComponent,  {
              height: '600px',
              width: '820px',
              data:"infrastructure"
            });
  }


  ProcessTemplateClicked(){
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DownloadPopupComponent,  {
              height: '600px',
              width: '820px',
              data:"process"
            });
  }
}


import { Component, OnInit } from '@angular/core';
import { UploadResponse } from 'src/app/model/upload-response';
import { HTTPService } from 'src/app/service/httpService.service';
import { FileUploadPopUpComponent } from '../file-upload-pop-up/file-upload-pop-up.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import * as fs from 'file-saver';

@Component({
  selector: 'app-upload-files-new',
  templateUrl: './upload-files-new.component.html',
  styleUrls: ['./upload-files-new.component.css']
})
export class UploadFilesNewComponent implements OnInit {

  upload: UploadResponse = new UploadResponse();
  isActive: boolean;
  orgId:any;
  asyncResult:UploadResponse;
  fileStorage=[];
  userDisplayName:any;
  check:any;
  uplodedfiles:any;
  latestfileIdApp=0;
  latestfileIdInfra=0;
  latestfileIdProcess=0;
  constructor(private fileUploadService: HTTPService,private dialog: MatDialog) { 
    
  }
getlatestfilestable(){
  this.fileUploadService.getuplodedfiles().subscribe((data) => {
    this.uplodedfiles = data;
    // console.log(this.uplodedfiles,"uplodedfilesuplodedfiles")
    this.uplodedfiles.map(m=>{
      if(m.viewtype==1){
        if(m.fileId > this.latestfileIdApp)
        this.latestfileIdApp = m.fileId;
      }else if(m.viewtype ==2){
        if(m.fileId > this.latestfileIdApp)
        this.latestfileIdInfra = m.fileId;
      }else{
        if(m.fileId > this.latestfileIdApp)
        this.latestfileIdProcess = m.fileId;
      }
    });

  });
}

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");

    this.userDisplayName = sessionStorage.getItem('username');
    this.getlatestfilestable();
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
    //console.log('Drag over');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    //console.log('Drag leave');
  }

  onDrop(event: any,viewtype:any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {
      this.onDroppedFile(droppedFiles,viewtype)
    }
    this.isActive = false;
  }
  
  async onDroppedFile(droppedFiles: any,viewtype:any) {
    let formData = new FormData();
    let file ;
    for(let item of droppedFiles) {
      file = droppedFiles.item(0);
      formData.append('UserFile', item);
      formData.append('orgId',String(this.orgId));
      formData.append('userDisplayName',String(this.userDisplayName))
    }

    this.asyncResult = await  this.fileUploadService.pushApplicationData(formData).toPromise();

    if(this.asyncResult){
      this.fileStorage = [];
      for(let i=0; i<this.asyncResult.files.length; i++){
        this.upload= this.asyncResult.files[i];
        console.log(this.upload);
        this.fileStorage.push(this.upload);
    }
    this.fileUploadService.pushFileToStorage(file,this.orgId,this.userDisplayName,viewtype).subscribe(data => {
this.check=data;
// console.log(this.check,"checkcheckkkk name")
    },(err)=>{

    },()=>{
      this.openDialog();
      this.getlatestfilestable();
    });
    
     
    }
    else{
      // console.log("error"+this.asyncResult);
    }
 
  }

  onSelectedFile(event: any,viewtype:any) {
    if (event.target.files.length > 0) {
      this.onDroppedFile(event.target.files,viewtype);
      event.target.value='';
    }

    
  }
  removeSelectedFile(index){
    this.upload.files.splice(index, 1);
    // delete file from FileList
    this.upload.files.splice(index, 1);
  }
  deleteAttachment(index) {
  //  console.log("Hi");
  }
  cancelFile(file){
    // console.log("Hi");
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();
   
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(FileUploadPopUpComponent,{width: '330px',
    height: '600px',
    disableClose:true,
    autoFocus:true,
    id:"modal-component",

    data: {
      dataKey: this.fileStorage
    }
  });
  }

  downloadLatestFile(viewtype:number){
    let fileid =0;
    let filename="";
    if(viewtype==1){
      fileid = this.latestfileIdApp;
      filename = "Last Uploaded App Discovery Data.xlsx"
    }else if(viewtype==2){
      fileid = this.latestfileIdInfra;
      filename = "Last Uploaded Infra Discovery Data.xlsx"
    }else{
      fileid = this.latestfileIdProcess;
    }
    this.fileUploadService.DownloadLatestFile(fileid,this.orgId).subscribe(data=>{
      // console.log(data);
      let b = new Blob([data]);
      var file = new Blob([b],{type:'application/vnd.ms-excel;base64'});
      fs.saveAs(file, filename);
    },(err)=>{
      console.log(err);
    },()=>{
      
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UploadResponse } from 'src/app/model/upload-response';
import { HTTPService } from 'src/app/service/httpService.service';
import { FileUploadPopUpComponent } from '../../../file-upload-pop-up/file-upload-pop-up.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-files-new-screen',
  templateUrl: './upload-files-new-screen.component.html',
  styleUrls: ['./upload-files-new-screen.component.css']
})
export class UploadFilesNewScreenComponent implements OnInit {
  upload: UploadResponse = new UploadResponse();
  isActive: boolean;
  orgId:any;
  asyncResult:UploadResponse;
  fileStorage=[];
  constructor(private fileUploadService: HTTPService,private dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
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

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {
      this.onDroppedFile(droppedFiles)
    }
    this.isActive = false;
  }
  
  async onDroppedFile(droppedFiles: any) {
    let formData = new FormData();

    for(let item of droppedFiles) {
      
      formData.append('UserFile', item);
      formData.append('orgId',String(this.orgId));
    }

     this.asyncResult = await  this.fileUploadService.pushApplicationData(formData).toPromise();

    if(this.asyncResult){
      console.log("will execute only for getting full response from the backend");
      for(let i=0; i<this.asyncResult.files.length; i++){
        
        this.upload= this.asyncResult.files[i];
        console.log(this.upload);
        this.fileStorage.push(this.upload);
    }
    
    this.openDialog();
     
      
    }
    else{
      console.log("error"+this.asyncResult);
    }
   //this.fileUploadService.pushApplicationData(formData)
    
    //.subscribe(
     // result => {
       // debugger;
       // console.log(result);
        //this.upload = result;
        //this.openDialog();

     // }
   // )
  }

  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      this.onDroppedFile(event.target.files);
      event.target.value='';
    }

    
  }
  removeSelectedFile(index){
    this.upload.files.splice(index, 1);
    // delete file from FileList
    this.upload.files.splice(index, 1);
  }
  deleteAttachment(index) {
   console.log("Hi");
  }
  cancelFile(file){
    console.log("Hi");
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

}

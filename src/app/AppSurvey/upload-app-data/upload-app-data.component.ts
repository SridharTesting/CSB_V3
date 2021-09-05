import { Component, OnInit, ElementRef } from '@angular/core';
import { HTTPService } from 'src/app/service/httpService.service';
import { ViewChild } from '@angular/core';
import { lobMappingtoorg } from 'src/app/model/lobMappingtoorg';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-app-data',
  templateUrl: './upload-app-data.component.html',
  styleUrls: ['./upload-app-data.component.css']
})

export class UploadAppDataComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileToUpload: File = null;
  orgs:{};
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
orgId:number;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  appsMappedToLObs=new lobMappingtoorg();
  userDisplayName:any;
  viewtype:any;

  constructor(private service:HTTPService,private _snackBar: MatSnackBar,private router:Router) { }
  
  ngOnInit(): void {
    this.service.getOrgs().subscribe(
      data=>this.orgs=data
    );
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
}
onSubmit(){
console.log("hi");
}
reset() {
  console.log(this.myInputVariable.nativeElement.files);
  this.myInputVariable.nativeElement.value = "";
  console.log(this.myInputVariable.nativeElement.files);
}

selectFile(event) {
  this.selectedFiles = event.target.files;
}

upload() {
  this.progress.percentage = 0;

  this.currentFileUpload = this.selectedFiles.item(0);
  
  // this.fileUploadService.pushFileToStorage(file,this.orgId,this.userDisplayName,viewtype).subscribe(data => {
  //   if (event.type === HttpEventType.UploadProgress) {
  //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
  //   } else if (event instanceof HttpResponse) {
  //     console.log('File is completely uploaded!');
  //     this._snackBar.open('File Uploaded Successfully', 'close', {
  //       duration: 5000,
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
        
  //     });
  //     this.myInputVariable.nativeElement.value = "";
  //     this.progress.percentage = 0;
  //   }
  // });

  this.selectedFiles = undefined;
}

onChangeOrg(orgId:number){
console.log('hi');
this.orgId=orgId;
}

fileUpload = new FormGroup({
  email: new FormControl(null, Validators.required),
  
});



}

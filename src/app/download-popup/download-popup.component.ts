import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HTTPService } from 'src/app/service/httpService.service';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {}

@Component({
  selector: 'app-download-popup',
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.css'],
})
export class DownloadPopupComponent implements OnInit {
  Application = false;
  process = false;
  Infrastructure = false;
  template = '';
  beta: Blob;
  latestFileID:number;
  orgId:string;
  orgName:string;
  UserName:string;

  constructor(
    public dialogRef: MatDialogRef<DownloadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: HTTPService,
    private snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.orgName = sessionStorage.getItem('OrgName');
    this.orgId=sessionStorage.getItem("orgId");
    this.UserName=sessionStorage.getItem('username');
  }

  close() {
    this.dialogRef.close();
  }

  templateDownloadApplication() {
    this.Application = true;
    this.process = false;
    this.Infrastructure = false;
    if (this.data === 'application') {
      this.Application = true;
      this.process = false;
      this.Infrastructure = false;

    }
    if (this.data === 'infrastructure') {
      this.Application = false;
      this.process = false;
      this.Infrastructure = true;

    }
    if (this.data === 'process') {
      this.Application = false;
      this.process = true;
      this.Infrastructure = false;

    }
    if (this.Application)
      this.template = ''
    else if (this.process) this.template = '../../assets/process_template.csv';
    else if (this.Infrastructure)
      this.template = '../../assets/Infrastructure_template.csv';
  }

  FileDownload() {
    if(this.data ==="application"){
      this.service.getLatestFileID(parseInt(this.orgId),1).subscribe(
        data => {
          this.latestFileID =data;
          console.log(this.latestFileID,"latest file id");
        }, error => {console.log(error);},
        ()=>{
          this.downloadBlob();
        }
      );
    }

    else if(this.data ==="infrastructure"){
      this.service.getLatestFileID(parseInt(this.orgId),2).subscribe(
        data => {
          this.latestFileID =data;
          console.log(this.latestFileID,"latest file id");
        }, error => {console.log(error);},
        ()=>{
          this.downloadBlob();
        }

      );
    }

    else if(this.data ==="process"){
      this.service.getLatestFileID(parseInt(this.orgId),3).subscribe(
        data => {
          this.latestFileID =data;
          console.log(this.latestFileID,"latest file id");
        }, error => {console.log(error);},
        ()=>{
          this.downloadBlob();
        }

      );
    }




    }


    downloadBlob(){
      if(this.latestFileID==0){
        this.snackbar.open("Files not available for Download","X");
      }
      else {
        console.log(this.latestFileID,"file id to download ");
      this.service.DownloadBlob(this.latestFileID).subscribe((data) => {
        var byteArray = new Uint8Array(data);
        console.log(byteArray,"byte array ");

        var blob = new Blob([byteArray], { type: 'text/csv;charset=utf-8;' });
        if(this.data ==="application"){
        saveAs(blob,"Application_data.xlsx")
      }
      else if (this.data ==="infrastructure"){
        saveAs(blob,"Infrastructure_data.xlsx")
      }
      else if (this.data ==="process"){
        saveAs(blob,"Process_data.xlsx")
      }

      })
    }
  }

}

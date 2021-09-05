import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HTTPService } from '../service/httpService.service';

@Component({
  selector: 'app-createapplication',
  templateUrl: './createapplication.component.html',
  styleUrls: ['./createapplication.component.css'],
})
export class CreateapplicationComponent implements OnInit {
  firstformgroup: FormGroup;
  infraformgroup:FormGroup;

  constructor(
    private http: HTTPService,
    public dialogRef: MatDialogRef<CreateapplicationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  lobname: any;
  applist: any;
  loblist: any;
  orgName: any;
  lobId: any;
  viewtype:String;
  caAppMasterData:any;
  cainfraData:any;
  orgId:any;
  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
    this.viewtype = this.data.viewtype;
    this.caAppMasterData = this.data.caAppMasterData;
    this.cainfraData = this.data.cainfraData;
    // console.log(this.caAppMasterData,"caAppMasterData to pop up");
    
    this.firstformgroup = new FormGroup({
      appId: new FormControl('', [Validators.required]),
      appName: new FormControl('', [Validators.required]),
      lobId: new FormControl('', [Validators.required]),
      orgId: new FormControl(parseInt(sessionStorage.getItem('orgId')), [
        Validators.required,
      ]),
    });
    this.infraformgroup = new FormGroup({
      hostName: new FormControl('', [Validators.required]),
      ipAddress: new FormControl('', [Validators.required]),
      appMasterId: new FormControl('', [Validators.required]),
      orgId: new FormControl(parseInt(sessionStorage.getItem('orgId')), [Validators.required,]),
      infraId: new FormControl('', [Validators.required]),
    });


    this.http.getLOBList(this.orgId).subscribe((data) => {
      this.loblist = data;
    });
    let infraid = this.cainfraData[this.cainfraData.length-1].infraId +1;
    this.infraformgroup.get('infraId').setValue(infraid);

  }

  Appchanged(event){
    this.infraformgroup.get('appMasterId').setValue(event.value);
  }


  loblistchanged(event) {
    this.firstformgroup.get('lobId').setValue(event.value);
  }

  createDialog() {
    if (this.firstformgroup.valid) {
      this.dialogRef.close({ event: 'close', data: this.firstformgroup });
    } else {
      alert('All fields are mandatory');
    }
  }
  createInfra(){
    
    this.infraformgroup.get('')
    if (this.infraformgroup.valid) {
      this.dialogRef.close({ event: 'close', data: this.infraformgroup });
    }
    else {
      alert('All fields are mandatory');
    }
  }
}

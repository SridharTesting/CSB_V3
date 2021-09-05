import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
interface DiscoveryTools {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})

export class DialogboxComponent implements OnInit {
  hostNameControl:any;
  cNameControl:any;
  group= new FormGroup({
    cNameControl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cDescControl: new FormControl('', [Validators.required])
  })
  tools: DiscoveryTools[] = [
    {value: 'BMC-o', viewValue: 'BMC'},
    {value: 'Dynatrace-1', viewValue: 'Dynatrace'},
    {value: 'Device42-2', viewValue: 'Device42'}
  ];
 
  constructor(private router: Router,
    public dialogRef: MatDialogRef<DialogboxComponent>
   ) { }
  

ngOnInit(): void {
 
}

gotToUpload(){
  this.dialogRef.close();
  this.router.navigate(['fileupload']);

}
}

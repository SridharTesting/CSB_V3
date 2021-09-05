import { Component, OnInit, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-file-upload-pop-up',
  templateUrl: './file-upload-pop-up.component.html',
  styleUrls: ['./file-upload-pop-up.component.css']
})

export class FileUploadPopUpComponent implements OnInit {
  form:FormGroup;
  description:string;
  constructor(private dialogRef: MatDialogRef<FileUploadPopUpComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router) { }

  ngOnInit(): void {
    console.log("From popup component");
    console.log(this.data);
    

  }
  closeModal() {
    this.dialogRef.close();
  }
  actionFunction() {
    alert("You have logged out.");
    this.closeModal();
  }

  redirectToCSB(){
    this.dialogRef.close();
    this.router.navigate(['CsbDashboard']);
  }
}

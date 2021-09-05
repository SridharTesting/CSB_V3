import { Component, OnInit, Inject } from '@angular/core';
import { HTTPService } from '../service/httpService.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rlanereport-popup',
  templateUrl: './rlanereport-popup.component.html',
  styleUrls: ['./rlanereport-popup.component.css']
})
export class RlanereportPopupComponent implements OnInit {

  constructor(private http: HTTPService,private router: Router,
    public dialogRef: MatDialogRef<RlanereportPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) { }

  ngOnInit(): void {
  }
  gotToappsurvey(){
    this.dialogRef.close();
    this.router.navigate(['appque']);
  }
}

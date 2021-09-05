
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { DevelopmentComponent } from '../development/development.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg){
   return this.dialog.open(DevelopmentComponent,{
      // width: '500px',
      // height: '700px',
      disableClose: true,
      position: { top: "10px" },
      data :{
        message : msg
      }
    });
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialogbox',
  templateUrl: './confirmation-dialogbox.component.html',
  styleUrls: ['./confirmation-dialogbox.component.css']
})
export class ConfirmationDialogbox {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogbox>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

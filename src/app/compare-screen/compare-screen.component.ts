import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../service/httpService.service';
import { ExcelService } from '../service/excel-service.service';

import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-compare-screen',
  templateUrl: './compare-screen.component.html',
  styleUrls: ['./compare-screen.component.css'],
})
export class CompareScreenComponent implements OnInit {
  constructor(
    private excelService: ExcelService,
    private service: HTTPService,
    private _snackBar: MatSnackBar,
  ) {}
  ModifiedTabel = false;
  compListapp: any;
  compListinfra: any;
  verList: any;
  viewtype: any;
  orgId: any;
  dropdown2: any;
  dropdown1: any;

  Added: [] = [];
  Deleted: [] = [];
  exportAsXLSX(): void {
    if(this.viewtype=='1')
     this.excelService.exportAsExcelFile(this.compListapp,this.Added,this.Deleted,'Comparsion Extract');
     else if(this.viewtype=='2')
     this.excelService.exportAsExcelFile(this.compListinfra,this.Added,this.Deleted,'Comparsion Extract');
  }


  ngOnInit(): void {
    this.viewtype = '1';
    this.orgId = parseInt(sessionStorage.getItem('orgId'));
    this.service
      .getVerforComparision(this.orgId, this.viewtype)
      .subscribe((data) => {
        this.verList = data;
      });
  }

  changed() {
    this.compListapp = [];
    this.compListinfra = [];
    this.ModifiedTabel=false;
    this.service
      .getVerforComparision(this.orgId, this.viewtype)
      .subscribe((data) => {
        this.verList = data;
      });
  }

  compare() {
    if (this.dropdown1 && this.dropdown2) {

      if (this.dropdown1 != this.dropdown2) {
        if (this.viewtype == '2') {
          
          this.service
            .comparever(this.orgId,
              parseInt(this.dropdown1[1]),
              parseInt(this.dropdown2[1])
            )
            .subscribe((data) => {
              this.compListinfra = [];
              this.ModifiedTabel = true;
              this.compListinfra = data;
              console.log(this.compListinfra);
            });
        } else if (this.viewtype == '1') {
          this.service
            .compareverapp(this.orgId,
              parseInt(this.dropdown1[1]),
              parseInt(this.dropdown2[1])
            )
            .subscribe((data) => {
              this.compListapp = [];
              this.compListapp = data;
              this.ModifiedTabel = true;
              console.log(this.compListapp);
            });
        }
      }else{
        this._snackBar.open("Please select different the versions to compare!", "X")
      }
    }
    else{
      this._snackBar.open("Please select both the versions to compare!", "X")
    }
  }

}

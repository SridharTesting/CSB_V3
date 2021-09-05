import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Questioner } from './../../../model/questioner';
import { NgxCsvParser } from 'ngx-csv-parser';
import { HTTPService } from 'src/app/service/httpService.service';
import { ExportToCsv } from 'export-to-csv';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../../service/excel.service';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

type AOA = any[][];
const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useTextFile: false,
  useBom: true,
  useHeader: true,
  headers: [
    'Application Id',
    'Field Name',
    'Questioner',
    'Application System',
    'Field Value',
  ],

  // useKeysAsHeaders:true,
  filename: '',
};

@Component({
  selector: 'app-submit-files-apr',
  templateUrl: './submit-files-apr.component.html',
  styleUrls: ['./submit-files-apr.component.css'],
})
export class SubmitFilesAprComponent implements OnInit {
  importContacts: Questioner[] = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  data: any;
  fileInputLabel: string;
  orgName: string = '';
  questionerApp: Questioner[] = [];
  questionerInfra: Questioner[] = [];
  questionerProcess: Questioner[] = [];
  csvRecords: any;
  header = false;
  selectedFileApp: File = null;
  selectedFileInfra: File = null;
  selectedFileProcess: File = null;
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  orgId: any;
  UserName = '';
  latestFileID: number;
  infraTemplate: any;
  AppTemplate: any;
  ProcessTemplate: any;
  filename: String;
  application = false;
  process = false;
  infrastructure = false;

  constructor(
    private router: Router,
    private ngxCsvParser: NgxCsvParser,
    private http: HTTPService,
    private snackbar: MatSnackBar,
    private exlservice: ExcelService
  ) {}

  ngOnInit(): void {
    this.orgName = sessionStorage.getItem('OrgName');
    this.orgId = sessionStorage.getItem('orgId');
    this.UserName = sessionStorage.getItem('username');
  }
  uploadfiles() {}

  submitQuestions() {}

  maintainInfo() {}

  goBack() {
    this.router.navigate(['homePage/capture']);
  }

  onSelect0(event) {
    this.files1.push(...event.addedFiles);
    this.selectedFileApp = this.files1[0];

    // const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      this.data = this.exlservice.importFromFile(bstr);
      console.log(this.data, 'data from excel');
      this.data.map((data, index) => {
        if (index > 0) {
          this.questionerApp.push(
            new Questioner(data[0], data[1], data[2], data[3], data[4])
          );
          return;
        }
      });
      console.log(this.questionerApp, 'Questioner Data');
    };
    reader.readAsBinaryString(this.selectedFileApp);
  }

  onRemove0(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect1(event) {
    console.log(event);
    this.files2.push(...event.addedFiles);
    this.selectedFileInfra = this.files2[0];

    // const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      this.data = this.exlservice.importFromFile(bstr);
      console.log(this.data, 'data from excel');
      this.data.map((data, index) => {
        if (index > 0) {
          this.questionerInfra.push(
            new Questioner(data[0], data[1], data[2], data[3], data[4])
          );
          return;
        }
      });
      console.log(this.questionerInfra, 'Questioner Data');
    };
    reader.readAsBinaryString(this.selectedFileInfra);
  }

  onRemove1(event) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  onSelect2(event) {
    this.files3.push(...event.addedFiles);
    this.selectedFileProcess = this.files3[0];

    // const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      this.data = this.exlservice.importFromFile(bstr);
      console.log(this.data, 'data from excel');
      this.data.map((data, index) => {
        if (index > 0) {
          this.questionerProcess.push(
            new Questioner(data[0], data[1], data[2], data[3], data[4])
          );
          return;
        }
      });
      console.log(this.questionerProcess, 'Questioner Data');
    };
    reader.readAsBinaryString(this.selectedFileProcess);
  }

  onRemove2(event) {
    console.log(event);
    this.files3.splice(this.files3.indexOf(event), 1);
  }

  onApplicationClicked() {
    if (!this.selectedFileApp) {
      this.snackbar.open('Please select a file to upload', 'X');
    } else {
      console.log(this.questionerApp, 'fhn data on click');

      this.http.UploadQuestioner(this.questionerApp,1).subscribe(
        (data) => {
          // this.latestFileID =data;
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.snackbar.open('Could not upload the file', 'X');
        },
        ()=>{
          this.snackbar.open('Questioner uploaded Successfully', 'X');
          this.files1 = [];
        }
      );
    }
  }

  onInfrastructureClicked() {
    if (!this.selectedFileInfra) {
      this.snackbar.open('Please select a file to upload', 'X');
    } else {
      console.log(this.questionerInfra, 'fhn data on click');

      this.http.UploadQuestioner(this.questionerInfra,2).subscribe(
        (data) => {
          // this.latestFileID =data;
          console.log(data);
        },
        (error) => {
          this.snackbar.open('Could not upload the file', 'X');
        },

        ()=>{
          this.snackbar.open('Questioner uploaded Successfully', 'X');
          this.files2 = [];
        }
      );
    }
  }

  onProcessClicked() {
    if (!this.selectedFileProcess) {
      this.snackbar.open('Please select a file to upload', 'X');
    } else {
      console.log(this.questionerProcess, 'fhn data on click');
// have to change the service name
this.http.UploadQuestioner(this.questionerProcess,3).subscribe(
  (data) => {
    // this.latestFileID =data;
    console.log(data);
  },
  (error) => {
    this.snackbar.open('Could not upload the file', 'X');
  },
  ()=>{
    this.snackbar.open('Questioner uploaded Successfully', 'X');
    this.files3 = [];
  }
);
    }
  }

  ProcessTemplateClicked() {
    this.infrastructure = false;
    this.application = false;
    this.process = true;
    if (this.process) {
      options.filename = 'Process_Questioner';
    }
    this.http.GetQuestioner(this.orgId, 3).subscribe((result: any[]) => {
      if (!result) {
        this.snackbar.open('No Files to Download', 'X');
      } else {
        this.ProcessTemplate = result.map((data) => {
          return {
            'Application ID': data['app_Id'],
            'Application System': data['app_System'],
            'Field Name': data['field_Name'],
            'Questioner': data['questioner'],
            'Field Value': data['field_Value'],
          };
        });
        console.log(this.ProcessTemplate, 'data to excel');
        this.exlservice.exportQuestioner(
          this.ProcessTemplate,
          'Process Questioner'
        );
      }
    });
  }

  ApplicationTemplateClicked() {
    this.infrastructure = false;
    this.application = true;
    this.process = false;
    if (this.application) {
      options.filename = 'Application_Questioner';
    }
    this.http.GetQuestioner(this.orgId, 1).subscribe((result: any[]) => {
      if (!result) {
        this.snackbar.open('No Files to Download', 'X');
      } else {
        this.AppTemplate = result.map((data) => {
          return {
            'Application ID': data['app_Id'],
            'Application System': data['app_System'],
            'Field Name': data['field_Name'],
            'Questioner': data['questioner'],
            'Field Value': data['field_Value'],
          };
        });
        console.log(this.AppTemplate, 'data to excel');
        this.exlservice.exportQuestioner(
          this.AppTemplate,
          'Application Questioner'
        );
      }
    });
  }

  InfrastructureTemplateClicked() {
    this.infrastructure = true;
    this.application = false;
    this.process = false;
    // if (this.infrastructure) {
    //   options.filename = 'Infrastructure_Questioner';
    // }
    this.http.GetQuestioner(this.orgId, 2).subscribe((result:any[]) => {
      if (!result) {
        this.snackbar.open('No Files to Download', 'X');
      } else {
        console.log(result, 'from db ');
        this.infraTemplate = result.map((data) => {
          return {
            'Application ID': data['app_Id'],
            'Application System': data['app_System'],
            'Field Name': data['field_Name'],
            'Questioner': data['questioner'],
            'Field Value': data['field_Value'],
          };
        });
        console.log(this.infraTemplate, 'data to excel');
        this.exlservice.exportQuestioner(
          this.infraTemplate,
          'Infrastructure Questioner'
        );
      }
    },(e)=>{this.snackbar.open('There was an error while Downloading the file', 'X');}
    ,()=>{
      this.snackbar.open('Questioner for Infrastructure downloaded successfully', 'X');
    });
  }
}

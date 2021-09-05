import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';

 
 
  // const options = { 
  //   fieldSeparator: ',',
  //   quoteStrings: '"',
  //   decimalSeparator: '.',
  //   showLabels: true, 
  //   useTextFile: false,
  //   useBom: true,
  //   useKeysAsHeaders: true,
  //   // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  //   // headers: ["First Name", "Last Name", "ID"],
  //   // useHeader: false,
  //   // nullToEmptyString: true,
  // };
//   var options = { 
//     fieldSeparator: ',',
//     quoteStrings: '"',
//     decimalseparator: '.',
//     showLabels: true, 
    
//     useBom: true,
//     noDownload: true,
//     headers: ["First Name", "Last Name", "ID","Mustu"],
//     useHeader: false,
//     nullToEmptyString: true,
//   };
// const csvExporter = new ExportToCsv(options);
 
// csvExporter.generateCsv(data);
 
//  const EXCEL_TYPE ='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_TYPE ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;text/csv;charset=utf-8";

const EXCEL_EXTENSION = '.Calc.XLSX';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json1: any,json2: any[],json3: any[],excelFileName: string): void {

    const myHeader = ["Application Name","Attribute Name","Old Value","New Value"];
 
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json1,{header: myHeader});
    const myworksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json2);
    const myworksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json3);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'Application Modified': myworksheet, 'Application Added': myworksheet1,'Application Deleted': myworksheet2}, SheetNames: ['Application Modified','Application Added','Application Deleted'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }


 


  

}
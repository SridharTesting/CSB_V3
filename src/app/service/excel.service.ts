import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;text/csv;charset=utf-8";

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

    return data;
  }


  public exportQuestioner(json1: any,excelFileName: string): void {

    // const myHeader = ["App_Id","App_System","Field_Name","Questions","Field Value"];
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json1);
    // const myworksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json2);
    // const myworksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json3);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'Questioner': myworksheet, }, SheetNames: ['Questioner'] };
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

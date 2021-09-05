import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadResponse } from '../model/upload-response';
import { HTTPService } from '../service/httpService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-files-apr',
  templateUrl: './upload-files-apr.component.html',
  styleUrls: ['./upload-files-apr.component.css']
})
export class UploadFilesAprComponent implements OnInit {

  upload: UploadResponse = new UploadResponse();
  isActive: boolean;
  orgId:any;
  asyncResult:UploadResponse;
  fileStorage=[];
  constructor(private fileUploadService: HTTPService,private Router: Router,private dialog: MatDialog) 
{ }

  ngOnInit(): void {
  }

}


import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,NavigationEnd ,RouterEvent  } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators ,FormBuilder} from '@angular/forms';

import { Organization } from '../../model/organization';
import {HTTPService} from '../../service/httpService.service';
import { Pipe, PipeTransform } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Observable } from "rxjs";
import { Directive, ElementRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import {LOB} from '../../model/LOB';
@Component({
  selector: 'app-list-lob',
  templateUrl: './list-lob.component.html',
  styleUrls: ['./list-lob.component.css']
})
export class ListLobComponent implements OnInit {
  expandCollapseStatus='expand'
  opened = true;
  lobList:LOB[];
  orgId:any;
  errorMsg:string;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  pageOfItems: Array<any>;
totalRecords:number;
page:number=1;
pageListdata=false;
display=false;
  constructor(private iconRegistry: MatIconRegistry,private LOBservice: HTTPService,
    private sanitizer: DomSanitizer,private _el: ElementRef,
    private router: Router,private formBuilder: FormBuilder) {
      setTimeout(() => {
        this.displayList = true;
      }, 100);
     
     }

  ngOnInit(): void {
    this.orgId=sessionStorage.getItem("orgId");
    this.loadpage();
    this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)
        
      ).subscribe(() => {  
                  
            
                     this.loadpage();
                    } );
                  }
                 
                
  
                    loadpage(){
                      console.log("inside loblist")
                      this.lobList=[];
                      this.LOBservice.getLOBList(this.orgId).subscribe(
                        data=>{
      
                          this.lobList=data;
                          
                         
                        },
                        error=>{
                          this.errorMsg="Some error"
                        }
                        
                  
                           )
                         

                    }
  selectedItem($event) {
    console.log($event);
  }
  setExpandCollapseStatus(type) {
    this.expandCollapseStatus = type;
  }

  selectedLabel($event) {
    console.log($event);
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  redirect(link) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.displayList = true;
    }, 100);
  }

  goToADDLOB(){
    this.router.navigate(['homePage/loBsetup/addlob']);
  }
  editLOB(id:number){
    this.router.navigate(['homePage/loBsetup/editLOB',id])
  }

  deleteLOB(id:number){
    debugger;
    this.LOBservice.deleteLOB(id).subscribe(
      data=>{
        console.log("data deleted");
        this.router.navigate(['/homePage/loBsetup']);
      },
      error=>{
        console.log("exception");
      }
    )
  }
}


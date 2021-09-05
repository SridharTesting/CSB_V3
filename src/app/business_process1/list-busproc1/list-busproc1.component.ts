import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,NavigationEnd ,RouterEvent, ActivatedRoute  } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators ,FormBuilder} from '@angular/forms';

import { BusinessProcess1 } from '../../model/business-process1';
import {HTTPService} from '../../service/httpService.service';
import { Pipe, PipeTransform } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Observable } from "rxjs";
import { Directive, ElementRef } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-busproc1',
  templateUrl: './list-busproc1.component.html',
  styleUrls: ['./list-busproc1.component.css']
})
export class ListBusProc1Component implements OnInit {
  expandCollapseStatus='expand'
  opened = true;
  businessprocess1List:BusinessProcess1[];
  errorMsg:string;
display=false;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = true;
  pageOfItems: Array<any>;
totalRecords:number;
page:number=1;
pageListdata=false;

  constructor(private BusProc1service: HTTPService,
    
    private router: Router,private route: ActivatedRoute) {
     
      setTimeout(() => {
        this.displayList = true;
      }, 100);
     
     }


  ngOnInit(): void {
    this.loadpage();
    this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)
        
      ).subscribe(() => {  
                  
            
                     this.loadpage();
                    } );
                  }
  
  loadpage(){
    console.log("inside businessprocess1List")
    this.businessprocess1List=[];
    this.BusProc1service.getbusProc1List().subscribe(
      data=>{
         
        this.businessprocess1List=data;
      
        console.log(this.businessprocess1List);
      },
      error=>{
        this.errorMsg="Some error"
      }
      

         )
       

  }

  addNewBusProc1(){
    debugger;
   
     
       this.router.navigate(['addbusproc1'],{relativeTo: this.route});
  }
  editBusProc1(id:number){
    this.router.navigate(['homePage/busproc1SetUp/editBusProc1',id])
      }
 
  deleteBusProc1(id:number){
    this.BusProc1service.deleteBusProc1(id).subscribe(
      data=>{
        console.log("Business process level1 data deleted");
        
        this.router.navigate(['homePage/busproc1SetUp']);
      },
      error=>{
        console.log("exception");
      }
    )
  }
  selectedItem($event) {
    console.log($event);
 var url = window.location.href; 
 console.log(document.getElementById('id'));

 document.getElementById($event.id).style.color="blue";
  }
  setExpandCollapseStatus(type) {
    debugger;
    console.log(type);
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
    console.log(link);
    debugger;
    this.router.navigate([link]);
    setTimeout(() => {
      this.displayList = true;
    }, 100);
  }
}

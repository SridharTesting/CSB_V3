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
import { MatTableDataSource } from '@angular/material/table';
import { Organization } from '../../model/organization';
import {HTTPService} from '../../service/httpService.service';
import { Pipe, PipeTransform } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Observable } from "rxjs";
import { Directive, ElementRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import {LOB} from '../../model/LOB';

@Component({
  selector: 'app-list-org',
  templateUrl: './list-org.component.html',
  styleUrls: ['./list-org.component.css']
})
export class ListOrgComponent implements OnInit {
  expandCollapseStatus='expand'
  opened = true;
  orgList:Organization[];
  errorMsg:string;
  display=false;
  public dataSource = new MatTableDataSource<Organization>();

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = true;
  pageOfItems: Array<any>;
totalRecords:number;
page:number=1;
pageListdata=false;
  constructor(private Orgservice: HTTPService,
    
    private router: Router,private route: ActivatedRoute) {
     
   
     
     }


  ngOnInit(): void {
    this.loadpage();
    this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)
        
      ).subscribe(() => {  
                  
            
                     this.loadpage();
                    } );
                  }
  
  loadpage(){
    console.log("inside orgList")
    this.orgList=[];
    this.Orgservice.getorgList().subscribe(
      data=>{

        this.orgList=data;
      
        console.log(this.orgList);
        
      },
      error=>{
        this.errorMsg="Some error"
      }
      

         )
       

  }
  addNewOrg(){
    this.router.navigate(['addorg'],{relativeTo: this.route});
  }
  editOrg(id:number){

    this.router.navigate(['editorg',id],{relativeTo: this.route});
  }
  deleteOrg(id:number){
    this.Orgservice.deleteOrg(id).subscribe(
      data=>{
        console.log(data);
        console.log("org data deleted");
        
        this.router.navigate(['homePage/orgSetUp']);
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

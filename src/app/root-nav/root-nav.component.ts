import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})

export class RootNavComponent {
  opened = true;
  label:String;
  userDisplayName = '';
  name='';
  userName='';
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  expandCollapseStatus: true;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);
    
  
  }

  myclass={
    color:'blue'
   

  }
  selectedItem($event) {
    debugger;
    this.redirect($event.routerLink[0]);
   

    console.log($event);
    
  }

  selectedLabel($event) {
  
 this.label=$event.label;
    console.log(this.label);
  }

  redirect(link) {
    debugger;
    console.log(link);
    this.setExpandCollapseStatus(true);
    
    this.router.navigate([link],{relativeTo: this.route});
    
  }

  setExpandCollapseStatus(type) {
    this.expandCollapseStatus = type;
  }
  

  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {
     
      this.opened = true;
    }

    this.userDisplayName = sessionStorage.getItem('username');
    console.log("sumana testing");
   this.name  = this.userDisplayName .substring(0, this.userDisplayName .lastIndexOf("@"));
console.log(this.name );
   this.userName=this.name.charAt(0).toUpperCase();
  
    console.log( this.userName);
  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {
     
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

}
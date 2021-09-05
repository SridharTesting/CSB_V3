import { Component, ViewChild, HostListener,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';



@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {

  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;
  expandCollapseStatus: string = null;
  fileToUpload: File = null;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);
    
  
  }

  selectedItem($event) {
    // console.log($event);
  }

  selectedLabel($event) {
    // console.log($event);
  }

  redirect(link) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.displayList = true;
    }, 100);
  }

  setExpandCollapseStatus(type) {
    this.expandCollapseStatus = type;
  }

  ngOnInit() {
    // console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 87;
      this.opened = false;
    } else {
    
      this.opened = true;
    }
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

}

  
  




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture-information',
  templateUrl: './capture-information.component.html',
  styleUrls: ['./capture-information.component.css']
})
export class CaptureInformationComponent implements OnInit {
  orgName:string="";
  selectedRadio:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.orgName=sessionStorage.getItem("OrgName");
  }

  uploadfiles(){
    // if(this.selectedRadio==="cloud")
    // this.router.navigate(['homePage/uploadcloud']);
    // else if(this.selectedRadio==="apr")
    this.router.navigate(['homePage/uploadapr']);
  }

  submitQuestions(){
    // if(this.selectedRadio==="cloud")
    // this.router.navigate(['homePage/submitcloud']);
    // else if(this.selectedRadio==="apr")
    this.router.navigate(['homePage/submitapr']);
  }

  maintainInfo(){
    this.router.navigate(['homePage/maintain']);
  }

  goBack(){}
  a=10;


}

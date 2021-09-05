import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-survey-main-page',
  templateUrl: './app-survey-main-page.component.html',
  styleUrls: ['./app-survey-main-page.component.css']
})
export class AppSurveyMainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  lobToAppMapping(){

   this.router.navigate(['homePage/lobtoappmapping']);
  }

  uploadAppData(){
    this.router.navigate(['homePage/uploadappdata']);
  }
}

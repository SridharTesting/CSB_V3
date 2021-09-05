import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}
  ondatacv()
  {
    console.log("pooja");
    this.router.navigate(['homePage/datacenterview']);
  }
  onosv()
  {
    this.router.navigate(['homePage/operatingsystemview']);
  }
  ondsv()
  {
    this.router.navigate(['homePage/databaseserverview']);
  }
  onabe()
  {
    this.router.navigate(['homePage/Applicationbyenvironment']);
  }
  oncsv()
  {
    this.router.navigate(['homePage/cloudstrtergyview']);
  }
 

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datacv',
  templateUrl: './datacv.component.html',
  styleUrls: ['./datacv.component.css']
})
export class DatacvComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBack()
  {
    this.router.navigate(['homePage/cloud']);
  }
}


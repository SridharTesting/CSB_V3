import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dsv',
  templateUrl: './dsv.component.html',
  styleUrls: ['./dsv.component.css']
})
export class DsvComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBack()
  {
    this.router.navigate(['homePage/cloud']);
  }
}


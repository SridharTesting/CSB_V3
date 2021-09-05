import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abe',
  templateUrl: './abe.component.html',
  styleUrls: ['./abe.component.css']
})
export class AbeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBack()
  {
    this.router.navigate(['homePage/cloud']);
  }
}

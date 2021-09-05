import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBack()
  {
    this.router.navigate(['homePage/cloud']);
  }
}

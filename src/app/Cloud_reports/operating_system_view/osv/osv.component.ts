import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-osv',
  templateUrl: './osv.component.html',
  styleUrls: ['./osv.component.css']
})
export class OsvComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBack()
  {
    this.router.navigate(['homePage/cloud']);
  }
}

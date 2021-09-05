import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apr-header',
  templateUrl: './apr-header.component.html',
  styleUrls: ['./apr-header.component.css']
})
export class AprHeaderComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }
  captureinfo(){
    this.router.navigate(['homePage/aprDataComparsion']);
  }

}

import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  
  favoriteComponent: string;
  seasons: string[] = ['Organization', 'Line of Business', 'Users Tool', 'Process'];

  constructor() { }

  ngOnInit(): void {
  }

} 

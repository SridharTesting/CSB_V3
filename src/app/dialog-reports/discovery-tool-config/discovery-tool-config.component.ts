import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

interface DiscoveryTools {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-discovery-tool-config',
  templateUrl: './discovery-tool-config.component.html',
  styleUrls: ['./discovery-tool-config.component.css']
})
export class DiscoveryToolConfigComponent implements OnInit {
  hostNameControl:any;
  cNameControl:any;
  group= new FormGroup({
    cNameControl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cDescControl: new FormControl('', [Validators.required])
  })
  tools: DiscoveryTools[] = [
    {value: 'BMC-o', viewValue: 'BMC'},
    {value: 'Dynatrace-1', viewValue: 'Dynatrace'},
    {value: 'Device42-2', viewValue: 'Device42'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

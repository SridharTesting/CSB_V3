import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-cloud',
  templateUrl: './submit-cloud.component.html',
  styleUrls: ['./submit-cloud.component.css']
})
export class SubmitCloudComponent implements OnInit {
  orgName: string="";
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.orgName=sessionStorage.getItem("OrgName");
  }
  uploadfiles(){

  }

  submitQuestions(){}

  maintainInfo(){}

  goBack(){
    this.router.navigate(['homePage/capture']);
  }

  onSelect0(event) {
    console.log("button");
		console.log(event);
		this.files1.push(...event.addedFiles);
	}

	onRemove0(event) {
		console.log(event);
		this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect1(event) {
    console.log("button");
		console.log(event);
		this.files2.push(...event.addedFiles);
	}

	onRemove1(event) {
		console.log(event);
		this.files2.splice(this.files2.indexOf(event), 1);
  }

  onSelect2(event) {
    console.log("button");
		console.log(event);
		this.files3.push(...event.addedFiles);
	}

	onRemove2(event) {
		console.log(event);
		this.files3.splice(this.files3.indexOf(event), 1);
	}

}

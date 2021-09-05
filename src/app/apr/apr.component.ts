
 

  
import { Component, OnInit, ViewChild } from '@angular/core';
import { constant as CONSTANT } from '../constants';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import NeoVis from 'neovis.js/dist/neovis.js';
import { NEOVIS_DEFAULT_CONFIG } from 'neovis.js'; 
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-apr',
  templateUrl: './apr.component.html',
  styleUrls: ['./apr.component.css']
})
export class APRComponent implements OnInit {
  orgName:string="";
  constructor(private router: Router,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.orgName=sessionStorage.getItem("OrgName");
    let intitalcypherArray=["CALL apoc.load.jdbc('jdbc:mysql://10.41.2.15:3306/CSB_CloudAssist?user=root&password=slk@SOFT123','ca_lob_master') YIELD row Create(a:lob) set a=row return a",
    "CALL apoc.load.jdbc('jdbc:mysql://10.41.2.15:3306/CSB_CloudAssist?user=root&password=slk@SOFT123','ca_app_master') YIELD row Create(a:application) set a=row return a",
    "CALL apoc.load.jdbc('jdbc:mysql://10.41.2.15:3306/CSB_CloudAssist?user=root&password=slk@SOFT123','ca_infra_data') YIELD row Create(a:infra) set a=row return a"]

    intitalcypherArray.map(m=>{
      const config = {
        container_id: "viz",
        server_url: "neo4j://142.102.27.102:7687",
        server_user: "test",
        server_password: "test@1234",
  
        interaction: {
          hover: true,
          keyboard: {
              enabled: true,
              bindToWindow: false
          }, 
          navigationButtons: true,
          tooltipDelay: 1000000,
          hideEdgesOnDrag: true,
          zoomView: true
      },
        "labels": {
          "Lob_Name": {
            "caption":"App System",
            "font": {
              "size":36,
              "color":"#000000"
          },
          },
        },
        "LOB": {
          "thickness": "weight",
          "caption": true 
      },
        initial_cypher:m
        
    };
    const viz = new NeoVis(config);
    // viz.render();
    })
    
  // const viz = new NeoVis(config);
  // console.log(viz);
  // viz.render();
 
  }

  handleChange($event){
    this.draw();
  }
  handleChange1($event){
   this.draw1();
  }
  handleChange2($event){
    
    this.draw2();
  }

  draw2(){
   // this.SpinnerService.show(); 
    //var target = document.getElementById('viz');
    //var spinner = new spinner(opts).spin(target);


    const config = {
      container_id: "viz",
      server_url: "neo4j://142.102.27.102:7687",
      server_user: "test",
      server_password: "test@1234",

      interaction: {
        hover: true,
        keyboard: {
            enabled: true,
            bindToWindow: false
        }, 
        navigationButtons: true,
        tooltipDelay: 1000000,
        hideEdgesOnDrag: true,
        zoomView: true
    },
      "labels": {
        "Lob_Name": {
          "caption":"App System",
          "font": {
            "size":36,
            "color":"#000000"
        },
        },
      },
      "LOB": {
        "thickness": "weight",
        "caption": true 
    },
      initial_cypher: "MATCH (n:lob) RETURN n LIMIT 25"

      //initial_cypher:"MATCH p=()-[r:DIRECTED]->() RETURN p LIMIT 25"
  };

  
  const viz = new NeoVis(config);
  console.log(viz);
  viz.render();
 
  
  

  }
draw1(){
  const config = {
    initial_cypher:"MATCH (t2:infra_app_mapping),(t1:application) WHERE t1.App_Master_Id = t2.App_Master_Id MERGE  (t1)-[:app_mapping]->(t2) return t1,t2",
        container_id: "viz",
        server_url: "neo4j://142.102.27.102:7687",
        server_user: "test",
        server_password: "test@1234",
       
        nodes : {
          shape : 'neo',
          size : 1,
      
  
          font : {
              size : 16,
              color : '#ffffff'
          },
          borderWidth : 2
      },
      labels: {
        "application": {
            "caption": "App_Name",
            "size": "pagerank",
            "community": "partition"
        },
        "infra": {
          "caption": "Host_Name",
          "size": "pagerank",
          "community": "partition"
      }
    },
        relationships: {
        "belongs_to": {
          "thickness": "count",
          "caption": true,
          "color":"#000000"
      }

    },
   
     
   
      
        
        

        arrows: true,
      

    };

    
    const viz = new NeoVis(config);
    console.log(viz);
    viz.render();
}

  draw() {

    
     const config = {
      initial_cypher:"MATCH (p1:application),(n:lob) match (p1)-[r:belongs_to]->(n) where n.Org_Id=1 RETURN p1,n, r ",
          container_id: "viz",
          server_url: "neo4j://142.102.27.102:7687",
          server_user: "test",
          server_password: "test@1234",
         
          nodes : {
            shape : 'neo',
            size : 1,
        
    
            font : {
                size : 16,
                color : '#ffffff'
            },
            borderWidth : 2
        },
        labels: {
          "application": {
              "caption": "App_Name",
              "size": "pagerank",
              "community": "partition"
          },
          "lob": {
            "caption": "Lob_Name",
            "size": "pagerank",
            "community": "partition"
        }
      },
          relationships: {
          "belongs_to": {
            "thickness": "count",
            "caption": true,
            "color":"#000000"
        }

      },
     
       
     
        
          
          

          arrows: true,
        

      };

      
      const viz = new NeoVis(config);
      console.log(viz);
      viz.render();
  }
  
}




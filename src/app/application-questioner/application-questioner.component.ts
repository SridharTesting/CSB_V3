import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { HTTPService } from '../service/httpService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppQuestioner } from '../model/ApplicationQuestionerModel';

import { ApplicationPopupComponent } from '../application-popup/application-popup.component';
import { MatDialog, } from '@angular/material/dialog';
import { DelegateUserComponent } from '../delegate-user/delegate-user.component';

@Component({
  selector: 'app-application-questioner',
  templateUrl: './application-questioner.component.html',
  styleUrls: ['./application-questioner.component.css']
})

export class ApplicationQuestionerComponent implements OnInit,OnDestroy {
  dbOssublookup:any[];
  dbsublookup:any[];
  appserversubtype:any;
  applicationamefrompop="";
  osversion:any;
  appselect:any
  applevelquestionerdatachanged:any;
  Appquestionerdatatodb: AppQuestioner[]=[];
  appidselect="";
  arraytobackend:FormGroup[]=[];
  newmodel ={
    questioner_category: "",
    questioner: []};
      dynamicquestion=[];
      tohtml=[];
  appid=[];
  orgId:any;
  applevelquestionerdata:any;
  categories=[];
  lobname="";
  applist: any;
  lobid:any;
  roleId:any;
  constructor( private http: HTTPService,private _snackBar: MatSnackBar,private dialogue : MatDialog,public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.lobid=sessionStorage.getItem("LobId");
    this.orgId=sessionStorage.getItem("orgId");
    this.roleId=sessionStorage.getItem("roleId");

    if(this.roleId!=3){
      this.lobid = parseInt( sessionStorage.getItem('lobid'))
    }else if(this.roleId==3){
      this.lobid = parseInt( sessionStorage.getItem('LobId'))
    }
    
    
    this.http.getlobtoquestioner(this.lobid).subscribe(
      (data)=>{this.applist=data
      })




    if(!(sessionStorage.getItem('apploblist')!=null&&sessionStorage.getItem('appidfrompopup')!=null&&sessionStorage.getItem('appnamefrompopup')!=null))
    {
      this.popup(); 
    }else{
      this.appidselect =sessionStorage.getItem('appidfrompopup');
      this.applicationamefrompop = sessionStorage.getItem('appnamefrompopup');
       this.lobname=sessionStorage.getItem('apploblist');
    }
    // console.log(this.appselect,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    this.orgId = parseInt(sessionStorage.getItem('orgId'));
      this.getappid();
    this. GetQuestionertoTableAppLevel();
    
  }

  
  getappid(){
    this.http.getfhnAppData().subscribe(
      (data)=>{
        this.appid = data.map(m=>{return m;});
        // console.log(this.appid,"from dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
      },(error) =>{
        // console.log(error);
      }
    );
  }

  formatquestion(list:any){
    let constmodel ={
      question_name:[],questioner_Cat_Id: 0,questioner_Id: 0,questioner_Lkp_Id: 0,questioner_values: [],response_Type: "",selected_val:""
    }
    this.newmodel.questioner.shift();
    list.forEach((e,i) => {
      this.newmodel.questioner_category = e.questioner_category;
      constmodel.question_name = e.questioner;
      constmodel.questioner_Cat_Id = e.questioner_Cat_Id;
      constmodel.questioner_Id= e.questioner_Id;
      constmodel.questioner_Lkp_Id= e.questioner_Lkp_Id;
      constmodel.questioner_values = e.questioner_values;
      constmodel.response_Type= e.response_Type;
      constmodel.selected_val= e.selected_val;
      this.newmodel.questioner.push(constmodel);
      this.dynamicquestion.push(this.newmodel);
      constmodel ={  
        question_name:[],questioner_Cat_Id: 0, questioner_Id: 0,questioner_Lkp_Id: 0,questioner_values: [],response_Type: "",selected_val:""
      }
      this.newmodel={
        questioner_category: "",
        questioner: [{question_name:[],questioner_Cat_Id: 0,questioner_Id: 0,questioner_Lkp_Id: 0,questioner_values: [],response_Type: "",selected_val:""
        }]}
    });
    // console.log(this.dynamicquestion,"new model");
    let answer=[];
    let temp =[];
    temp.push(this.dynamicquestion.map((m,i)=>{if(i>0) return m.questioner[1]
      else return m.questioner[0]}));
    // console.log(temp,"should check what is this !!");
    temp.map((e) => {
      // console.log(e,"inside e");
      e.map(m=>{
        let models = {questionname:"",options:""};
        if(m.question_name)
      models.questionname=m.question_name;
      models.options=m.questioner_values;
      answer.push(models);
      });
    });
    let newar = new Map();
    let opt=[];
    answer.map((e,i) => {
       let d ={quest:"",option:[]}
      if(i==0){
        opt.push(e.options);
        d.quest = e.questionname; d.option = e.options;
        newar.set(d.quest,d.option);
      }
      if(i>0){
          if(newar.has(e.questionname)){
            opt.push(e.options);
              newar.set(e.questionname,opt);
          }
          else{
            opt=[];d ={quest:"",option:[]}
            d.quest = e.questionname; d.option = e.options;
            opt.push(e.options);
            newar.set(d.quest,opt);
          }
    }
    });
    this.dynamicquestion.map((m,i)=>{
      this.tohtml=[];
      let  keys = [...newar.keys()];
      if(keys.includes(m.questioner[0].question_name)){
        m.questioner[0].questioner_values = newar.get(m.questioner[0].question_name);
      }
      if(i>0)
      if(keys.includes(m.questioner[1].question_name)){
        m.questioner[1].questioner_values = newar.get(m.questioner[1].question_name);
      }
    });
    this.dynamicquestion.map((f,i)=>{
      if(i==0) this.tohtml.push(f) ;
      else if(i==1){
        if(this.dynamicquestion[i-1].questioner[0].question_name!==f.questioner[1].question_name )
          this.tohtml.push(f);
      }
      else {
        if(this.dynamicquestion[i-1].questioner[1].question_name!==f.questioner[1].question_name )
           this.tohtml.push(f);
      }
    });
    this.dynamicquestion=[];
    // console.log(this.tohtml,"finally got it");
    this.arraytobackend =[];
    this.arraytobackend = this.formnewQuestionGroup(this.tohtml);
    // console.log(this.arraytobackend,"Formgroup")
    return this.arraytobackend;
  }

  GetQuestionertoTableAppLevel(){
    this.http.GetQuestionertoTableAppLevel(this.orgId).subscribe((data)=>{
      this.applevelquestionerdata = data;
      // console.log(this.applevelquestionerdata,"sssssssssssssssssssssssssss");
      
      this.categories = this.applevelquestionerdata.map(m=>{
        if(!this.categories.includes(m["questioner_category"]))
        return m["questioner_category"];
      })
      this.categories = this.categories.filter((m,i)=>{
       return this.categories.indexOf(m)===i;
      });
      // console.log(this.categories,"check catttttttttttttt");
      this.arraytobackend = this.formatquestion(this.applevelquestionerdata);
      // console.log(this.arraytobackend,"sssssssssssssssssssssssssssss");
      
    });
  }

  formnewQuestionGroup(list: any[]){
    const qlist: FormGroup[] = [];
    for (const question of list) {
      let que: FormGroup = new FormGroup({});
      let opt: FormArray = new FormArray([]);
      que.registerControl('questioner_category',new FormControl(question.questioner_category));
      if(question.questioner[0].questioner_Id!=0 )
        que.registerControl('questionName',new FormControl(question.questioner[0].question_name));
      else que.registerControl('questionName',new FormControl( question.questioner[1].question_name));

      if(question.questioner[0].questioner_Id!=0 )
        que.registerControl('response_Type',new FormControl(question.questioner[0].response_Type));
      else que.registerControl('response_Type',new FormControl( question.questioner[1].response_Type));

      if(question.questioner[0].questioner_Id!=0  )
       que.registerControl('questioner_Id',new FormControl(question.questioner[0].questioner_Id));
      else que.registerControl('questioner_Id',new FormControl(question.questioner[1].questioner_Id));

      if(question.questioner[0].questioner_Id!=0  )
       que.registerControl('questioner_Lkp_Id',new FormControl(question.questioner[0].questioner_Lkp_Id));
      else que.registerControl('questioner_Lkp_Id',new FormControl(question.questioner[1].questioner_Lkp_Id));

      if(question.questioner[0].questioner_Id!=0  )
       que.registerControl('selected_val',new FormControl(question.questioner[0].selected_val));
      else que.registerControl('selected_val',new FormControl(question.questioner[1].selected_val));

      que.registerControl('selectedoption', new FormControl(''));
      let c=[];
      if(question.questioner[0].questioner_Id !=0 ){
         c  = question.questioner[0].questioner_values;
      }else {
        c = question.questioner[1].questioner_values;
      }
      for (const option of c) {
        let optionName = new FormControl(option);
        opt.push(optionName);
      }
      que.registerControl('options', opt);
      qlist.push(que);
    }
    return qlist;
  }

  submitq(){
    if(this.appidselect){
    let finalquestionapp = [...this.arraytobackend];
  
    
    finalquestionapp.map((m,i) => {
    
      
      if(m.controls.selectedoption.value!==""&&m.controls.selectedoption.value!==null){
        const appquesttodb: AppQuestioner = {
          resp_Id :0,
          app_Id:0,
          questioner_Id:0,
          questioner_Lkp_Id:0,
          comments:"",
          rec_Ins_Dt: null,
          rec_Upd_Dt: null,
        };
        var d = new Date().toISOString();
        appquesttodb.app_Id = parseInt(this.appidselect);
        appquesttodb.questioner_Id = m.value.questioner_Id;
        appquesttodb.questioner_Lkp_Id = m.value.questioner_Lkp_Id;
        appquesttodb.rec_Ins_Dt = d;
        appquesttodb.resp_Id = i+1;
        if(m.controls.selectedoption.value!==""&&m.controls.selectedoption.value!==null){
          appquesttodb.rec_Upd_Dt = d;
          appquesttodb.comments = m.controls.selectedoption.value;
        }
        this.Appquestionerdatatodb.push(appquesttodb);
      }

    });

    this.http.ApplicationDeleteQuestionerTable(parseInt(this.appidselect)).subscribe(
      (data)=>{
        // console.log("deleted");
      },(error)=>{
        this._snackBar.open("Exception Occured","X");
      },
      ()=>{
        // console.log(this.Appquestionerdatatodb,"dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        this.http.AppPostQuestionertoTable(this.Appquestionerdatatodb,this.orgId).subscribe(()=>{
          this._snackBar.open("Response Captured Successfully","X");
        },(e)=>{
          // console.log(e);
          this._snackBar.open("Exception Occured","X");
        },()=>{
          this.Appquestionerdatatodb = [];
        });
      });
    }
    else{
      this._snackBar.open("Please Select an Application","X");
    }
    
  }

  appidchanged(name:any){
    
    this.http.GetQuestionertoTableAppLevel(parseInt(this.appidselect)).subscribe(
      (data)=>{
        this.applevelquestionerdatachanged = data;
        this.arraytobackend=[];
        this.arraytobackend = this.formatquestion(this.applevelquestionerdatachanged);
        // this.appidselect =
        // console.log( this.arraytobackend,"array to backend");
        
      });
  }

  ApplicationSelectionCheck(){
    if(!this.appidselect){
      this._snackBar.open("PLease select an Application !!","X")
    }

  }

  popup(){
    var dialogRef = this.dialogue.open(ApplicationPopupComponent ,
      {
        height: '53%',
        width: '50%',
        disableClose:true,
        data:"test"
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        this.appidselect =sessionStorage.getItem('appidfrompopup');
        this.applicationamefrompop = sessionStorage.getItem('appnamefrompopup');
this.lobname=sessionStorage.getItem('apploblist');
this.lobname = "   "+this.lobname;
this.applicationamefrompop = "   "+this.applicationamefrompop;
        // this.appidselect = this.appselect;
        this.appidselect = "   "+this.appidselect;
      this.appidchanged(this.appidselect)
      });
      
       
  }
appserverchanged(name:any){
  // console.log(name,"selection changed ");

    this.http.getsublookup(name+"").subscribe(result=>{
      this.appserversubtype = result;
      // console.log(this.osversion,"subversionsssssssssssssssssssssss");
      
    });
}

  ddchanged(name:any){
    // console.log(name,"selection changed ");

    this.http.getsublookup(name+"").subscribe(result=>{
      this.osversion = result;
      // console.log(this.osversion,"subversionsssssssssssssssssssssss");
      
    });
  }

  ddchangedappbachendDB(name:any){
    // console.log(name,"selection changed ");
    this.dbsublookup = [];
    this.http.getsublookup(name+"").subscribe((result:any[])=>{
      result.map(m=>{
        this.dbsublookup.push(m);
      })
      // console.log(this.osversion,"subversionsssssssssssssssssssssss");
    });
  }

  ddchangedDBOS(name:any){
    // console.log(name,"selection changed ");
    this.dbOssublookup = [];
    this.http.getsublookup(name+"").subscribe((result:any[])=>{
      result.map(m=>{
        this.dbOssublookup.push(m);
      })
      // console.log(this.osversion,"subversionsssssssssssssssssssssss");
    });
  }

  ngOnDestroy(){
    sessionStorage.removeItem('apploblist');
    sessionStorage.removeItem('appidfrompopup');
    sessionStorage.removeItem('appidfrompopup')
    }

    addDelegate(){
      
        let dialogref = this.dialog.open(DelegateUserComponent , {
          height: '500px'
          
        });
     
      }

    }



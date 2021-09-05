import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HTTPService } from 'src/app/service/httpService.service';
import { CSBQuestioner } from '../model/CSBQuestioner';
import { BuildQuestionerTableService } from './../service/questionerservice/build-questioner-table.service';
import { Questioner } from '../model/QuestionerResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppQuestioner } from '../model/ApplicationQuestionerModel';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";



export interface option {
  questioner_values: string;
  questioner_Lkp_Id: number;
}

export interface question {
  questioner_Id: number;
  questioner: string;
  questioner_category: string;
  response_Type: String;
  options: option[];
}

@Component({
  selector: 'app-csb',
  templateUrl: './csb.component.html',
  styleUrls: ['./csb.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CSBComponent implements OnInit {

  newmodel ={
questioner_category: "",
questioner: []};
  dynamicquestion=[];
  tohtml=[];
  categories:any[]=[];
  categoryid:any =[];
  appid:any;
  appidselect:any;
  selectedRadio:any;
  showcsb=true;
  showapplication=false;
  selected:any;
  orgId: number = 0;
  questionerdatatodb: Questioner[]=[];
  Appquestionerdatatodb: AppQuestioner[]=[];
  selectedbusiness: any[] = [];
  question: CSBQuestioner = {
    questioner: '',
    questioner_Id: 0,
    questioner_category: '',
    questioner_values: [],
    questioner_Lkp_Id: 0,
    response_Type: '',
    selected_val:"",

  };
  arraytobackend:FormGroup[]=[];

  questionarrayBusiness: FormGroup[] = [];
  questionarrayPeople: FormGroup[] = [];
  questionarrayProcess: FormGroup[] = [];
  questionarrayOperation: FormGroup[] = [];
  questionarraySecurity: FormGroup[] = [];

  questionarrayappLevelGeneralQuestions: FormGroup[] = [];
  questionarrayappLevelBusinessQuestions: FormGroup[] = [];
  questionarrayappLevelLegalandRiskQuestions: FormGroup[] = [];
  questionarrayappLevelDataorStorageQuestions: FormGroup[] = [];
  questionarrayappLevelSecurityQuestions: FormGroup[] = [];
  questionarrayappLevelTechDiscoveryQuestions: FormGroup[] = [];
  questionarrayappLevelTechnicalQuestions: FormGroup[] = [];
  questionarrayappLevelDeploymentQuestions: FormGroup[] = [];
  questionarrayappLevelApplicationModernizationQuestions: FormGroup[] = [];
  questionarrayappLevelWorkloadorSiebelQuestions: FormGroup[] = [];
  questionarrayappLevelWorkloadorSAPQuestions: FormGroup[] = [];
  questionarrayappLevelWorkloadorSharePointQuestions: FormGroup[] = [];
  questionarrayappLevelWorkloadorOracleQuestions: FormGroup[] = [];
  questionarrayappLevelDatabaseQuestions: FormGroup[] = [];

  BusinessQuestions: any[] = [];
  PeopleQuestions: any;
  ProcessQuestions: any;
  OperationQuestions: any;
  SecurityQuestions: any;
  BusinessOptions: any;

  appLevelGeneralQuestions: any;
  appLevelBusinessQuestions: any;
  appLevelLegalandRiskQuestions: any;
  appLevelDataorStorageQuestions: any;
  appLevelSecurityQuestions: any;
  appLevelTechDiscoveryQuestions: any;
  appLevelTechnicalQuestions: any;
  appLevelDeploymentQuestions: any;
  appLevelApplicationModernizationQuestions: any;
  appLevelWorkloadorSiebelQuestions: any;
  appLevelWorkloadorSAPQuestions: any;
  appLevelWorkloadorSharePointQuestions: any;
  appLevelWorkloadorOracleQuestions: any;
  appLevelDatabaseQuestions: any;

  questions: any;
  response: any;
  Slno: any;
  businessFormGroup: FormGroup;
  questiongroup: FormGroup[] = [];
  applevelquestionerdata:any;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HTTPService,
    private questionerservice: BuildQuestionerTableService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.orgId = parseInt(sessionStorage.getItem('orgId'));
    this.CSBQuestionerMethod();
    // this.getappid();
    // this. GetQuestionertoTableAppLevel();

  }

  CSBQuestionerMethod() {
    this.http.GetQuestionertoTable(this.orgId).subscribe((result: CSBQuestioner) => {
      this.questions = result;
      this.categories = this.questions.map(m=>{
        if(!this.categories.includes(m["questioner_category"]))
        return m["questioner_category"];
      })
      this.categories = this.categories.filter((m,i)=>{
       return this.categories.indexOf(m)===i;
      });
      // console.log(this.questions,"aaababaababab");
      let constmodel ={
        question_name:[],questioner_Cat_Id: 0,questioner_Id: 0,questioner_Lkp_Id: 0,questioner_values: [],response_Type: "",selected_val:""
      }
      this.newmodel.questioner.shift();
      this.questions.forEach((e,i) => {
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
        e.map(m=>{
          let models = {questionname:"",options:""};
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
      // console.log(this.tohtml,"finally got it");
      this.arraytobackend = this.formnewQuestionGroup(this.tohtml);
      // console.log(this.arraytobackend,"Formgroup");
      // console.log(this.dynamicquestion,"ready to show!!");
      // console.log(newar,"this is the final answer");
      // console.log(options,"this is the final options");
      // this.BusinessQuestions = this.questions.filter(
      //   (w) => w['questioner_category'] === 'Business'
      // );
      // this.PeopleQuestions = this.questions.filter(
      //   (w) => w['questioner_category'] === 'People'
      // );
      // this.ProcessQuestions = this.questions.filter(
      //   (w) => w['questioner_category'] === 'Process'
      // );
      // this.OperationQuestions = this.questions.filter(
      //   (w) => w['questioner_category'] === 'Operations'
      // );
      // this.SecurityQuestions = this.questions.filter(
      //   (w) => w['questioner_category'] === 'Security'
      // );

      // this.questionarrayBusiness = this.formQuestiongroup(
      //   this.questionerservice.buildquestioner(this.BusinessQuestions)
      // );
      // this.questionarrayPeople = this.formQuestiongroup(
      //   this.questionerservice.buildquestioner(this.PeopleQuestions)
      // );
      // this.questionarrayProcess = this.formQuestiongroup(
      //   this.questionerservice.buildquestioner(this.ProcessQuestions)
      // );
      // this.questionarrayOperation = this.formQuestiongroup(
      //   this.questionerservice.buildquestioner(this.OperationQuestions)
      // );
      // this.questionarraySecurity = this.formQuestiongroup(
      //   this.questionerservice.buildquestioner(this.SecurityQuestions)
      // );
      //   console.log(this.questionarrayBusiness,"array  i wanr ");

    });

  }

  onappsubmit(){
    let finalquestionapp: FormGroup[] = [
      ...this.questionarrayappLevelApplicationModernizationQuestions,
      ...this.questionarrayappLevelBusinessQuestions,
      ...this.questionarrayappLevelDatabaseQuestions,
      ...this.questionarrayappLevelDataorStorageQuestions,
      ...this.questionarrayappLevelDeploymentQuestions,
      ...this.questionarrayappLevelGeneralQuestions ,
      ...this.questionarrayappLevelLegalandRiskQuestions,
      ...this.questionarrayappLevelSecurityQuestions,
      ...this.questionarrayappLevelTechDiscoveryQuestions,
      ...this.questionarrayappLevelTechnicalQuestions,
      ...this.questionarrayappLevelWorkloadorOracleQuestions ,
      ...this.questionarrayappLevelWorkloadorSAPQuestions,
      ...this.questionarrayappLevelWorkloadorSharePointQuestions ,
      ...this.questionarrayappLevelWorkloadorSiebelQuestions
    ];

    finalquestionapp.map((m,i) => {
      if(m.value.selectedoption!==""&&m.value.selectedoption!==null){
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
        appquesttodb.app_Id =this.appidselect;
        appquesttodb.questioner_Id = m.value.questioner_Id;
        appquesttodb.questioner_Lkp_Id = m.value.questioner_Lkp_Id;
        appquesttodb.rec_Ins_Dt = d;
        appquesttodb.resp_Id = i+1;
        if(m.value.selectedoption!==""&&m.value.selectedoption!==null){
          appquesttodb.rec_Upd_Dt = d;
          appquesttodb.comments = m.value.selectedoption;
        }
        this.Appquestionerdatatodb.push(appquesttodb);
      }

    });

    this.http.ApplicationDeleteQuestionerTable(this.appidselect).subscribe(
      (data)=>{
        // console.log("deleted");
      },(error)=>{
        this._snackBar.open("Exception Occured","X");
      },
      ()=>{
        // console.log(this.Appquestionerdatatodb,"dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        this.http.AppPostQuestionertoTable(this.Appquestionerdatatodb, this.orgId).subscribe(()=>{
          this._snackBar.open("Response Captured Successfully","X");
        },(e)=>{
          // console.log(e);
          this._snackBar.open("Exception Occured","X");
        },()=>{
          this.Appquestionerdatatodb = [];
        });
      });

  }
  appidchanged(){
  this.http.getselectedvalues(this.appidselect).subscribe(
    (data)=>{
      this.applevelquestionerdata = data;
      this.appLevelApplicationModernizationQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Application Modernization'
      );
      // console.log(this.appLevelApplicationModernizationQuestions,"bbbbbbbbbbbbbbbbbb");
      this.appLevelBusinessQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Business'
      );
      this.appLevelDatabaseQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Database'
      );
      this.appLevelDataorStorageQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Data/Storage'
      );
      this.appLevelDeploymentQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Deployment'
      );
      this.appLevelGeneralQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'General'
      );
      this.appLevelLegalandRiskQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Legal and Risk'
      );
      this.appLevelSecurityQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Security'
      );
      this.appLevelTechDiscoveryQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'TechDiscovery'
      );
      this.appLevelTechnicalQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Technical'
      );
      this.appLevelWorkloadorOracleQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/Oracle'
      );
      this.appLevelWorkloadorSAPQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/SAP'
      );
      this.appLevelWorkloadorSharePointQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/SharePoint'
      );
      this.appLevelWorkloadorSiebelQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/Siebel'
      );

      this.questionarrayappLevelApplicationModernizationQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelApplicationModernizationQuestions)
      );
      // console.log(this.questionarrayappLevelApplicationModernizationQuestions,"after manupulation");
      this.questionarrayappLevelBusinessQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelBusinessQuestions)
      );
      this.questionarrayappLevelDatabaseQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelDatabaseQuestions)
      );
      this.questionarrayappLevelDataorStorageQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelDataorStorageQuestions)
      );
      this.questionarrayappLevelDeploymentQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelDeploymentQuestions)
      );
      this.questionarrayappLevelGeneralQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelGeneralQuestions)
      );
      this.questionarrayappLevelLegalandRiskQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelLegalandRiskQuestions)
      );
      this.questionarrayappLevelSecurityQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelSecurityQuestions)
      );
      this.questionarrayappLevelTechDiscoveryQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelTechDiscoveryQuestions)
      );
      this.questionarrayappLevelTechnicalQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelTechnicalQuestions)
      );
      this.questionarrayappLevelWorkloadorOracleQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorOracleQuestions)
      );
      this.questionarrayappLevelWorkloadorSAPQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorSAPQuestions)
      );
      this.questionarrayappLevelWorkloadorSharePointQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorSharePointQuestions)
      );
      this.questionarrayappLevelWorkloadorSiebelQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorSiebelQuestions)
      );
    }
  )

  }

  submitq(){
    let finalqu: FormGroup[] = [...this.arraytobackend];
    // console.log(finalqu, 'to db ');
    finalqu.map((m,i) => {
      if(m.value.selectedoption!==""&&m.value.selectedoption!==null){
      const questtodb: Questioner = {
        questioner_Id: 0,
        questioner_Lkp_Id: 0,
        org_Id: 0,
        comments: '',
        rec_Ins_Dt: null,
        rec_Upd_Dt: null,
        response_Id:0
      };
      var d = new Date().toISOString();
      questtodb.response_Id = i+1;
      questtodb.org_Id = this.orgId;
      questtodb.questioner_Id = m.value.questioner_Id;
      questtodb.questioner_Lkp_Id = m.value.questioner_Lkp_Id;
      questtodb.rec_Ins_Dt = d;
      if(m.value.selectedoption!==""&&m.value.selectedoption!==null){
      questtodb.rec_Upd_Dt = d;
      questtodb.comments = m.value.selectedoption;
      }
      this.questionerdatatodb.push(questtodb);
    }
    });


    this.http.DeleteQuestionertoTable(this.orgId).subscribe(
      (d)=>{
        // console.log("deleted");
      },(e)=>{
        // console.log("error");

      },()=>{
        this.http.PostQuestionertoTable(this.questionerdatatodb).subscribe(
          (data) =>{
            // console.log(data);
            this._snackBar.open("Response Captured Successfully","X");
          },
          (e) => {
            this._snackBar.open("Could not Capture Response !! Try again after some Time ","X");
          },()=>
          {
            this.questionerdatatodb = [];
          }
        );
      }
    );


    // console.log(this.questionerdatatodb,"dtat to dbbbbbbbbbbbbbbbbbbbbbbbbbbbbb ");
  }

  oncsbsubmit() {
    let finalquestion: FormGroup[] = [
      ...this.questionarrayBusiness,
      ...this.questionarrayPeople,
      ...this.questionarrayProcess,
      ...this.questionarrayOperation,
      ...this.questionarraySecurity,
    ];
    // console.log(finalquestion, 'to db ');

    finalquestion.map((m,i) => {
      if(m.value.selectedoption!==""&&m.value.selectedoption!==null){
      const questtodb: Questioner = {
        questioner_Id: 0,
        questioner_Lkp_Id: 0,
        org_Id: 0,
        comments: '',
        rec_Ins_Dt: null,
        rec_Upd_Dt: null,
        response_Id:0
      };
      var d = new Date().toISOString();
      questtodb.response_Id = i+1;
      questtodb.org_Id = this.orgId;
      questtodb.questioner_Id = m.value.questioner_Id;
      questtodb.questioner_Lkp_Id = m.value.questioner_Lkp_Id;
      questtodb.rec_Ins_Dt = d;
      if(m.value.selectedoption!==""&&m.value.selectedoption!==null){
      questtodb.rec_Upd_Dt = d;
      questtodb.comments = m.value.selectedoption;
      }
      this.questionerdatatodb.push(questtodb);
    }
    });


    this.http.DeleteQuestionertoTable(this.orgId).subscribe(
      (d)=>{
        // console.log("deleted");
      },(e)=>{
        // console.log("error");

      },()=>{
        this.http.PostQuestionertoTable(this.questionerdatatodb).subscribe(
          (data) =>{
            // console.log(data);
            this._snackBar.open("Response Captured Successfully","X");
          },
          (e) => {
            this._snackBar.open("Could not Capture Response !! Try again after some Time ","X");
          },()=>
          {
            this.questionerdatatodb = [];
          }
        );
      }
    );


    // console.log(this.questionerdatatodb,"dtat to dbbbbbbbbbbbbbbbbbbbbbbbbbbbbb ");
  }
  changed(event) {
    // console.log(event);
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

  formQuestiongroup(list: any[]) {
    const qlist: FormGroup[] = [];
    for (const question of list) {
      // console.log(question,"question recieved");
      let que: FormGroup = new FormGroup({});
      let opt: FormArray = new FormArray([]);
      que.registerControl(
        'questionName',
        new FormControl(question['questioner'])
      );
      que.registerControl(
        'questioner_Id',
        new FormControl(question['questioner_Id'])
      );
      que.registerControl(
        'questioner_Lkp_Id',
        new FormControl(question['questioner_Lkp_Id'])
      );
      que.registerControl(
        'selected_val',
        new FormControl(question['selected_val'])
      );
      que.registerControl('selectedoption', new FormControl(''));
      for (const option of question.questioner_values) {
        let optionName = new FormControl(option);
        opt.push(optionName);
      }
      que.registerControl('options', opt);
      qlist.push(que);
    }
    return qlist;
  }

  radiochanged(){
    // debugger;
    // console.log("changed to " ,this.selectedRadio);

    if(this.selectedRadio==="csb"){
      this.showapplication=false;
      this.showcsb = true;
    }
    else if(this.selectedRadio==="application"){
      this.showcsb = false;
      this.showapplication=true;
    }
  }

  getappid(){
    this.http.getfhnAppData().subscribe(
      (data)=>{
        this.appid = data.map(m=>{return m;});
        // console.log(this.appid,"from db")
      },(error) =>{
        // console.log(error);
      }
    );
  }

  GetQuestionertoTableAppLevel(){
    this.http.GetQuestionertoTableAppLevel(this.orgId).subscribe((data)=>{
      this.applevelquestionerdata = data;
      // console.log(this.applevelquestionerdata,"bbbbbbbbbbbbbbbbbbbbbb");

      this.appLevelApplicationModernizationQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Application Modernization'
      );
      // console.log(this.appLevelApplicationModernizationQuestions,"bbbbbbbbbbbbbbbbbb");
      this.appLevelBusinessQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Business'
      );
      this.appLevelDatabaseQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Database'
      );
      this.appLevelDataorStorageQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Data/Storage'
      );
      this.appLevelDeploymentQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Deployment'
      );
      this.appLevelGeneralQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'General'
      );
      this.appLevelLegalandRiskQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Legal and Risk'
      );
      this.appLevelSecurityQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Security'
      );
      this.appLevelTechDiscoveryQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'TechDiscovery'
      );
      this.appLevelTechnicalQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Technical'
      );
      this.appLevelWorkloadorOracleQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/Oracle'
      );
      this.appLevelWorkloadorSAPQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/SAP'
      );
      this.appLevelWorkloadorSharePointQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/SharePoint'
      );
      this.appLevelWorkloadorSiebelQuestions = this.applevelquestionerdata.filter(
        (w) => w['questioner_category'] === 'Workload/Siebel'
      );

      this.questionarrayappLevelApplicationModernizationQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelApplicationModernizationQuestions)
      );
      // console.log(this.questionarrayappLevelApplicationModernizationQuestions,"after manupulation");
      this.questionarrayappLevelBusinessQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelBusinessQuestions)
      );
      this.questionarrayappLevelDatabaseQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelDatabaseQuestions)
      );
      this.questionarrayappLevelDataorStorageQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelDataorStorageQuestions)
      );
      this.questionarrayappLevelDeploymentQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelDeploymentQuestions)
      );
      this.questionarrayappLevelGeneralQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelGeneralQuestions)
      );
      this.questionarrayappLevelLegalandRiskQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelLegalandRiskQuestions)
      );
      this.questionarrayappLevelSecurityQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelSecurityQuestions)
      );
      this.questionarrayappLevelTechDiscoveryQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelTechDiscoveryQuestions)
      );
      this.questionarrayappLevelTechnicalQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelTechnicalQuestions)
      );
      this.questionarrayappLevelWorkloadorOracleQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorOracleQuestions)
      );
      this.questionarrayappLevelWorkloadorSAPQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorSAPQuestions)
      );
      this.questionarrayappLevelWorkloadorSharePointQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorSharePointQuestions)
      );
      this.questionarrayappLevelWorkloadorSiebelQuestions = this.formQuestiongroup(
        this.questionerservice.buildquestioner(this.appLevelWorkloadorSiebelQuestions)
      );

    });
  }


}



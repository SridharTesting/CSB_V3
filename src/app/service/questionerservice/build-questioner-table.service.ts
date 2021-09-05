import { Injectable } from '@angular/core';
import { CSBQuestioner } from '../../model/CSBQuestioner';

@Injectable({
  providedIn: 'root'
})
export class BuildQuestionerTableService {

  question:CSBQuestioner={
    questioner:"",
    questioner_Id:0,
    questioner_category:"",
    questioner_values:[],
    questioner_Lkp_Id:0,
    response_Type:"",
    selected_val:"",
  };
  questionarray:CSBQuestioner[]=[];
  constructor() { }

  public buildquestioner(list: any[]): CSBQuestioner[]{
    list.map((m,i)=> {
      if(i==0)
      {
        this.questionarray=[];
        this.question.questioner = m["questioner"];
        this.question.questioner_Id = m["questioner_Id"];
        this.question.questioner_category = m["questioner_category"];
        this.question.selected_val = m["selected_val"];
        this.question.questioner_Lkp_Id = m["questioner_Lkp_Id"];
        this.question.questioner_values.push( m["questioner_values"]);
        return;
      }
      if(list[i-1]["questioner_Id"]==list[i]["questioner_Id"])
      {
        this.question.questioner = m["questioner"];
        this.question.questioner_Id = m["questioner_Id"];
        this.question.questioner_category = m["questioner_category"];
        this.question.selected_val = m["selected_val"];
        this.question.questioner_Lkp_Id = m["questioner_Lkp_Id"];
        this.question.questioner_values.push( m["questioner_values"]);

      }
      if(list[i-1]["questioner_Id"]!==list[i]["questioner_Id"]){
        this.questionarray.push(this.question);
        this.question={
          questioner:"",
          questioner_Id:0,
          questioner_category:"",
          questioner_values:[],
          questioner_Lkp_Id:0,
          response_Type:"",
          selected_val:"",
    }

        this.question.questioner = m["questioner"];
        this.question.questioner_Id = m["questioner_Id"];
        this.question.questioner_category = m["questioner_category"];
        this.question.selected_val = m["selected_val"];
        this.question.questioner_Lkp_Id = m["questioner_Lkp_Id"];
        this.question.questioner_values.push( m["questioner_values"]);
      }
     if(i==list.length-1){
      this.questionarray.push(this.question);
      this.question={
        questioner:"",
    questioner_Id:0,
    questioner_category:"",
    questioner_values:[],
    questioner_Lkp_Id:0,
    response_Type:"",
    selected_val:"",
    }

     }



  })
  return this.questionarray;
}

}


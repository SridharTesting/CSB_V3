export class Questioner {
  public app_Id: number;

  public app_System: String;

  public field_Name: String;

  public questioner: String;

  public field_Value: String;

  // constructor(){};

  constructor(
    app_Id: number,

    app_System: String,

    field_Name: String,

    questioner: String,

    field_Value: String
  ) {
    this.app_Id = app_Id;
    this.app_System = app_System;
    this.field_Name = field_Name;
    this.questioner = questioner;
    this.field_Value = field_Value;
  }


}

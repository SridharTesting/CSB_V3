export class FHN_Infra_Data{

  // public infraId:number;
  public orgId:number;
  public appId:string;
  public appSystem:string;
  public lastUpdate: string;
  public systemAdmin: string;
  public systemAdminEmployeeID: string;
  public dRRelationshipManager: string;
  public dRRelationshipManagerEmployeeID: string;
  public mainPlatform: string;
  public networkExposure: string;
  public rTO: string;
  public oS: string;
  public location: string;
  public createdDate: string;
  public author : string;
  public description:string;
  public versionNum:String;
  public versionId:number;


  constructor(
    //  infraId:number,
     orgId:number,
     appId:string,
     appSystem:string,
     lastUpdate: string,
     systemAdmin: string,
     systemAdminEmployeeID: string,
     dRRelationshipManager: string,
     dRRelationshipManagerEmployeeID: string,
     mainPlatform: string,
     networkExposure: string,
     rTO: string,
     oS: string,
     location: string,
     createdDate: string,
   author : string,
   description:string,
   versionNum:String,
   versionId:number
  ){
    // this.infraId=infraId,
     this.orgId=orgId,
     this.appId=appId,
     this.appSystem=appSystem,
     this.lastUpdate=lastUpdate,
     this.systemAdmin=systemAdmin,
     this.systemAdminEmployeeID= systemAdminEmployeeID,
     this.dRRelationshipManager=dRRelationshipManager,
     this.dRRelationshipManagerEmployeeID=dRRelationshipManagerEmployeeID,
     this.mainPlatform=mainPlatform,
     this.networkExposure=networkExposure,
     this.rTO=rTO,
     this.oS=oS,
     this.location=location,
     this.createdDate= createdDate,
     this.author = author,
     this.description = description,
     this.versionNum = versionNum,
     this.versionId = versionId

  }
}

export class FHN_Process_Data{
    public orgId:any;
    public appId:number;
public appSystem:String
     public businessOwner:String;
     public businessOwnerEmployeeID:String;
     public businessManager:String;
     public businessManagerEmployeeID:String;
     public eTDirector:String;
     public eTDirectorEmployeeID:String;
     public eTManager:String;
     public eTManagerEmployeeID:String;
     public eTPrimaryTechnical:String;
     public eTPrimaryTechnicalEmployeeID:String;
     public eTSecondaryTechnical:String;
     public eTSecondaryTechnicalEmployeeID:String;
     public lob:String;
     public scName:String;
     public domain:String;
     
     public managerCertification:String;
     public qualityScore:String;
     
     public dRExerciseResults:String;
    
     public applicationDRPlan:String;
     public dRExerciseDate:String;
     public dRTier:String;
     public dRPlanDate:String;


	constructor(
        orgId:any,
        appId:number,
        appSystem:String,
        
        businessOwner:String,
        businessOwnerEmployeeID:String,
        businessManager:String,
        businessManagerEmployeeID:String,
        eTDirector:String,
        eTDirectorEmployeeID:String,
        eTManager:String,
        eTManagerEmployeeID:String,
        eTPrimaryTechnical:String,
        eTPrimaryTechnicalEmployeeID:String,
        eTSecondaryTechnical:String,
        eTSecondaryTechnicalEmployeeID:String,
        lob:String,
        scName:String,
        domain:String,
        managerCertification:String,
        qualityScore:String,
      
            
            dRExerciseResults:String,
        
            applicationDRPlan:String,
            dRExerciseDate:String,
            dRTier:String,
            dRPlanDate:String,
          
            ) {
                this.orgId=orgId
                this.appId=appId

  this.appSystem=appSystem
            this.businessOwner=businessOwner
this.businessOwnerEmployeeID=businessOwnerEmployeeID

            this.businessManager=businessManager
          
          
            this.businessManagerEmployeeID=businessManagerEmployeeID
          
          
            this.eTDirector=eTDirector
          
          
            this.eTDirectorEmployeeID=eTDirectorEmployeeID
          
          
          
            this.eTManager=eTManager
          
          
          
            this.eTManagerEmployeeID=eTManagerEmployeeID
          
            this.eTPrimaryTechnical=eTPrimaryTechnical
          
            this.eTPrimaryTechnicalEmployeeID=eTPrimaryTechnicalEmployeeID
          
          
            this.eTSecondaryTechnical=eTSecondaryTechnical
          
            this.eTSecondaryTechnicalEmployeeID=eTSecondaryTechnicalEmployeeID
            this.  lob=lob
            this.scName=scName
            this.domain=domain
            this.managerCertification=managerCertification
            this.qualityScore=qualityScore
            



 
  this.dRExerciseResults=dRExerciseResults


  this.applicationDRPlan=applicationDRPlan


  this.dRExerciseDate=dRExerciseDate


  this.dRTier=dRTier


  this.dRPlanDate=dRPlanDate
  
        }



}
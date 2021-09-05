
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import {Organization} from '../model/organization'
import { Observable } from 'rxjs';
import { FHN_Process_Data } from '../model/FHN_Process_Data';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType,HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HTTPService {
  debugger;
  private org=new Organization();
  private orgUrl = environment.orgUrl;
  private baseUrl = environment.baseUrl;
//  private baseUrl = 'http://10.60.30.61:8080/CSB_RestAPI';

  /*private headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'this.authenticationService.getToken()'
     });*/
  constructor(
    private http:HttpClient,
    private authenticationService: AuthenticationService) {
  }



  createOrg(org: object): Observable<object> {

    console.log("test create org");
    console.log(org);
    return this.http.post<any>(`${this.baseUrl}/createOrg`,org);
  }

  getorgList(): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.baseUrl}/org-list`);
  }

  deleteOrg(id: number): Observable<any> {
   debugger;
    return this.http.delete(`${this.baseUrl}/org/${id}`, { responseType: 'text' });
  }
  getVerforComparision(org_id:number,viewtype:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getver/${org_id}/${viewtype}`);
  }
  compareverProcess(id1: number,id2:number): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.baseUrl}/compareFileBasedOnVerProcess/${id1}/${id2}`);
  }

  updateOrg(org: object):Observable<any> {
    debugger;
     return this.http.put<any>(`${this.baseUrl}/org`,org);
   }


   createlob(lob: object): Observable<object> {


    return this.http.post<any>(`${this.baseUrl}/createLob`,lob);
  }

  getLOBList(orgId:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getOrgNameforLOB/${orgId}`);
  }

  uservalidation(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/loginvalidation`);
  }




  deleteLOB(id: number): Observable<any> {
    debugger;
     return this.http.delete(`${this.baseUrl}/lob/${id}`, { responseType: 'text' });
   }

   updateLOB(lob: object):Observable<any> {
    debugger;
     return this.http.put<any>(`${this.baseUrl}/lob`,lob);
   }


   

   fetchLOBByIDForUpdate(id:number):Observable<any> {
    debugger;
     return this.http.get<any>(`${this.baseUrl}/getlobbyid/${id}`);
   }
   createUsers(user: object): Observable<object> {


    return this.http.post<any>(`${this.baseUrl}/createUser`,user);
  }

  getUsersList(orgId:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getLobnameforusersnew/${orgId}`);
  }

  deleteUser(id: number): Observable<any> {
    debugger;
     return this.http.delete(`${this.baseUrl}/user/${id}`, { responseType: 'text' });
   }

   updateUser(user: object):Observable<any> {
    debugger;
     return this.http.put<any>(`${this.baseUrl}/users`,user);
   }

   fetchUserByIDForUpdate(id:number):Observable<any> {
    debugger;
     return this.http.get<any>(`${this.baseUrl}/getuserbyid/${id}`);
   }
   fetchOrgByIDForUpdate(id:number):Observable<any> {
    debugger;
     return this.http.get<any>(`${this.baseUrl}/getorgbyid/${id}`);
   }


   getLobs(orgId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/lob-list/${orgId}`);
  }

  getRoles():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/role-list`);
  }

  getVer():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getver/1`);
  }

  getOrgs():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/org-list`);
  }

  getLobBasedOnOrg(orgId:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getLobnamebasedonOrgId/${orgId}`)
  }

  getuserdashboard(lobId:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/userdashboard/${lobId}`)
  }

  getApps():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/app-list`)
  }


  getLobsLinkedToApps():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/lobMappedToApps`)
  }


  getAppsTaggedToLOBS(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getAppsTaggedToLOB/${id}`)

  }


  DownloadLatestFile(fileId:number,orgId:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/csv; charset=utf-8');
    return this.http.get<String>(`${this.baseUrl}/downloadFile/${fileId}/${orgId}`, { headers, responseType: 'arrayBuffer' as 'json'})
    
  }

  saveAppsMappedToLobs(appsToLobs:object):Observable<object> {

    return this.http.post<any>(`${this.baseUrl}/mapApps`,appsToLobs);
  }




  pushFileToStorage(file: File,orgId:String,userDisplayName:String,viewtype:number): Observable<object> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('orgId',String(orgId));
    formdata.append('userDisplayName',String(userDisplayName));
    formdata.append('viewtype',String(viewtype));

    const req = new HttpRequest('POST', `${this.baseUrl}/uploadblob`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
// get uplodedfiles table
getuplodedfiles(): Observable<any>{
  debugger
  return this.http.get<any>(`${this.baseUrl}/uploaded_files`);
}



  fetchBusProc1ByIDForUpdate(id:number):Observable<any> {
    debugger;
     return this.http.get<any>(`${this.baseUrl}/getbusproc1byid/${id}`);
   }
   createbusproc1(busproc1: object): Observable<object> {


    return this.http.post<any>(`${this.baseUrl}/createBusProc1`,busproc1);
  }

   getbusProc1List(): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.baseUrl}/getOrgNameforBusProc`);
  }

  deleteBusProc1(id: number): Observable<any> {
    debugger;
     return this.http.delete(`${this.baseUrl}/businessprocess1/${id}`, { responseType: 'text' });
   }

   updateBusProc1(busproc1: object):Observable<any> {
    debugger;
     return this.http.put<any>(`${this.baseUrl}/businessprocess1`,busproc1);
   }
   getfhnAppData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data-list`);
  }

  // get process data to Table
  getfhnProcessList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/process-list`);
  }
  updateFhnData(appdata: object):Observable<any> {
    debugger;
     return this.http.put<any>(`${this.baseUrl}/appData`,appdata);
   }

   // get latest version based on organization
   getVersion(orgName:string): Observable<any>{
    debugger
    return this.http.get<any>(`${this.baseUrl}/getlatversion/${orgName}`);
  }

  // get latest version based on organization and view type id
  getnewVersion(org_name:String,viewId:number): Observable<any>{
    debugger
    return this.http.get<any>(`${this.baseUrl}/getlatversionum/${org_name}/${viewId}`);
  }


// get infrastructure data to table
  getInfraData(orgId): Observable<any>{
    debugger
    return this.http.get<any>(`${this.baseUrl}/data-infra/${orgId}`);
  }


  // store the base line data of infrastructure with updated version number
  createInfraHistory(processData: object,versionId:number): Observable<object> {
    debugger;

    // console.log(process);
     return this.http.post<any>(`${this.baseUrl}/upinfradatahistory`,{processData,versionId});
   }


   getFHNProcessData(fhnProcessData:object):Observable<object> {
    debugger;
  return this.http.post<any>(`${this.baseUrl}/processData`,fhnProcessData

    );
  }

  // uploads File as Blob
  UploadFileasBlob(file:File,Uploaded_By:string ,Org_Id:number ,View_type:number ):Observable<HttpEvent<{}>> {
    debugger;
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('Uploaded_By',String(Uploaded_By));
    formdata.append('Org_Id',String(Org_Id));
    formdata.append('View_type',String(View_type));
    const req = new HttpRequest('POST', `${this.baseUrl}/uploadedFile`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
}
// gets latest FileUploaded Id
getLatestFileID(orgId: number,viewtype:number): Observable<any> {
  debugger;
  return this.http.get<any>(`${this.baseUrl}/getlatfileid/${orgId}/${viewtype}`);
}

// downloads Blog from Database
DownloadBlob(fileId:number):Observable<any>{
  debugger
  const headers = new HttpHeaders().set('Content-Type', 'text/csv; charset=utf-8');
    return this.http.get<String>(`${this.baseUrl}/downloadFiledb/${fileId}`,   { headers,responseType:'arrayBuffer' as 'json' } );
}

  // compare 2 records based on version number and give old value and new value
   comparever(orgId:any,id1:number,id2:number): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.baseUrl}/compareFileBasedOnVer/${orgId}/${id1}/${id2}`);
  }
  compareverapp(orgId:any,id1: number,id2:number): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.baseUrl}/compareFileBasedOnapp/${orgId}/${id1}/${id2}`);
  }


   createVersion(versionData: object): Observable<object> {
   debugger;
   console.log(versionData,'version dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    return this.http.post<any>(`${this.baseUrl}/createVersion`,versionData);
  }

  copyAppData(appCopyData: object): Observable<object> {
    debugger;
    console.log(appCopyData);
     return this.http.post<any>(`${this.baseUrl}/copyAppData`,appCopyData);
   }

  //  Upload CSV to  ProcessVersioning Table
   processVersionData(processData: object,versionId:number): Observable<object> {
    debugger;
    console.log(processData);
     return this.http.post<any>(`${this.baseUrl}/processhistoryData`,{processData,
    versionId}
      );
   }


   ApplicationVersionData(appData: object,versionId:number): Observable<object> {

     return this.http.post<any>(`${this.baseUrl}/appVersioningData`,{appData,
    versionId}
      );
   }

  InfraVersionData(infraData: object,versionId:number): Observable<object> {
    return this.http.post<any>(`${this.baseUrl}/infraversioningData`,{infraData,versionId});
  }

   compareverApplication(id1: number,id2:number): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.baseUrl}/compareFileBasedOnVerApplication/${id1}/${id2}`);
  }

   //posting all the application data from the csv into db
   postFHNUploadedData(fhnUploadData:object):Observable<object> {

    return this.http.post<any>(`${this.baseUrl}/appUpload`,fhnUploadData);
  }

  createApplication(appData:object):Observable<object> {

    return this.http.post<any>(`${this.baseUrl}/addapp`,appData);
  }

  createinfrarecord(appData:object):Observable<object> {

    return this.http.post<any>(`${this.baseUrl}/addinfrarecord`,appData);
  }

  // Inrastructure CSV File to backend
  pushFHNInfraData(fhnInfraData:object):Observable<object>{
    return this.http.post<any>(`${this.baseUrl}/upinfradata`,fhnInfraData);
  }

  SubmitAppQuestionerData(fhnInfraData:object):Observable<object>{
    return this.http.post<any>(`${this.baseUrl}/submitqueapp`,fhnInfraData);
  }

  // Questioner for infraa
  GetQuestioner(id:number,viewtype):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getque/${id}/${viewtype}`);
  }

  // Upload Infrastructure Questioner
  UploadQuestioner(model:object,viewtype:number):Observable<object>{
    debugger;
    return this.http.put<any>(`${this.baseUrl}/postque/${viewtype}`,model);
  }

  //Neo4jFilter
  GetFilter(viewtype):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getfilter/${viewtype}`);
  }

  //Neo4jFilterinfra dropdown-selected
  getfilterinfra(selectedvalue:String):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getfilterselectedinfra/${selectedvalue}`);
  }

  //Neo4jFilterapp dropdown-selected
  getfilterapp(selectedvalue:String):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getfilterselectedapp/${selectedvalue}`);
  }
  // //Neo4jFilterprocess dropdown-selected
  getfilterprocess(selectedvalue:String):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getfilterselectedprocess/${selectedvalue}`);
  }


  // //Neo4jFilter data passing
  getneo4jfilteroutput(filtervalue:String,selectedvalue:String):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/putfilterslected/${filtervalue}/${selectedvalue}`);
  }


  // delete  all data from table
  // DeleteinfraData(appId:String):Observable<any>{
  //   debugger;
  //   return this.http.delete<any>(`${this.baseUrl}/deleteinfradata/${appId}`);
  // }

  
  DeleteAppData(appId:String):Observable<any>{
    debugger;
    return this.http.delete<any>(`${this.baseUrl}/deleteappdata/${appId}`);
  }

  DeleteinfraData(infraId:String):Observable<any>{
    debugger;
    return this.http.delete<any>(`${this.baseUrl}/deleteinfrarecord/${infraId}`);
  }

  GetQuestionertoTable(orgid:number):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/csbquestioner/${orgid}`);
  }

  // Questioner data to UI
  PostQuestionertoTable(list:object):Observable<object>{
    return this.http.post<any>(`${this.baseUrl}/csbquestionerpost`,list);
  }

  // post app quest to table
  AppPostQuestionertoTable(list:object,orgId:any):Observable<object>{
    return this.http.post<any>(`${this.baseUrl}/appquestionerpost/${orgId}`,list);
  }

  // Questioner data to UI
  DeleteQuestionertoTable(orgid:number):Observable<object>{
    return this.http.delete<any>(`${this.baseUrl}/csbquestionerdelete/${orgid}`);
  }

   // Delete appplication questioner values
   ApplicationDeleteQuestionerTable(appid:number):Observable<object>{
    return this.http.delete<any>(`${this.baseUrl}/appquestionerdelete/${appid}`);
  }

  // create new application from  maintain page
  createAppplication(app:object):Observable<object>{
    return this.http.post<any>(`${this.baseUrl}/addappsystem`,app);
  }

  // Questioner data to UI App level
  GetQuestionertoTableAppLevel(orgid:number):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/csbquestionerapplevel/${orgid}`);
  }

  // get selected applevel values
  getselectedvalues(appid:number):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/csbquestionerapplevelselectedvalue/${appid}`);
  }
  getmigrationdata(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/migration-list/${orgId}`);
  }

  getmigrationdatacat(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/migration-datacat/${orgId}`);
  }
  getrlane(orgId:any,lobId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/rlane/${lobId}/${orgId}`);
  }
  
  getAppCat():Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/appcat`);
  }

  getAppCatmigration(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/migration-appcat/${orgId}`);
  } 


  getlobtoquestioner(id:number):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/lobtoQuestioner/${id}`);
  }

  getsublookup(name:string):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getsublookup/${name}`);
  }

//infra charts starts

  getOStochart(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getostochart/${orgId}`);
  }

  getPhysicaltochart(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getphysical/${orgId}`);
  }


 
    
  OSvsData(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/OSVsData/${orgId}`);
  }



//infra charts ends



//pdf charts starts
//1. Operating System version View by Data Center 
 datacentreview(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/OSVsData/${orgId}`);
  }


 	//2.	data center view bar graph 
  DatavsIP():Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getDataIp`);
  }
//3.environmentvsServerbyAPP
  EnvironmentvsServerbyAPP(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getenvironmentvsServerbyAPP/${orgId}`);
  }

  //4. EnvironmentvsServerbyDATA
  EnvironmentvsServerbyDATA(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getenvironmentvsServerbyDATA/${orgId}`);
  }

  //5.LoB
  LOBchart(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/LOBchart/${orgId}`);
  } 
  Orgname(emailId:any):Observable<object>{
    console.log(emailId,"mail id");
    
    return this.http.post<any>(`${this.baseUrl}/orgname`,emailId);
  } 


   
  sendMail(email:any):Observable<object>{
    return this.http.post<any>(`${this.baseUrl}/mail`,email);
  } 


//pdf charts ends



///infradata count

infradatacount(orgId:number):Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/applicationcount/${orgId}`);
  //ends
}

datacritical(orgId:any):Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/Datacriticality/${orgId}`);
  //ends
}

getlobcount(orgId:any):Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/getlobcount/${orgId}`);
  //ends
}
  getapppercent(orgId:number):Observable<object>{
    debugger
    return this.http.get<any>(`${this.baseUrl}/getapppercent/${orgId}`);
  }
  pushApplicationData(formData: any) {
    debugger;
 return this.http.post(`${this.baseUrl}/uploadAppData`, formData, {
  reportProgress: true,
  observe: 'events'
}).pipe(
  map(event => this.getEventMessage(event))
);
}

   
  getphysical():Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getphisical`);
  }


  getvendoranddate(orgId:any):Observable<object>{
    return this.http.get<any>(`${this.baseUrl}/getvendoranddate/${orgId}`);
  }


  getcamaster():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/caap-list`);
  }



 getrlaneList(): Observable<any> {
    debugger;
    return this.http.get<any>(`${this.baseUrl}/rlane-list`);
  }

 getovveride(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getoverride/${id}`)
  }


  updateinfra(caappmaster: object):Observable<any> {
    debugger;
     return this.http.put<any>(`${this.baseUrl}/updateInfra`,caappmaster);

 }



  updatecaappmaster(caappmaster: object):Observable<any> {
    debugger;
     return this.http.put<any>(`${this.baseUrl}/updatecaappmaster`,caappmaster);

 }
//stacked bar graph
 
Environmentcount(orgId:any):Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/Environmentcount/${orgId}`);
}
 Oscount():Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/OScount`);
}

//stacked bar graph ends
Applicationcriticalitygraph(orgId:any):Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/Applicationcriticality/${orgId}`);
}



//applicationgetApplicationSurveycount
ApplicationSurveycount(orgId):Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/getApplicationSurveycount/${orgId}`);
}
CAAppMaster(orgId:any):Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/CAAppMaster/${orgId}`);
}


ca_rlane_strategy_lookup():Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/getrlanestrategy`);
}



CAInfradata():Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/CAInfra`);
}


CAInframapping():Observable<object>{
  return this.http.get<any>(`${this.baseUrl}/CAInframapping`);
}




  private getEventMessage(event: HttpEvent<any>) {
    debugger;
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return event.body;
      default:
        return `Upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event: any) {
    
    debugger;
    const percentDone = Math.round(100 * (event.loaded / event.total));
    console.log(`File is ${percentDone}% uploaded.`);
    return { progress: percentDone, files: [] };
  }

   setter(org:Organization){
    this.org=org;
   }

   getter(){
     return this.org;
   }
  } 

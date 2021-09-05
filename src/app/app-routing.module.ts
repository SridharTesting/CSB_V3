import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigurationComponent} from './configuration/configuration.component'
import {AppSurveyComponent} from './app-survey/app-survey.component';
import {CARAssessmenttComponent} from './carassessmentt/carassessmentt.component'
import {AssessmentComponent} from './assessment/assessment.component';
import {DiscoveryComponent} from './discovery/discovery.component';
import {ReportsComponent} from './reports/reports.component'
import {LoginComponent} from './login/login.component';
import {RootNavComponent} from './root-nav/root-nav.component';
import {OrgComponent} from './org/org.component';
import {AddUserComponent} from './Usersetup/add-user/add-user.component'
import { ListLobComponent } from './LOB/list-lob/list-lob.component';
import {EditUserComponent} from './Usersetup/edit-user/edit-user.component';

import { AddLobComponent } from './LOB/add-lob/add-lob.component';
import { EditLobComponent } from './LOB/edit-lob/edit-lob.component';
import {ListUserComponent} from './Usersetup/list-user/list-user.component';
import {AddOrgComponent} from './Org_setup/add-org/add-org.component';
import {EditOrgComponent} from './Org_setup/edit-org/edit-org.component';
import {ListOrgComponent} from './Org_setup/list-org/list-org.component';
import {APRComponent} from './apr/apr.component';
import {CloudComponent} from './Cloud/cloud/cloud.component'
import { StaticImgaesComponent } from './static-imgaes/static-imgaes.component';
import { StaticImgaesENVComponent } from './static-imgaes-env/static-imgaes-env.component';
import { AppSurveyMainPageComponent } from './AppSurvey/app-survey-main-page/app-survey-main-page.component';
import { LobToAppMappingComponent } from './AppSurvey/lob-to-app-mapping/lob-to-app-mapping.component';
import { UploadAppDataComponent } from './AppSurvey/upload-app-data/upload-app-data.component';
import { ListBusProc1Component } from './business_process1/list-busproc1/list-busproc1.component';
import { AddBusProc1Component } from './business_process1/add-busproc1/add-busproc1.component';
import { EditBusProc1Component } from './business_process1/edit-busproc1/edit-busproc1.component';
import {DatacvComponent} from './Cloud_reports/Datacenter_view/datacv/datacv.component';
import {CsvComponent} from './Cloud_reports/cloudstratergy_view/csv/csv.component';
import {DsvComponent} from './Cloud_reports/database_server_view/dsv/dsv.component';
import {OsvComponent} from './Cloud_reports/operating_system_view/osv/osv.component';
import {AbeComponent} from './Cloud_reports/application_by_environment/abe/abe.component';
import {LandingPageComponent} from './landingPage/landingPage.component';
import {SetupComponent} from './setup/setup.component';
 import {DevelopmentComponent} from './development/development.component';
 import {ExportExcelComponent} from './export-excel/export-excel.component';
 import {AprHeaderComponent} from './apr-header/apr-header.component';
 import {CloudAssistComponent} from './cloud-assist/cloud-assist.component';
 import { DashboardComponent } from './dashboard/dashboard.component';
 import { AdminComponent } from './admin/admin.component';
import { CaptureInformationComponent } from './admin/capture-information/capture-information.component';
import { UploadFilesCloudComponent } from './admin/capture-information/upload-files-cloud/upload-files-cloud.component';
import { SubmitCloudComponent } from './admin/capture-information/submit-cloud/submit-cloud.component';
import { UploadFilesAprComponent } from './admin/capture-information/upload-files-apr/upload-files-apr.component';
import { SubmitFilesAprComponent } from './admin/capture-information/submit-files-apr/submit-files-apr.component';
import { MaintainComponent } from './maintain/maintain.component';
import { DashAprComponent } from './dashboard/dash-apr/dash-apr.component';
import { CompareAPRComponent } from './Compare-files-apr/compare-apr.component';
import { CSBComponent } from './csb/csb.component';
import{TestComponent} from'./test/test.component'
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component'
import { CsbNewComponentComponent } from './csb-new.component/csb-new.component.component'
import { ApplicationQuestionerComponent } from './application-questioner/application-questioner.component';
import {LoginNewComponent} from './login-new/login-new.component';
import {LandingNewComponent} from './landing-new/landing-new.component';
import { from } from 'rxjs';

import { InfraDiscoveryComponent } from './infra-discovery/infra-discovery.component';
import { UploadFilesNewScreenComponent } from './admin/capture-information/upload-files-new-screen/upload-files-new-screen.component';
import { ApplicationDiscoveryComponent } from './application-discovery/application-discovery.component';
import { CsbDashboardComponent } from './csb-dashboard/csb-dashboard.component';
import { OverrideRlaneComponent } from './override-rlane/override-rlane.component';
import { DiscoveryToolConfigComponent } from './dialog-reports/discovery-tool-config/discovery-tool-config.component';
import { DialogReportsComponent } from './dialog-reports/dialog-reports.component';
import { DashboardPopupComponent } from './dialog-reports/dashboard-popup/dashboard-popup.component';
import { AprDashboardComponent } from './apr-dashboard/apr-dashboard.component';
import { HeaderAprComponent } from './header-apr/header-apr.component';
import { MaintainAprComponent } from './maintain-apr/maintain-apr.component';
import { CompareScreenComponent } from './compare-screen/compare-screen.component';
import { UploadFilesNewComponent } from './upload-files-new/upload-files-new.component';
import { UserCSBDashboardComponent } from './user-csb-dashboard/user-csb-dashboard.component';
import { AdminGuardGuard } from './service/admin-guard.guard';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { MoveGroupComponent } from './move-group/move-group.component';

const routes: Routes = [






  {


    path:'homePage',component:RootNavComponent,
     children: [

      {
        path:'orgSetUp', component:ListOrgComponent ,
        children: [
          { path: 'addorg' ,component: AddOrgComponent},
          { path: 'editorg', component: EditOrgComponent },
          { path: 'editorg/:id', component: EditOrgComponent }

        ] },
        { path: 'loBsetup', component: ListLobComponent, children: [
          { path: 'addlob', component: AddLobComponent },
          { path: 'editLOB', component: EditLobComponent },
          { path: 'editLOB/:id', component: EditLobComponent }

        ] },
        {path:'busproc1SetUp', component:ListBusProc1Component ,
        children: [
          { path: 'addbusproc1' ,component: AddBusProc1Component},
          { path: 'editBusProc1', component: EditBusProc1Component},
          { path: 'editBusProc1/:id', component: EditBusProc1Component}

        ] },

      { path: 'apr', component: APRComponent },
      { path: 'cloud', component: CloudComponent },
      {path: 'datacenterview', component:DatacvComponent},
  {path:'operatingsystemview',component:OsvComponent},
      {path:'databaseserverview',component:DsvComponent},
      {path:'Applicationbyenvironment',component:AbeComponent},
      {path:'cloudstrtergyview',component:CsvComponent},
      {path:'aprcloud',component:AprHeaderComponent},
      {path:'cloudassist',component:CloudAssistComponent},



      {path:"reports",component:ReportsComponent},
      {
        path:"appSurvey",component:AppSurveyMainPageComponent },

        { path: 'lobtoappmapping', component: LobToAppMappingComponent },

        {path:'uploadappdata',component:UploadAppDataComponent},
        {
          path:'setup',component:SetupComponent},
          {path:'development',component:DevelopmentComponent},
          {path:'export',component:ExportExcelComponent},

      {
        path:"discovery",
        component:DiscoveryComponent
      },


      
     
      {
        path:"test",
        component:TestComponent
      },
      
     
      {
        path:"carAssessment",
        component:CARAssessmenttComponent
      },
      {
        path:"assessment",
        component:AssessmentComponent
      },
      {
        path:"businesscapabilities",
        component:StaticImgaesComponent
      },
      {
        path:"dashnew",
        component:DashboardNewComponent 
      },
      {
        path:"applicationbyhost",
        component:StaticImgaesENVComponent
      },
      {
        path:"dash",
        component:DashboardComponent,
      },
      {
        path:"uploadcloud",
        component:UploadFilesCloudComponent
      },
      {
        path:"dashapr",
        component:DashAprComponent
      },
      {
        path:"submitcloud",
        component:SubmitCloudComponent
      },
     
      {
        path:"submitapr",
        component:SubmitFilesAprComponent
      },
  
      {
      path:"admin",
        component:AdminComponent,
        // children:[
        //   { path: 'capture', component: CaptureInformationComponent }
        // ]
      },
     
     
     
      {
        path:"capture",
        component:CaptureInformationComponent
      },
   
    ] },
    {
      path:'landing',component:LandingNewComponent,canActivate:[AdminGuardGuard]
    },
  
  
    {
      path:"fileupload",
      component:UploadFilesNewScreenComponent
    },
    {
      path:"CsbDashboard",
      component: CsbDashboardComponent 
    },
    {
      path:"appdiscovery",
      component:ApplicationDiscoveryComponent
    },
    {
      path:"override",
      component:OverrideRlaneComponent
    },
    {
      path:"csb",
      component:CSBComponent
    },
    {
      path:"appque",
      component:ApplicationQuestionerComponent
    },
    {
      path:"discoveryconfig",
      component:DiscoveryToolConfigComponent
    },
    {
      path:"csb_report",
      component:CsbNewComponentComponent
    },
    
    {
      path:"infra",
      component:InfraDiscoveryComponent
    },
  
    {
      path:"AprDashboard",
      component: AprDashboardComponent 
    },

    {
      path:"maintainapr",
      component: MaintainAprComponent 
    },
    {
      path:"maintain",
      component:MaintainComponent
    },
    {
      path:"aprDataComparsion",
      component:CompareAPRComponent
    },
    {
      path:"datacomparsion",
      component:CompareScreenComponent
    },
    {
      path:"uploadfilesnew",
      component:UploadFilesNewComponent
    },
    {
      path:"userdashboard",
      component:UserCSBDashboardComponent
    },

    {
      path:"userSetup",component:ListUserComponent, children: [
        { path: 'adduser', component: AddUserComponent },
        { path: 'edituser', component: EditUserComponent },
        { path: 'edituser/:id', component: EditUserComponent }

      ] },
 
  {
    path:'',
    component:LoginNewComponent
  },
  

  {
    path: '**',
    redirectTo: 'orgsetup',
    pathMatch: 'full'
  },

  {
    path:"userRegistration",
    component:UserRegistrationComponent
  },

  {
    path:"updateUser/:id",
    component:UpdateUserComponent
  },

  {
    path:"moveGroup",
    component:MoveGroupComponent
  }
];





@NgModule({
  imports: [RouterModule.forRoot(routes,{
onSameUrlNavigation: 'reload',useHash: true}
)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CARAssessmenttComponent } from './carassessmentt/carassessmentt.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { AppSurveyComponent } from './app-survey/app-survey.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ReportsComponent } from './reports/reports.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { AngularMaterialModule } from './angular-material.module';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWThttpInterceptorService } from './service/jwthttp-interceptor.service';
import { HTTPService } from './service/httpService.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrgComponent } from './org/org.component';

import { NgxPaginationModule } from 'ngx-pagination';

import { ListLobComponent } from './LOB/list-lob/list-lob.component';
import { AddLobComponent } from './LOB/add-lob/add-lob.component';

import { EditLobComponent } from './LOB/edit-lob/edit-lob.component';
import { HeaderComponent } from './header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListUserComponent } from './Usersetup/list-user/list-user.component';
import { AddUserComponent } from './Usersetup/add-user/add-user.component';
import { EditUserComponent } from './Usersetup/edit-user/edit-user.component';
import { AddOrgComponent } from './Org_setup/add-org/add-org.component';
import { EditOrgComponent } from './Org_setup/edit-org/edit-org.component';
import { ListOrgComponent } from './Org_setup/list-org/list-org.component';
import { APRComponent } from './apr/apr.component';
import { CloudComponent } from './Cloud/cloud/cloud.component';
import { StaticImgaesComponent } from './static-imgaes/static-imgaes.component';
import { StaticImgaesENVComponent } from './static-imgaes-env/static-imgaes-env.component';
import { AppSurveyMainPageComponent } from './AppSurvey/app-survey-main-page/app-survey-main-page.component';
import { LobToAppMappingComponent } from './AppSurvey/lob-to-app-mapping/lob-to-app-mapping.component';
import { UniqueValuesPipe } from './pipes/unique-values.pipe';
import { DropdownLOBPipe } from './pipes/dropdown-lob.pipe';
import { AppToLobMappingComponent } from './AppSurvey/app-to-lob-mapping/app-to-lob-mapping.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UploadAppDataComponent } from './AppSurvey/upload-app-data/upload-app-data.component';
import { FileUploadComponent } from './AppSurvey/file-upload/file-upload.component';

import { AddBusProc1Component } from './business_process1/add-busproc1/add-busproc1.component';
import { EditBusProc1Component } from './business_process1/edit-busproc1/edit-busproc1.component';
import { ListBusProc1Component } from './business_process1/list-busproc1/list-busproc1.component';
import { DropdownBusProc1Pipe } from './pipes/dropdown-busproc1.pipe';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DatacvComponent } from './Cloud_reports/Datacenter_view/datacv/datacv.component';
import { OsvComponent } from './Cloud_reports/operating_system_view/osv/osv.component';
import { DsvComponent } from './Cloud_reports/database_server_view/dsv/dsv.component';
import { AbeComponent } from './Cloud_reports/application_by_environment/abe/abe.component';
import { CsvComponent } from './Cloud_reports/cloudstratergy_view/csv/csv.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { InfraAppUploadComponent } from './infra-app-upload/infra-app-upload.component';
import { SetupComponent } from './setup/setup.component';

import { ExportExcelComponent } from './export-excel/export-excel.component';
import { AprHeaderComponent } from './apr-header/apr-header.component';
import { CloudAssistComponent } from './cloud-assist/cloud-assist.component';
import { DevelopmentComponent } from './development/development.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CaptureInformationComponent } from './admin/capture-information/capture-information.component';
import { MenuHeadersComponent } from './menu-headers/menu-headers.component';
import { UploadFilesCloudComponent } from './admin/capture-information/upload-files-cloud/upload-files-cloud.component';
import { SubmitCloudComponent } from './admin/capture-information/submit-cloud/submit-cloud.component';
import { UploadFilesAprComponent } from './admin/capture-information/upload-files-apr/upload-files-apr.component';
import { SubmitFilesAprComponent } from './admin/capture-information/submit-files-apr/submit-files-apr.component';
import { MaintainComponent } from './maintain/maintain.component';
import { FooterComponent } from './footer/footer.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { NewScreenOrgDropdownComponent } from './LOB/new-screen-org-dropdown/new-screen-org-dropdown.component';
import { DashAprComponent } from './dashboard/dash-apr/dash-apr.component';
import { DialogComponent } from './dialog/dialog.component';
import { CompareAPRComponent } from './Compare-files-apr/compare-apr.component';
import { FHNProcessDataComponent } from './fhn-process-data/fhn-process-data.component';
import { ValuePipe } from './pipes/value.pipe';
import { SpinnerComponent } from './core-commonComponents/spinner/spinner.component';
import { ExcelService } from './service/excel-service.service';
import { DownloadPopupComponent } from './download-popup/download-popup.component';

import { UploadFilesNewComponent } from './upload-files-new/upload-files-new.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
// import{ConfirmationDialogComponent} from './service/confirmation-dialog-component.service'
import { ConfirmationDialogbox } from './service/confirmation-dialogbox/confirmation-dialogbox.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { CSBComponent } from './csb/csb.component';
import { TestComponent } from './test/test.component';
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component';
import { CsbNewComponentComponent } from './csb-new.component/csb-new.component.component';
import { ApplicationQuestionerComponent } from './application-questioner/application-questioner.component';
import { LoginNewComponent } from './login-new/login-new.component';
import { LandingNewComponent } from './landing-new/landing-new.component';
import { ApplicationPopupComponent } from './application-popup/application-popup.component';


import { NgCircleProgressModule } from 'ng-circle-progress';
import { UploadfilesnewscreenComponent } from './admin/capture-information/uploadfilesnewscreen/uploadfilesnewscreen.component';
import { UploadFilesNewScreenComponent } from './admin/capture-information/upload-files-new-screen/upload-files-new-screen.component';
import { InfraDiscoveryComponent } from './infra-discovery/infra-discovery.component';
import { FileUploadPopUpComponent } from './file-upload-pop-up/file-upload-pop-up.component';
import { ApplicationDiscoveryComponent } from './application-discovery/application-discovery.component';
import { CsbDashboardComponent } from './csb-dashboard/csb-dashboard.component';
import { DashboardPopupComponent } from './dialog-reports/dashboard-popup/dashboard-popup.component';
import { RlanereportPopupComponent } from './rlanereport-popup/rlanereport-popup.component';
import { OverrideRlaneComponent } from './override-rlane/override-rlane.component';
import { DiscoveryToolConfigComponent } from './dialog-reports/discovery-tool-config/discovery-tool-config.component';
import { DialogReportsComponent } from './dialog-reports/dialog-reports.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogboxComponent } from './dialogbox/dialogbox.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ChartPopupComponent } from './chart-popup/chart-popup.component';
import { InfraPopupComponent } from './infra-popup/infra-popup.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { AprDashboardComponent } from './apr-dashboard/apr-dashboard.component';
import { HeaderAprComponent } from './header-apr/header-apr.component';
import { MaintainAprComponent } from './maintain-apr/maintain-apr.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { CreateapplicationComponent } from './createapplication/createapplication.component';
import { DeleteapplicationPopupComponent } from './deleteapplication-popup/deleteapplication-popup.component';
import { CompareScreenComponent } from './compare-screen/compare-screen.component';
import { from } from 'rxjs';
import { UserCSBDashboardComponent } from './user-csb-dashboard/user-csb-dashboard.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { DelegateUserComponent } from './delegate-user/delegate-user.component';
import { MoveGroupComponent } from './move-group/move-group.component';
import { CreateMovegroupComponent } from './create-movegroup/create-movegroup.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    RootNavComponent,
    ConfirmationDialogbox,

    ConfigurationComponent,
    DevelopmentComponent,
    CARAssessmenttComponent,

    DiscoveryComponent,

    AppSurveyComponent,

    AssessmentComponent,

    ReportsComponent,

    // ConfirmationDialogComponent,
    TestComponent,

    OrgComponent,

    ListLobComponent,

    AddLobComponent,

    EditLobComponent,

    HeaderComponent,

    ListUserComponent,

    AddUserComponent,

    EditUserComponent,

    AddOrgComponent,

    EditOrgComponent,

    ListOrgComponent,

    APRComponent,

    CloudComponent,

    StaticImgaesComponent,

    StaticImgaesENVComponent,

    AppSurveyMainPageComponent,

    LobToAppMappingComponent,

    UniqueValuesPipe,

    DropdownLOBPipe,

    AppToLobMappingComponent,

    UploadAppDataComponent,

    FileUploadComponent,

    AddBusProc1Component,

    EditBusProc1Component,

    ListBusProc1Component,

    DropdownBusProc1Pipe,

    DatacvComponent,

    OsvComponent,

    DsvComponent,

    AbeComponent,

    CsvComponent,
    DropdownBusProc1Pipe,
    InfraAppUploadComponent,
    SetupComponent,

    ExportExcelComponent,

    AprHeaderComponent,

    CloudAssistComponent,

    AdminComponent,

    DashboardComponent,

    CaptureInformationComponent,

    MenuHeadersComponent,

    UploadFilesCloudComponent,

    SubmitCloudComponent,

    UploadFilesAprComponent,

    SubmitFilesAprComponent,

    MaintainComponent,

    FooterComponent,

    NewScreenOrgDropdownComponent,

    DashAprComponent,

    DialogComponent,

    CompareAPRComponent,

    FHNProcessDataComponent,

    ValuePipe,

    SpinnerComponent,

    DownloadPopupComponent,

    MatConfirmDialogComponent,

    CSBComponent,
    TestComponent,
    DashboardNewComponent,
    CsbNewComponentComponent,
    ApplicationQuestionerComponent,
    LoginNewComponent,
    LandingNewComponent,
    ApplicationPopupComponent,

    UploadfilesnewscreenComponent,
    UploadFilesNewScreenComponent,
    InfraDiscoveryComponent,
    FileUploadPopUpComponent,
    ApplicationDiscoveryComponent,
    CsbDashboardComponent,
    DashboardPopupComponent,
    RlanereportPopupComponent,
    OverrideRlaneComponent,
    DiscoveryToolConfigComponent,
    DialogReportsComponent,
    DialogboxComponent,
    ChartPopupComponent,
    InfraPopupComponent,
    SearchFilterPipe,
    AprDashboardComponent,
    HeaderAprComponent,
    MaintainAprComponent,
    CreateapplicationComponent,
    DeleteapplicationPopupComponent,
    CompareScreenComponent,
    UploadFilesNewComponent,
    UserCSBDashboardComponent,
    UserRegistrationComponent,
    UpdateUserComponent,
    HeaderAdminComponent,
    DelegateUserComponent,
    MoveGroupComponent,
    CreateMovegroupComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MDBBootstrapModule.forRoot(),

    MatTooltipModule,
    NgxSpinnerModule,
    MatCardModule,
    NgxPaginationModule,
    NgMaterialMultilevelMenuModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GridModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxDropzoneModule,
    MatDialogModule,
    AccordionModule,
   

    NgCircleProgressModule.forRoot({}),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWThttpInterceptorService,
      multi: true,
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    HTTPService,
    MatSnackBar,
    ExcelService,
  ],
  bootstrap: [AppComponent],

  entryComponents: [
    LoginComponent,
    DialogComponent,
    DownloadPopupComponent,
    ConfirmationDialogbox,
    DevelopmentComponent,
    MatConfirmDialogComponent,
    ApplicationPopupComponent,
    FileUploadPopUpComponent,
    DashboardPopupComponent,
    RlanereportPopupComponent,
    DialogReportsComponent,
    DialogboxComponent,
    ChartPopupComponent,
    InfraPopupComponent,
    CreateapplicationComponent,
    DeleteapplicationPopupComponent,
    DelegateUserComponent,
    CreateMovegroupComponent

  ],
  //entryComponents:[LoginComponent,DialogComponent,DownloadPopupComponent,ConfirmationDialogbox,DevelopmentComponent, MatConfirmDialogComponent,ApplicationPopupComponent,]
})
export class AppModule {}

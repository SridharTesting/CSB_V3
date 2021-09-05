import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSurveyMainPageComponent } from './app-survey-main-page.component';

describe('AppSurveyMainPageComponent', () => {
  let component: AppSurveyMainPageComponent;
  let fixture: ComponentFixture<AppSurveyMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSurveyMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSurveyMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

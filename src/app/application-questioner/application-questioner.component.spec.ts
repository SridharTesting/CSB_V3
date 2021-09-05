import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationQuestionerComponent } from './application-questioner.component';

describe('ApplicationQuestionerComponent', () => {
  let component: ApplicationQuestionerComponent;
  let fixture: ComponentFixture<ApplicationQuestionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationQuestionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationQuestionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPopupComponent } from './application-popup.component';

describe('ApplicationPopupComponent', () => {
  let component: ApplicationPopupComponent;
  let fixture: ComponentFixture<ApplicationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

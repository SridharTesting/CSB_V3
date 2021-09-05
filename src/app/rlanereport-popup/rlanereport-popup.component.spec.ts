import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RlanereportPopupComponent } from './rlanereport-popup.component';

describe('RlanereportPopupComponent', () => {
  let component: RlanereportPopupComponent;
  let fixture: ComponentFixture<RlanereportPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RlanereportPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RlanereportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

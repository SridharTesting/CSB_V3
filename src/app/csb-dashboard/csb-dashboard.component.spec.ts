import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsbDashboardComponent } from './csb-dashboard.component';

describe('CsbDashboardComponent', () => {
  let component: CsbDashboardComponent;
  let fixture: ComponentFixture<CsbDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsbDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsbDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

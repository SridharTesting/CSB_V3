import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCSBDashboardComponent } from './user-csb-dashboard.component';

describe('UserCSBDashboardComponent', () => {
  let component: UserCSBDashboardComponent;
  let fixture: ComponentFixture<UserCSBDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCSBDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCSBDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

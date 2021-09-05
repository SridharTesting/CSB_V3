import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprDashboardComponent } from './apr-dashboard.component';

describe('AprDashboardComponent', () => {
  let component: AprDashboardComponent;
  let fixture: ComponentFixture<AprDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

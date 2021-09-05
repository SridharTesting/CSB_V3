import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAprComponent } from './dash-apr.component';

describe('DashAprComponent', () => {
  let component: DashAprComponent;
  let fixture: ComponentFixture<DashAprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashAprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

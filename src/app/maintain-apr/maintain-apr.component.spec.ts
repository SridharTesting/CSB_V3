import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainAprComponent } from './maintain-apr.component';

describe('MaintainAprComponent', () => {
  let component: MaintainAprComponent;
  let fixture: ComponentFixture<MaintainAprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainAprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainAprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCloudComponent } from './submit-cloud.component';

describe('SubmitCloudComponent', () => {
  let component: SubmitCloudComponent;
  let fixture: ComponentFixture<SubmitCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

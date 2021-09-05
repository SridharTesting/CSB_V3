import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureInformationComponent } from './capture-information.component';

describe('CaptureInformationComponent', () => {
  let component: CaptureInformationComponent;
  let fixture: ComponentFixture<CaptureInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFilesAprComponent } from './submit-files-apr.component';

describe('SubmitFilesAprComponent', () => {
  let component: SubmitFilesAprComponent;
  let fixture: ComponentFixture<SubmitFilesAprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitFilesAprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitFilesAprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

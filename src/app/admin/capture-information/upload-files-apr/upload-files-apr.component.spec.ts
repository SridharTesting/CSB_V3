import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesAprComponent } from './upload-files-apr.component';

describe('UploadFilesAprComponent', () => {
  let component: UploadFilesAprComponent;
  let fixture: ComponentFixture<UploadFilesAprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilesAprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesAprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

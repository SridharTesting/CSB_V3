import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesCloudComponent } from './upload-files-cloud.component';

describe('UploadFilesCloudComponent', () => {
  let component: UploadFilesCloudComponent;
  let fixture: ComponentFixture<UploadFilesCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilesCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

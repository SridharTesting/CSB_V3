import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesNewComponent } from './upload-files-new.component';

describe('UploadFilesNewComponent', () => {
  let component: UploadFilesNewComponent;
  let fixture: ComponentFixture<UploadFilesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

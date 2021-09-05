import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadPopUpComponent } from './file-upload-pop-up.component';

describe('FileUploadPopUpComponent', () => {
  let component: FileUploadPopUpComponent;
  let fixture: ComponentFixture<FileUploadPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

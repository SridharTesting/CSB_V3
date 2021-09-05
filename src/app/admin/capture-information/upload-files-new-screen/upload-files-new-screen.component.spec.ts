import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesNewScreenComponent } from './upload-files-new-screen.component';

describe('UploadFilesNewScreenComponent', () => {
  let component: UploadFilesNewScreenComponent;
  let fixture: ComponentFixture<UploadFilesNewScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilesNewScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesNewScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

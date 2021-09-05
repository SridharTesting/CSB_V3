import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAppDataComponent } from './upload-app-data.component';

describe('UploadAppDataComponent', () => {
  let component: UploadAppDataComponent;
  let fixture: ComponentFixture<UploadAppDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAppDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAppDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

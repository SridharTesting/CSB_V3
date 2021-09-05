import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraAppUploadComponent } from './infra-app-upload.component';

describe('InfraAppUploadComponent', () => {
  let component: InfraAppUploadComponent;
  let fixture: ComponentFixture<InfraAppUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraAppUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraAppUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfilesnewscreenComponent } from './uploadfilesnewscreen.component';

describe('UploadfilesnewscreenComponent', () => {
  let component: UploadfilesnewscreenComponent;
  let fixture: ComponentFixture<UploadfilesnewscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadfilesnewscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfilesnewscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

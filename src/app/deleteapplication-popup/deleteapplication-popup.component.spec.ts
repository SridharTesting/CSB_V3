import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteapplicationPopupComponent } from './deleteapplication-popup.component';

describe('DeleteapplicationPopupComponent', () => {
  let component: DeleteapplicationPopupComponent;
  let fixture: ComponentFixture<DeleteapplicationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteapplicationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteapplicationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

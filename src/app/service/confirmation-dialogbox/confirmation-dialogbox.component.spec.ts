import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogboxComponent } from './confirmation-dialogbox.component';

describe('ConfirmationDialogboxComponent', () => {
  let component: ConfirmationDialogboxComponent;
  let fixture: ComponentFixture<ConfirmationDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

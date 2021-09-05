import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReportsComponent } from './dialog-reports.component';

describe('DialogReportsComponent', () => {
  let component: DialogReportsComponent;
  let fixture: ComponentFixture<DialogReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

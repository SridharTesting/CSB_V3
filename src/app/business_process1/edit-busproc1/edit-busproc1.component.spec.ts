import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusproc1Component } from './edit-busproc1.component';

describe('EditBusproc1Component', () => {
  let component: EditBusproc1Component;
  let fixture: ComponentFixture<EditBusproc1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBusproc1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusproc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

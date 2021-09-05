import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusproc1Component } from './add-busproc1.component';

describe('AddBusproc1Component', () => {
  let component: AddBusproc1Component;
  let fixture: ComponentFixture<AddBusproc1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBusproc1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusproc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

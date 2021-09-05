import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusproc1Component } from './list-busproc1.component';

describe('ListBusproc1Component', () => {
  let component: ListBusproc1Component;
  let fixture: ComponentFixture<ListBusproc1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBusproc1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusproc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

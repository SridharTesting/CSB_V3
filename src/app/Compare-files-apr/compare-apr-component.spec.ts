import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CompareAPRComponent } from './compare-apr.component';

describe('TestGitComponent', () => {
  let component: CompareAPRComponent;
  let fixture: ComponentFixture<CompareAPRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareAPRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareAPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

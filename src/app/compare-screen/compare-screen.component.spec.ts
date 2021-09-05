import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareScreenComponent } from './compare-screen.component';

describe('CompareScreenComponent', () => {
  let component: CompareScreenComponent;
  let fixture: ComponentFixture<CompareScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

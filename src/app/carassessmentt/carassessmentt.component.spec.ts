import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CARAssessmenttComponent } from './carassessmentt.component';

describe('CARAssessmenttComponent', () => {
  let component: CARAssessmenttComponent;
  let fixture: ComponentFixture<CARAssessmenttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CARAssessmenttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CARAssessmenttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

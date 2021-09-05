import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNewComponent } from './landing-new.component';

describe('LandingNewComponent', () => {
  let component: LandingNewComponent;
  let fixture: ComponentFixture<LandingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

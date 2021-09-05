import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverrideRlaneComponent } from './override-rlane.component';

describe('OverrideRlaneComponent', () => {
  let component: OverrideRlaneComponent;
  let fixture: ComponentFixture<OverrideRlaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverrideRlaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverrideRlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

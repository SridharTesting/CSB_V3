import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsbNew.ComponentComponent } from './csb-new.component.component';

describe('CsbNew.ComponentComponent', () => {
  let component: CsbNew.ComponentComponent;
  let fixture: ComponentFixture<CsbNew.ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsbNew.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsbNew.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

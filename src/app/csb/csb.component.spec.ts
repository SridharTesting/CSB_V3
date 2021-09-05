import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsbComponent } from './csb.component';

describe('CsbComponent', () => {
  let component: CsbComponent;
  let fixture: ComponentFixture<CsbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

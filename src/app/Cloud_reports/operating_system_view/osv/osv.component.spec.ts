import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsvComponent } from './osv.component';

describe('OsvComponent', () => {
  let component: OsvComponent;
  let fixture: ComponentFixture<OsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsvComponent } from './dsv.component';

describe('DsvComponent', () => {
  let component: DsvComponent;
  let fixture: ComponentFixture<DsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

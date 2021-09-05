import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbeComponent } from './abe.component';

describe('AbeComponent', () => {
  let component: AbeComponent;
  let fixture: ComponentFixture<AbeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

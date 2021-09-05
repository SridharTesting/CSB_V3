import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FHNProcessDataComponent } from './fhn-process-data.component';

describe('FHNProcessDataComponent', () => {
  let component: FHNProcessDataComponent;
  let fixture: ComponentFixture<FHNProcessDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FHNProcessDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FHNProcessDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

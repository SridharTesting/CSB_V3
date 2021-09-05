import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacvComponent } from './datacv.component';

describe('DatacvComponent', () => {
  let component: DatacvComponent;
  let fixture: ComponentFixture<DatacvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

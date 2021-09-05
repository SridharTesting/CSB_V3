import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprHeaderComponent } from './apr-header.component';

describe('AprHeaderComponent', () => {
  let component: AprHeaderComponent;
  let fixture: ComponentFixture<AprHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

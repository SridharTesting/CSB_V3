import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovegroupComponent } from './create-movegroup.component';

describe('CreateMovegroupComponent', () => {
  let component: CreateMovegroupComponent;
  let fixture: ComponentFixture<CreateMovegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMovegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMovegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

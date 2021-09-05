import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateUserComponent } from './delegate-user.component';

describe('DelegateUserComponent', () => {
  let component: DelegateUserComponent;
  let fixture: ComponentFixture<DelegateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

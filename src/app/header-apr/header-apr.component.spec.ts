import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAprComponent } from './header-apr.component';

describe('HeaderAprComponent', () => {
  let component: HeaderAprComponent;
  let fixture: ComponentFixture<HeaderAprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

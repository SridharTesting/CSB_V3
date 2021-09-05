import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticImgaesENVComponent } from './static-imgaes-env.component';

describe('StaticImgaesENVComponent', () => {
  let component: StaticImgaesENVComponent;
  let fixture: ComponentFixture<StaticImgaesENVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticImgaesENVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticImgaesENVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

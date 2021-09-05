import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticImgaesComponent } from './static-imgaes.component';

describe('StaticImgaesComponent', () => {
  let component: StaticImgaesComponent;
  let fixture: ComponentFixture<StaticImgaesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticImgaesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticImgaesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

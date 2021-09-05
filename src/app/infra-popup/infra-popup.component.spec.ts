import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraPopupComponent } from './infra-popup.component';

describe('InfraPopupComponent', () => {
  let component: InfraPopupComponent;
  let fixture: ComponentFixture<InfraPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

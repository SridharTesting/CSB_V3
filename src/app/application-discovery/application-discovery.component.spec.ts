import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDiscoveryComponent } from './application-discovery.component';

describe('ApplicationDiscoveryComponent', () => {
  let component: ApplicationDiscoveryComponent;
  let fixture: ComponentFixture<ApplicationDiscoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDiscoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraDiscoveryComponent } from './infra-discovery.component';

describe('InfraDiscoveryComponent', () => {
  let component: InfraDiscoveryComponent;
  let fixture: ComponentFixture<InfraDiscoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraDiscoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

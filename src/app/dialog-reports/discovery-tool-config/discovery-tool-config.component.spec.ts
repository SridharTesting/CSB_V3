import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryToolConfigComponent } from './discovery-tool-config.component';

describe('DiscoveryToolConfigComponent', () => {
  let component: DiscoveryToolConfigComponent;
  let fixture: ComponentFixture<DiscoveryToolConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoveryToolConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryToolConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

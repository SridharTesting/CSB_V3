import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobToAppMappingComponent } from './lob-to-app-mapping.component';

describe('LobToAppMappingComponent', () => {
  let component: LobToAppMappingComponent;
  let fixture: ComponentFixture<LobToAppMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobToAppMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobToAppMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

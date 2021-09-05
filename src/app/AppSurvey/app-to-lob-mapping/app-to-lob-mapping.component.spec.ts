import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToLobMappingComponent } from './app-to-lob-mapping.component';

describe('AppToLobMappingComponent', () => {
  let component: AppToLobMappingComponent;
  let fixture: ComponentFixture<AppToLobMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppToLobMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppToLobMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

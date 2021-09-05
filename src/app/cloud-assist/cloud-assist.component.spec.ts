import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudAssistComponent } from './cloud-assist.component';

describe('CloudAssistComponent', () => {
  let component: CloudAssistComponent;
  let fixture: ComponentFixture<CloudAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudAssistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScreenOrgDropdownComponent } from './new-screen-org-dropdown.component';

describe('NewScreenOrgDropdownComponent', () => {
  let component: NewScreenOrgDropdownComponent;
  let fixture: ComponentFixture<NewScreenOrgDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScreenOrgDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScreenOrgDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLobComponent } from './list-lob.component';

describe('ListLobComponent', () => {
  let component: ListLobComponent;
  let fixture: ComponentFixture<ListLobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFriendsComponent } from './request-friends.component';

describe('RequestFriendsComponent', () => {
  let component: RequestFriendsComponent;
  let fixture: ComponentFixture<RequestFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

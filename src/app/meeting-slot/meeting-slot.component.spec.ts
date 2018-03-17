import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSlotComponent } from './meeting-slot.component';

describe('MeetingSlotComponent', () => {
  let component: MeetingSlotComponent;
  let fixture: ComponentFixture<MeetingSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

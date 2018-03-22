import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCalendarComponent } from './choose-calendar.component';

describe('ChooseCalendarComponent', () => {
  let component: ChooseCalendarComponent;
  let fixture: ComponentFixture<ChooseCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { Meeting } from '../meeting';
import { MEETINGS } from '../mock-meetings';

@Component({
  selector: 'app-meeting-slot',
  templateUrl: './meeting-slot.component.html',
  styleUrls: ['./meeting-slot.component.css']
})
export class MeetingSlotComponent implements OnInit {

  meeting: Meeting = {
    slot: "",
    title: "",
    description: "",
    participants: [""],
  };

  meetings = MEETINGS;

  selectedMeeting: Meeting;

  constructor() { }

  ngOnInit() {
  }

}

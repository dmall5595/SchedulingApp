import { Component, OnInit } from '@angular/core';
import { Meeting } from '../meeting';
import { MEETINGS } from '../mock-meetings';

@Component({
  selector: 'app-meeting-slot',
  templateUrl: './meeting-slot.component.html',
  styleUrls: ['./meeting-slot.component.css']
})
export class MeetingSlotComponent implements OnInit {

  title = 'app';
  columns = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  times = new Array(37);
  dictionary = {}

  onSelect(i, j) {
    console.log(i + "," + j)
    this.selectedSlot = i + "," + j
    
  }

  ngOnInit() {
    console.log(this.dictionary)
    var j = 6
    var am_pm = "am"
    for (var i = 0; i < this.times.length; i ++) {
      this.times[i] = j + " " + am_pm
      j += .5
      if (j == 13) {
        j = 1
        am_pm = "pm"
      }
    }
  }


  meeting: Meeting = {
    slot: "",
    title: "",
    description: "",
    participants: [""],
  };

  meetings = MEETINGS;

  selectedMeeting: Meeting;
  selectedSlot;

  constructor() { }

}

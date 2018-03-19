import { Component, OnInit } from '@angular/core';
import { Meeting } from '../meeting';
//import { MEETINGS } from '../mock-meetings';

@Component({
  selector: 'app-meeting-slot',
  templateUrl: './meeting-slot.component.html',
  styleUrls: ['./meeting-slot.component.css']
})
export class MeetingSlotComponent implements OnInit {

  title = 'app';
  columns = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  times = new Array(37);
  meetings = {}
  realTime

  onSelect(i, j) {
    console.log(i + "," + j)
    this.selectedSlot = i + "," + j
    if (this.selectedSlot in this.meetings) {
      this.selectedMeeting = this.meetings[this.selectedSlot]
    } else {
      this.meetings[this.selectedSlot] = new Meeting
      this.selectedMeeting = this.meetings[this.selectedSlot]
      this.selectedMeeting.slot = this.selectedSlot
      this.selectedMeeting.time = i
      this.selectedMeeting.week = this.columns[j]
    }
    console.log(this.meetings)
    
  }

  ngOnInit() {
    this.getMainTime()
    console.log(this.meetings)
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
    console.log(this.getDaysInMonth(4, 2018))
  }

  getTime(i) {
    var time = i/2 + 6
    var am_pm = "am"

    if (time == 12.5)
      am_pm = "pm"

    if (time >= 13) {
      time -= 12
      am_pm = "pm"
    }

    if (time % 1 != 0) {
      var newTime = time.toString().split(".")[0]
      newTime += ":30 " + am_pm
    } else {
      var newTime = time + ":00 " + am_pm
    }
      
    return newTime
      
  }


  // meeting: Meeting = {
  //   slot: "",
  //   title: "",
  //   description: "",
  //   participants: [""],
  // };

  //meetings = MEETINGS;

  selectedMeeting: Meeting;
  selectedSlot;

  constructor() { }

  getDaysInMonth(month, year) {
    // Since no month has fewer than 28 days
    var date = new Date(year, month, 1);
    var days = [];
    console.log('month', month, 'date.getMonth()', date.getMonth())
    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getMainTime() {
    var currentdate = new Date(); 
    var datetime = 
                 currentdate.getHours() + ":"  
                + currentdate.getMinutes() + " "
                + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                
                
    this.realTime = datetime
  }
  

}

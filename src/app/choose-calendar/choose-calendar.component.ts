import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-calendar',
  templateUrl: './choose-calendar.component.html',
  styleUrls: ['./choose-calendar.component.css']
})
export class ChooseCalendarComponent implements OnInit {

  constructor() { }

  calendar_name;

  choices: String[]

  ngOnInit() {
    this.choices = JSON.parse(window.localStorage.getItem("all_events"))
    // console.log(this.choices)
    
    // for (var i = 0; i < this.c.length; i++) {
    //   var event = calEvents[i]

    //   event.start = new Date(event.start)
    //   event.end = new Date(event.end)

    //   this.events.push(event)

    // }
  }

  //choices = [1, 2]

  delete(choice) {
    this.choices.splice(this.choices.indexOf(choice), 1)
    window.localStorage.setItem("all_events", JSON.stringify(this.choices))
    window.localStorage.removeItem(choice)
  }
 

}

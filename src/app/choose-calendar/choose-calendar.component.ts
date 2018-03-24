import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-calendar',
  templateUrl: './choose-calendar.component.html',
  styleUrls: ['./choose-calendar.component.css']
})
export class ChooseCalendarComponent implements OnInit {

  constructor() { }

  calendar_name;

  choices: String[];

  ngOnInit() {
    this.choices = JSON.parse(window.localStorage.getItem("all_events"))
    if (!this.choices)
      this.choices = []
  }

  delete(choice) {
    this.choices.splice(this.choices.indexOf(choice), 1)
    window.localStorage.setItem("all_events", JSON.stringify(this.choices))
    window.localStorage.removeItem(choice)
  }

}

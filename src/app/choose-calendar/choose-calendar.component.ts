import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-calendar',
  templateUrl: './choose-calendar.component.html',
  styleUrls: ['./choose-calendar.component.css']
})
export class ChooseCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  //choices = [1, 2]

  choices: String[] = JSON.parse(window.localStorage.getItem("calendars"))

}

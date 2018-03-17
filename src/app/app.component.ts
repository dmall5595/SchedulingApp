import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  columns = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  times = new Array(37);

  test(i, j) {
    console.log(i + "," + j)
  }

  ngOnInit() {
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

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { ChooseCalendarComponent } from './choose-calendar/choose-calendar.component';

const routes: Routes = [
  { path: '', component: ChooseCalendarComponent },
  { path: ':id', component: CalendarComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeetingSlotComponent } from './meeting-slot/meeting-slot.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { ChooseCalendarComponent } from './choose-calendar/choose-calendar.component';

const routes: Routes = [
  // { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: '', component: ChooseCalendarComponent },
  { path: 'calendar/:id', component: CalendarComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
# My Schedule App

## What is this?

This is a personal scheduling app built on [Angular](https://angular.io/). It uses an open source [calendar component](https://github.com/mattlewis92/angular-calendar) and allows users to
* Create, edit, and delete events with a title, description, color, start and end time
* Create multiple local calendars, each able to save and persist as long as local storage is kept
* View their schedule in three ways: month, week, and day view

## Build Instructions

To run app, first verify you are running at least node 6.9.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. If you need to install either, you can download both [here.](https://nodejs.org/en/download/).

Then install the Angular CLI globally with the command `npm install -g @angular/cli`.

Once you have that installed go to the directory where the project is located and enter `npm install`.

Then enter `ng serve --open` to start server and have browser open.

## Why no backend?

For simplicity sake I chose not to implement a backend at this time. It would be simple enough to add an API and a database that would simply store the users calendars. The API calls would be a get all calendars, a get specific calendar info, a put that would update a calendar, and a delete that would delete a calendar.

import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TaskService} from '../shared files/Tasks-extension/task.service';
import {map} from 'rxjs/operators';
import {Task} from '../shared files/Tasks-extension/task';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  options: any;

  eventsModel: any[] = [];
  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  constructor(private taskService: TaskService) {
  }
  ngOnInit() {
    this.options = {
      height: 700,
      editable: false,
      disableDragging: false,
      selectable: true,
      theme: 'standart',
      header: {
        right: 'prev,next, today',
        left: 'title',
      },
      titleFormat: {
        year: 'numeric', month: 'long'
      },
      validRange: {
        start: '2020-01-01',
        end: '2021-06-01'
      },
      plugins: [dayGridPlugin]
    };
    this.addEvents();
  }

  addEvents() {
    this.taskService.getTasks().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id,
            ...c.payload.doc.data() as Task})
        )
      )
    ).subscribe(tasks => {
      tasks.forEach(task => {
          this.calendarEvents = this.calendarEvents.concat({
            title: task.name,
            start: new Date(task.deadline)
          });
        }
      );
    });
    console.log(this.calendarEvents);
  }
  eventClick(model) {
  }
  dateClick(model) {
  }
  eventDragStop(model) {
  }
  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      });
    }
  }

}

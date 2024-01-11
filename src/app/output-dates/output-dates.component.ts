import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-output-dates',
  templateUrl: './output-dates.component.html',
  styleUrls: ['./output-dates.component.scss']
})
export class OutputDatesComponent implements OnInit {

  @Input()
  events: Array<Event> = [];

  constructor() { }

  ngOnInit() {
  }

}

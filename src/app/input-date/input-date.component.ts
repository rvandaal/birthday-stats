import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [NgbDatepickerConfig]
})
export class InputDateComponent implements OnInit {

  @Input()
  personGroup: FormGroup;

  constructor(config: NgbDatepickerConfig) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: moment().year() + 1, month: 1, day: 1};
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
  }

}

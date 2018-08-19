import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements OnInit {

  @Input()
  personGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}

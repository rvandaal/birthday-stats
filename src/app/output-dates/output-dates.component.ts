import { Component, OnInit, Input } from '@angular/core';
import { Gebeurtenis } from '../gebeurtenis.model';

@Component({
  selector: 'app-output-dates',
  templateUrl: './output-dates.component.html',
  styleUrls: ['./output-dates.component.css']
})
export class OutputDatesComponent implements OnInit {

  @Input()
  gebeurtenissen: Array<Gebeurtenis>;

  constructor() { }

  ngOnInit() {
  }

}

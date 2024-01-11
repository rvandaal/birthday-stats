import { Event } from '../event.model';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Person } from '../models/person';
import { DateService } from './date.service';


@Injectable({
    providedIn: 'root'
})
export class TogetherNumberOfDaysOldService {

    constructor(private dateService: DateService) { }

    public getGebeurtenis(
        totalNumberOfDays: number,
        persons: Person[]
    ): Event {
        const count = persons.length;
        const birthdates = persons.map(p => new Date(p.birthdate!));
        const minDate = birthdates.reduce((a: Date, b: Date) => a < b ? a : b); // =geboortedatum van oudste persoon
        const t1 = birthdates.map(b => this.dateService.getDiffInDays(b, minDate));
        const t2 = _.sum(t1);
        const t3 = t2 + totalNumberOfDays;
        // t4 = gemiddeld aantal dagen dat iemand van de minDate afzit + totaalAantalDagen / count.
        // Je rekent dus eigenlijk met de geboortedatum van de gemiddelde persoon in het rijtje.
        const t4 = t3 / count;
        const newDate = this.dateService.addDays(minDate, t4);
        if (count === 1) {
            return new Event(newDate, `${persons[0].name} is ${totalNumberOfDays} dagen oud`);
        } else {
            const reducer =
                (acc: string | undefined, cur: string | undefined, curIndex: number) => curIndex < count - 2 ? acc! + cur! + ', ' : (curIndex < count - 1 ? acc! + cur! + ' en ' : acc! + cur!);
            return new Event(newDate, `${persons.map(p => p.name).reduce(reducer, '')} zijn samen ${totalNumberOfDays} dagen oud`);
        }
    }
}

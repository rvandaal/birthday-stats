import { Event } from '../event.model';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { DateService } from './date.service';

@Injectable({
    providedIn: 'root'
})
export class NumberOfTimesOlderService {

    constructor(private dateService: DateService) { }

    public getEvent(
        numberOfTimesOlder: number,
        oldestPerson: Person,
        youngestPerson: Person
    ): Event {
        const ods = oldestPerson.birthdate!;
        const yds = youngestPerson.birthdate!;
        const od = new Date(ods);
        const yd = new Date(yds)
        const daysDiff = this.dateService.getDiffInDays(yd, od);
        if (daysDiff < 0) {
            throw Error('Volgorde personen is verkeerd');
        }
        const daysToAdd = daysDiff / (numberOfTimesOlder - 1);
        const newDate = this.dateService.addDays(yd, daysToAdd);

        return new Event(newDate, `${oldestPerson.name} is ${numberOfTimesOlder} keer zo oud als ${youngestPerson.name}`);
    }
}
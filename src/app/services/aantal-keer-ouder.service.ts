import { Gebeurtenis } from './../gebeurtenis.model';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class AantalKeerOuderService {
    static getGebeurtenis(
        aantalKeerOuder: number,
        oldestPerson: {name: string, birthdate: NgbDate},
        youngestPerson: {name: string, birthdate: NgbDate}
    ): Gebeurtenis {
        const ods = oldestPerson.birthdate;
        const yds = youngestPerson.birthdate;
        const od = moment([ods.year, ods.month - 1, ods.day]);
        const yd = moment([yds.year, yds.month - 1, yds.day]);
        const daysDiff = yd.diff(od, 'days');
        if (daysDiff < 0) {
            throw Error('Volgorde personen is verkeerd');
        }
        const daysToAdd = daysDiff / (aantalKeerOuder - 1);
        const newDate = yd.add(daysToAdd, 'days');

        return new Gebeurtenis(newDate, `${oldestPerson.name} is ${aantalKeerOuder} keer zo oud als ${youngestPerson.name}`);
    }
}
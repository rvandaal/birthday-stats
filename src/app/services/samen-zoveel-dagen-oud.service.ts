import { Gebeurtenis } from './../gebeurtenis.model';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';


@Injectable()
export class SamenZoveelDagenOudService {
    static getGebeurtenis(
        totaalAantalDagen: number,
        persons: {name: string, birthdate: NgbDate}[]
    ): Gebeurtenis {
        const count = persons.length;
        const moments = persons.map(p => moment([p.birthdate.year, p.birthdate.month - 1, p.birthdate.day]));
        const minDate = moment.min(moments); // =geboortedatum van oudste persoon
        const t1 = moments.map(m => m.diff(minDate, 'days'));
        const t2 = _.sum(t1);
        const t3 = t2 + totaalAantalDagen;
        // t4 = gemiddeld aantal dagen dat iemand van de minDate afzit + totaalAantalDagen / count.
        // Je rekent dus eigenlijk met de geboortedatum van de gemiddelde persoon in het rijtje.
        const t4 = t3 / count;
        const newDate = minDate.add(t4, 'days');
        if (count === 1) {
            return new Gebeurtenis(newDate, `${persons[0].name} is ${totaalAantalDagen} dagen oud`);
        } else {
            const reducer =
                (acc, cur, curIndex) => curIndex < count - 2 ? acc + cur + ', ' : (curIndex < count - 1 ? acc + cur + ' en ' : acc + cur );
            return new Gebeurtenis(newDate, `${persons.map(p => p.name).reduce(reducer, '')} zijn samen ${totaalAantalDagen} dagen oud`);
        }
    }
}

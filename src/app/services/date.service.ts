import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getDiffInDays(date1: Date, date2: Date): number {
    const diffInMs = date1.getTime() - date2.getTime();
    const diffInDays = diffInMs / (1000 * 3600 * 24);
    return diffInDays;
  }

  public addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
}

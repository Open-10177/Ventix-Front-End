import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class HistoryRecord implements BaseEntity {
  private _id: number;
  private _date: string;
  private _zone: string;
  private _humidity: string;
  private _co2: string;
  private _temperature: string;
  private _action: string;

  constructor(record: {
    id: number;
    date: string;
    zone: string;
    humidity: string;
    co2: string;
    temperature: string;
    action: string;
  }) {
    this._id = record.id;
    this._date = record.date;
    this._zone = record.zone;
    this._humidity = record.humidity;
    this._co2 = record.co2;
    this._temperature = record.temperature;
    this._action = record.action;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get zone(): string {
    return this._zone;
  }

  set zone(value: string) {
    this._zone = value;
  }

  get humidity(): string {
    return this._humidity;
  }

  set humidity(value: string) {
    this._humidity = value;
  }

  get co2(): string {
    return this._co2;
  }

  set co2(value: string) {
    this._co2 = value;
  }

  get temperature(): string {
    return this._temperature;
  }

  set temperature(value: string) {
    this._temperature = value;
  }

  get action(): string {
    return this._action;
  }

  set action(value: string) {
    this._action = value;
  }
}

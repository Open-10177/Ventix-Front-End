import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class SensorReading implements BaseEntity {
  constructor(props: {
    id: number;
    zone: string;
    temperature: number;
    co2: number;
    humidity: number;
    timestamp: Date;
  }) {
    this._id = props.id;
    this._zone = props.zone;
    this._temperature = props.temperature;
    this._co2 = props.co2;
    this._humidity = props.humidity;
    this._timestamp = props.timestamp;
  }

  private _id: number;
  private _zone: string;
  private _temperature: number;
  private _co2: number;
  private _humidity: number;
  private _timestamp: Date;

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get zone(): string { return this._zone; }
  set zone(value: string) { this._zone = value; }

  get temperature(): number { return this._temperature; }
  set temperature(value: number) { this._temperature = value; }

  get co2(): number { return this._co2; }
  set co2(value: number) { this._co2 = value; }

  get humidity(): number { return this._humidity; }
  set humidity(value: number) { this._humidity = value; }

  get timestamp(): Date { return this._timestamp; }
  set timestamp(value: Date) { this._timestamp = value; }
}

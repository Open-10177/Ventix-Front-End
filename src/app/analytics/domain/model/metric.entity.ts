import { BaseEntity } from '../../../shared/domain/model/base-entity';
export class Metric implements BaseEntity {
  private _id: number;
  private _title: string;
  private _value: string;
  private _status: string;

  constructor(metric: { id: number; title: string; value: string; status: string }) {
    this._id = metric.id;
    this._title = metric.title;
    this._value = metric.value;
    this._status = metric.status;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}

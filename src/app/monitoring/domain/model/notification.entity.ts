import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type NotificationSeverity = 'critical' | 'warning' | 'info';

export class Notification implements BaseEntity {
  constructor(props: {
    id: number;
    title: string;
    description: string;
    action: string;
    severity: NotificationSeverity;
    time: string;
    icon: string;
  }) {
    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._action = props.action;
    this._severity = props.severity;
    this._time = props.time;
    this._icon = props.icon;
  }

  private _id: number;
  private _title: string;
  private _description: string;
  private _action: string;
  private _severity: NotificationSeverity;
  private _time: string;
  private _icon: string;

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }

  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }

  get action(): string { return this._action; }
  set action(value: string) { this._action = value; }

  get severity(): NotificationSeverity { return this._severity; }
  set severity(value: NotificationSeverity) { this._severity = value; }

  get time(): string { return this._time; }
  set time(value: string) { this._time = value; }

  get icon(): string { return this._icon; }
  set icon(value: string) { this._icon = value; }
}

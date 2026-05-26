import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class UserEntity implements BaseEntity {
  private _id: number;
  private _name: string;
  private _lastName: string;
  private _phone: string;
  private _email: string;
  private _password: string;
  private _role?: string;
  private _photoUrl?: string;

  constructor(props: {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    role?: string;
    photoUrl?: string;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._lastName = props.lastName;
    this._phone = props.phone;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;
    this._photoUrl = props.photoUrl;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): string | undefined {
    return this._role;
  }

  set role(value: string | undefined) {
    this._role = value;
  }

  get photoUrl(): string | undefined {
    return this._photoUrl;
  }

  set photoUrl(value: string | undefined) {
    this._photoUrl = value;
  }
}

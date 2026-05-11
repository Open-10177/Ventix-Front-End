import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class  Environment implements BaseEntity{
  constructor(props:{id:number;name:string;hasAlert:boolean}) {
    this._id=props.id;
    this._name=props.name;
    this._hasAlert=props.hasAlert;

  }
private  _id:number;
  private  _name:string;
  private _hasAlert:boolean;
  get name(): string { return this._name;}

  set name(value: string) {this._name = value;}

  get id(): number {return this._id;}

  set id(value: number) {this._id = value;}
 get hasAlert(): boolean {return this._hasAlert;}
  set hasAlert(value:boolean){this._hasAlert=value;}

}


import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SensorReadingResource extends BaseResource {
  zone: string;
  temperature: number;
  co2: number;
  humidity: number;
  timestamp: string;
}
export interface  SensorReadingResponse  extends BaseResponse {
  sensorReading: SensorReadingResource[];
}

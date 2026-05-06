import { BaseResource } from '../../shared/infrastructure/base-response';

export interface SensorReadingResource extends BaseResource {
  zone: string;
  temperature: number;
  co2: number;
  humidity: number;
  timestamp: string;
}

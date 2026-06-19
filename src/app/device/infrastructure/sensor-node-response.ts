
import { BaseResource } from '../../shared/infrastructure/base-response';

export interface SensorNodeResource extends BaseResource {
  nodeUuid: string;
  zone: string;
  batteryLevel: number;
  status: string;
  firmwareVersion: string;
}

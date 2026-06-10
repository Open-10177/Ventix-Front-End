import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { SensorReading } from '../domain/model/sensor-reading.entity';
import { SensorReadingResource, SensorReadingResponse } from './sensor-reading-response';
import { SensorReadingAssembler } from './sensor-reading-assembler';
import { environment } from '../../.././environment/environment';

const sensorReadingEndpointUrl = `${environment.baseUrl}${environment.monitoringTelemetryEndpointPath}`;

/**
 * Infrastructure endpoint client for sensor reading integration.
 */
export class SensorReadingApiEndpoint extends BaseApiEndpoint<SensorReading,SensorReadingResource,SensorReadingResponse,SensorReadingAssembler> {
  /**
   * Creates a sensor reading endpoint adapter.
   * @param http - Angular HTTP client used to call the remote API.
   */
  constructor(http: HttpClient) {
    super(http, sensorReadingEndpointUrl, new SensorReadingAssembler());
  }
}

import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { BaseResponse } from '../../shared/infrastructure/base-response';
import { SensorReading } from '../domain/model/sensor-reading.entity';
import { SensorReadingResource } from './sensor-reading-response';
import { SensorReadingAssembler } from './sensor-reading-assembler';
import { environment } from '../../../enviroment/enviroment';

export class SensorReadingApiEndpoint extends BaseApiEndpoint
<SensorReading,
  SensorReadingResource,
  BaseResponse,
SensorReadingAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.baseUrl}${environment.monitoringTelemetryEndpointPath}`,
      new SensorReadingAssembler()
    );
  }
}

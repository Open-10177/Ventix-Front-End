import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { BaseResponse } from '../../shared/infrastructure/base-response';
import { SensorNode } from '../domain/model/sensor-node.entity';
import { SensorNodeResource } from './sensor-node-response';
import { SensorNodeAssembler } from './sensor-node-assembler';
import { environment } from '../../.././environment/environment';

export class SensorNodeApiEndpoint extends BaseApiEndpoint
<SensorNode,
  SensorNodeResource,
  BaseResponse,
SensorNodeAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.baseUrl}${environment.deviceManagementEndpointPath}`,
      new SensorNodeAssembler()
    );
  }
}

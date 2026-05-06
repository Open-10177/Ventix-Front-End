import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { BaseResponse } from '../../shared/infrastructure/base-response';
import { ThresholdConfig } from '../domain/model/threshold-config.entity';
import { ThresholdConfigResource } from './threshold-config-response';
import { ThresholdConfigAssembler } from './threshold-config-assembler';
import { environment } from '../../../enviroment/enviroment';

export class ThresholdConfigApiEndpoint extends BaseApiEndpoint
<ThresholdConfig,
  ThresholdConfigResource,
  BaseResponse,
ThresholdConfigAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.baseUrl}${environment.deviceInventoryEndpointPath}`,
      new ThresholdConfigAssembler()
    );
  }
}

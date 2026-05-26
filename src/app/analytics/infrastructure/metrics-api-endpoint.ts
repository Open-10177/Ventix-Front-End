import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Metric } from '../domain/model/metric.entity';
import { MetricResource, MetricsResponse } from './metrics-response';
import { MetricAssembler } from './metric-assembler';
import { environment } from '../../../enviroment/environment';

export class MetricsApiEndpoint extends BaseApiEndpoint<Metric, MetricResource, MetricsResponse, MetricAssembler> {
  constructor(http: HttpClient) {
    super(http, environment.baseUrl + environment.analyticsKpisEndpointPath, new MetricAssembler());
  }
}

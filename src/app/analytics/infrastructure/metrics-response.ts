import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface MetricResource extends BaseResource {
  id: number;
  title: string;
  value: string;
  status: string;
}

export interface MetricsResponse extends BaseResponse {
  metrics: MetricResource[];
}

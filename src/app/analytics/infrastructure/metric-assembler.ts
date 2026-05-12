import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Metric } from '../domain/model/metric.entity';
import { MetricResource, MetricsResponse } from './metrics-response';

export class MetricAssembler
  implements
    BaseAssembler<Metric, MetricResource, MetricsResponse> {

  toEntityFromResource(resource: MetricResource): Metric {

    return new Metric({
      id: resource.id,
      title: resource.title,
      value: resource.value,
      status: resource.status
    });
  }

  toResourceFromEntity(entity: Metric): MetricResource {

    return {
      id: entity.id,
      title: entity.title,
      value: entity.value,
      status: entity.status
    } as MetricResource;
  }

  toEntitiesFromResponse(response: MetricsResponse): Metric[] {
    return response.metrics.map(resource =>
      this.toEntityFromResource(
        resource as MetricResource
      )
    );
  }
}

import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SensorReading } from '../domain/model/sensor-reading.entity';
import { SensorReadingResource, SensorReadingResponse } from './sensor-reading-response';

export class SensorReadingAssembler implements BaseAssembler<SensorReading, SensorReadingResource, SensorReadingResponse> {

  toEntityFromResource(resource: SensorReadingResource): SensorReading {
    return  new SensorReading({
      id: resource.id,
      zone: resource.zone,
      temperature: resource.temperature,
      co2: resource.co2,
      humidity: resource.humidity,
      timestamp: new Date(resource.timestamp)
    });
  }

  toResourceFromEntity(entity: SensorReading): SensorReadingResource {
    return {
      id: entity.id,
      zone: entity.zone,
      temperature: entity.temperature,
      co2: entity.co2,
      humidity: entity.humidity,
      timestamp: entity.timestamp.toISOString()
    } as SensorReadingResource;
  }

  toEntitiesFromResponse(response: SensorReadingResponse): SensorReading[] {

    return response.sensorReading.map(resource =>this.toEntityFromResource( resource as SensorReadingResource));
  }
}

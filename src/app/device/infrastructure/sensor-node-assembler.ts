
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { BaseResponse } from '../../shared/infrastructure/base-response';
import { SensorNode } from '../domain/model/sensor-node.entity';
import { SensorNodeResource } from './sensor-node-response';

export class SensorNodeAssembler implements BaseAssembler<SensorNode, SensorNodeResource, BaseResponse> {
  toEntityFromResource(resource: SensorNodeResource): SensorNode {
    return {
      id: resource.id,
      nodeUuid: resource.nodeUuid,
      zone: resource.zone,
      batteryLevel: resource.batteryLevel,
      status: resource.status as any,
      firmwareVersion: resource.firmwareVersion
    };
  }

  toResourceFromEntity(entity: SensorNode): SensorNodeResource {
    return {
      id: entity.id,
      nodeUuid: entity.nodeUuid,
      zone: entity.zone,
      batteryLevel: entity.batteryLevel,
      status: entity.status,
      firmwareVersion: entity.firmwareVersion
    };
  }

  toEntitiesFromResponse(response: BaseResponse): SensorNode[] {
    return [];
  }
}

import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { BaseResponse } from '../../shared/infrastructure/base-response';
import { ThresholdConfig } from '../domain/model/threshold-config.entity';
import { ThresholdConfigResource } from './threshold-config-response';

export class ThresholdConfigAssembler implements BaseAssembler<ThresholdConfig, ThresholdConfigResource, BaseResponse> {
  toEntityFromResource(resource: ThresholdConfigResource): ThresholdConfig {
    return { ...resource };
  }

  toResourceFromEntity(entity: ThresholdConfig): ThresholdConfigResource {
    return { ...entity };
  }

  toEntitiesFromResponse(response: BaseResponse): ThresholdConfig[] {
    return [];
  }
}

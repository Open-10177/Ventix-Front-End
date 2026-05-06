import { BaseResource } from '../../shared/infrastructure/base-response';

export interface ThresholdConfigResource extends BaseResource {
  nodeId: number;
  zone: string;
  ventilationPct: number;
  temperatureLimit: number;
  optimizedMode: boolean;
  savingMode: boolean;
}

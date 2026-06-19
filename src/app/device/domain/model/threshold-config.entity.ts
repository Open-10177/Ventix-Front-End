export interface ThresholdConfig {
  id: number;
  nodeId: number;
  zone: string;
  ventilationPct: number;
  temperatureLimit: number;
  co2Limit: number;
  optimizedMode: boolean;
  savingMode: boolean;
}

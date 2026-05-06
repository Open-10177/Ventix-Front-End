export interface ThresholdConfig {
  id: number;
  nodeId: number;
  zone: string;
  ventilationPct: number;
  temperatureLimit: number;
  optimizedMode: boolean;
  savingMode: boolean;
}

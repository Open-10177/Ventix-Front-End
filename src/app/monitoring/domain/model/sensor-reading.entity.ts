export interface SensorReading {
  id: number;
  zone: string;
  temperature: number;
  co2: number;
  humidity: number;
  timestamp: Date;
}

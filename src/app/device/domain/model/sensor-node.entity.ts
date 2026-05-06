export type DeviceLifecycleStatus = 'REGISTERED' | 'LINKED' | 'ACTIVE' | 'DECOMMISSIONED';

export interface SensorNode {
  id: number;
  nodeUuid: string;
  zone: string;
  batteryLevel: number;
  status: DeviceLifecycleStatus;
  firmwareVersion: string;
}

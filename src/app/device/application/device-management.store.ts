import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorNode } from '../domain/model/sensor-node.entity';
import { ThresholdConfig } from '../domain/model/threshold-config.entity';
import { RoomBattery } from '../domain/model/room-battery.entity';
import { SensorNodeApiEndpoint } from '../infrastructure/sensor-node-api-endpoint';
import { ThresholdConfigApiEndpoint } from '../infrastructure/threshold-config-api-endpoint';

@Injectable({ providedIn: 'root' })
export class DeviceManagementStore {
  private http = inject(HttpClient);
  private nodeEndpoint = new SensorNodeApiEndpoint(this.http);
  private thresholdEndpoint = new ThresholdConfigApiEndpoint(this.http);

  devices = signal<SensorNode[]>([]);
  selectedThreshold = signal<ThresholdConfig | null>(null);

  roomBatteries = signal<RoomBattery[]>([
    { id: 1, name: 'Cuarto 1', batteryPct: 80 },
    { id: 2, name: 'Sala',     batteryPct: 40 },
    { id: 3, name: 'Comedor',  batteryPct: 60 },
  ]);

  loadDevices() {
    this.nodeEndpoint.getAll().subscribe({
      next: nodes => this.devices.set(nodes),
      error: () => {
        this.devices.set([
          { id: 1, nodeUuid: 'uuid-1', zone: 'Cuarto 1', batteryLevel: 80, status: 'ACTIVE', firmwareVersion: '1.0.0' },
          { id: 2, nodeUuid: 'uuid-2', zone: 'Sala',     batteryLevel: 40, status: 'ACTIVE', firmwareVersion: '1.0.0' },
          { id: 3, nodeUuid: 'uuid-3', zone: 'Comedor',  batteryLevel: 60, status: 'ACTIVE', firmwareVersion: '1.0.0' },
        ]);
      }
    });
  }

  loadThreshold(nodeId: number) {
    this.thresholdEndpoint.getById(nodeId).subscribe({
      next: config => this.selectedThreshold.set(config),
      error: () => {
        this.selectedThreshold.set({
          id: nodeId,
          nodeId: nodeId,
          zone: 'Cuarto 1',
          ventilationPct: 50,
          temperatureLimit: 22,
          optimizedMode: true,
          savingMode: false
        });
      }
    });
  }
}

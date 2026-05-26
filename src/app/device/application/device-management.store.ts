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
  thresholdConfigs = signal<ThresholdConfig[]>([]);

  roomBatteries = signal<RoomBattery[]>([
    { id: 1, name: 'Sala', batteryPct: 80 },
    { id: 2, name: 'Cocina', batteryPct: 40 },
    { id: 3, name: 'Cuarto', batteryPct: 60 },
  ]);

  loadDevices() {
    this.nodeEndpoint.getAll().subscribe({
      next: (nodes) => this.devices.set(nodes),
      error: () => {
        this.devices.set([
          {
            id: 1,
            nodeUuid: 'uuid-1',
            zone: 'Sala',
            batteryLevel: 80,
            status: 'ACTIVE',
            firmwareVersion: '1.0.0',
          },
          {
            id: 2,
            nodeUuid: 'uuid-2',
            zone: 'Cocina',
            batteryLevel: 40,
            status: 'ACTIVE',
            firmwareVersion: '1.0.0',
          },
          {
            id: 3,
            nodeUuid: 'uuid-3',
            zone: 'Cuarto',
            batteryLevel: 60,
            status: 'ACTIVE',
            firmwareVersion: '1.0.0',
          },
        ]);
      },
    });
  }

  loadAllThresholds() {
    this.thresholdEndpoint.getAll().subscribe({
      next: (configs) => this.thresholdConfigs.set(configs),
      error: () => {
        this.thresholdConfigs.set([
          {
            id: 1,
            nodeId: 1,
            zone: 'Sala',
            ventilationPct: 60,
            temperatureLimit: 28,
            co2Limit: 900,
            optimizedMode: true,
            savingMode: false,
          },
          {
            id: 2,
            nodeId: 2,
            zone: 'Cocina',
            ventilationPct: 80,
            temperatureLimit: 30,
            co2Limit: 1200,
            optimizedMode: false,
            savingMode: true,
          },
          {
            id: 3,
            nodeId: 3,
            zone: 'Cuarto',
            ventilationPct: 55,
            temperatureLimit: 27,
            co2Limit: 850,
            optimizedMode: true,
            savingMode: false,
          },
        ]);
      },
    });
  }

  loadThreshold(id: number) {
    this.thresholdEndpoint.getById(id).subscribe({
      next: (config) => this.selectedThreshold.set(config),
      error: () => {
        this.selectedThreshold.set({
          id: id,
          nodeId: id,
          zone: 'Sala',
          ventilationPct: 60,
          temperatureLimit: 28,
          co2Limit: 900,
          optimizedMode: true,
          savingMode: false,
        });
      },
    });
  }
}

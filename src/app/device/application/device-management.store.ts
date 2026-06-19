import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { SensorNode } from '../domain/model/sensor-node.entity';
import { ThresholdConfig } from '../domain/model/threshold-config.entity';
import { RoomBattery } from '../domain/model/room-battery.entity';
import { SensorNodeApiEndpoint } from '../infrastructure/sensor-node-api-endpoint';
import { ThresholdConfigApiEndpoint } from '../infrastructure/threshold-config-api-endpoint';
import { environment as appEnv } from '../../../enviroment/environment';

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

  registeringStatus = signal<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  /** UUID of the device being registered, persisted to the backend on setup. */
  private pendingUuid = signal<string>('');

  private devicesUrl = `${appEnv.baseUrl}${appEnv.deviceManagementEndpointPath}`;

  registerByCode(code: string) {
    this.registeringStatus.set('connecting');
    setTimeout(() => {
      this.pendingUuid.set(`uuid-${code}`);
      this.registeringStatus.set('connected');
    }, 2000);
  }

  registerByQr() {
    this.pendingUuid.set(`uuid-qr-${Date.now()}`);
    this.registeringStatus.set('connected');
  }

  /**
   * Persists the new device on the backend with the chosen zone and refreshes
   * the local list. Returns an observable so the caller can navigate when done.
   */
  finalizeSetup(zone: string): Observable<unknown> {
    const uuid = this.pendingUuid() || `uuid-${Date.now()}`;
    const body = {
      nodeUuid: uuid,
      zone,
      batteryLevel: 100,
      status: 'ACTIVE',
      firmwareVersion: '1.0.0',
    };
    return this.http.post(this.devicesUrl, body).pipe(
      tap((created: any) => {
        this.devices.update((d) => [...d, created as SensorNode]);
        this.registeringStatus.set('idle');
        this.pendingUuid.set('');
      }),
      catchError(() => {
        // Even if the backend is down, reflect it locally so the UX continues.
        this.devices.update((d) => [...d, { ...body, id: Date.now() } as SensorNode]);
        this.registeringStatus.set('idle');
        this.pendingUuid.set('');
        return of(null);
      }),
    );
  }

  resetRegister() {
    this.registeringStatus.set('idle');
  }

  loadThreshold(id: number) {
    this.thresholdEndpoint.getById(id).subscribe({
      next: (config) => this.selectedThreshold.set(config),
      error: () => {
        // Fallback: usar el config ya cargado en la lista, no uno fijo
        const fromList = this.thresholdConfigs().find((c) => c.id === id);
        this.selectedThreshold.set(
          fromList ?? {
            id: id,
            nodeId: id,
            zone: 'Zona',
            ventilationPct: 60,
            temperatureLimit: 28,
            co2Limit: 900,
            optimizedMode: true,
            savingMode: false,
          },
        );
      },
    });
  }
}

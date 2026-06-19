import { computed,  inject, Signal, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorReading } from '../domain/model/sensor-reading.entity';
import { Notification } from '../domain/model/notification.entity';
import { Environment } from '../domain/model/environment.entity';
import { MonitoringApi } from '../infrastructure/monitoring-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { environment as appEnv } from '../../../enviroment/environment';

interface DeviceResource { id: number; zone: string; }

@Injectable({ providedIn: 'root' })
/**
 * Application-layer store that orchestrates Monitoring use cases.
 *
 * @remarks
 * This type coordinates infrastructure calls and projects results into reactive
 * UI state. Domain entities stay in the domain layer while API contracts stay
 * in infrastructure.
 */
export class MonitoringStore {

  // ─── Sensor Readings ─────────────────────────────────────────────────────────

  /**
   * Computed signal for the count of sensor readings.
   */
  readonly sensorReadingCount = computed(() => this.sensorReadings().length);

  private readonly sensorReadingsSignal = signal<SensorReading[]>([]);

  /**
   * Readonly signal for the list of sensor readings.
   */
  readonly sensorReadings = this.sensorReadingsSignal.asReadonly();

  // ─── Notifications ───────────────────────────────────────────────────────────

  /**
   * Computed signal for the count of notifications.
   */
  readonly notificationCount = computed(() => this.notifications().length);

  private readonly notificationsSignal = signal<Notification[]>([]);

  /**
   * Readonly signal for the list of notifications.
   */
  readonly notifications = this.notificationsSignal.asReadonly();

  // ─── Environments ─────────────────────────────────────────────────────────────

  private readonly environmentsSignal = signal<Environment[]>([
    new Environment({ id: 1, name: 'Cuarto',   hasAlert: false }),
    new Environment({ id: 2, name: 'Sala',     hasAlert: true  }),
    new Environment({ id: 3, name: 'Cocina',   hasAlert: false }),
    new Environment({ id: 4, name: 'Cuarto 2', hasAlert: false }),
    new Environment({ id: 5, name: 'Cuarto 3', hasAlert: false }),
  ]);

  /**
   * Readonly signal for the list of environments.
   */
  readonly environments = this.environmentsSignal.asReadonly();

  // ─── Fan Usage ────────────────────────────────────────────────────────────────

  private readonly fanUsageSignal = signal([
    { name: 'Ventilador cuarto',   pct: 80 },
    { name: 'Ventilador sala',     pct: 50 },
    { name: 'Ventilador cocina',   pct: 45 },
    { name: 'Ventilador cuarto 2', pct: 30 },
    { name: 'Ventilador cuarto 3', pct: 70 },
  ]);

  /**
   * Readonly signal for the fan usage list.
   */
  readonly fanUsage = this.fanUsageSignal.asReadonly();

  // ─── Loading / Error ─────────────────────────────────────────────────────────

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of MonitoringStore and loads initial data.
   * @param monitoringApi - The API service for monitoring data.
   */
  private readonly http = inject(HttpClient);

  constructor(private monitoringApi: MonitoringApi) {
    this.loadSensorReadings();
    this.loadNotifications();
    this.loadEnvironments();
  }

  /**
   * Loads the environments (Ambientes) from the backend devices, deriving one
   * environment per unique zone. Keeps the default list as a fallback.
   */
  loadEnvironments(): void {
    const url = `${appEnv.baseUrl}${appEnv.deviceManagementEndpointPath}`;
    this.http.get<DeviceResource[]>(url).subscribe({
      next: (devices) => {
        const seen = new Set<string>();
        const envs: Environment[] = [];
        for (const d of devices) {
          if (d.zone && !seen.has(d.zone)) {
            seen.add(d.zone);
            envs.push(new Environment({ id: d.id, name: d.zone, hasAlert: false }));
          }
        }
        if (envs.length > 0) this.environmentsSignal.set(envs);
      },
      error: () => { /* keep default environments */ },
    });
  }

  // ─── Selectors ───────────────────────────────────────────────────────────────

  /**
   * Selects a sensor reading by identifier.
   * @param id - SensorReading identifier.
   * @returns Reactive selection for the requested sensor reading.
   */
  getSensorReadingById(id: number): Signal<SensorReading | undefined> {
    return computed(() => this.sensorReadings().find((s) => s.id === id));
  }

  /**
   * Selects a notification by identifier.
   * @param id - Notification identifier.
   * @returns Reactive selection for the requested notification.
   */
  getNotificationById(id: number): Signal<Notification | undefined> {
    return computed(() => this.notifications().find((n) => n.id === id));
  }

  // ─── Sensor Reading Actions ───────────────────────────────────────────────────

  /**
   * Adds a new sensor reading.
   * @param sensorReading - The sensor reading to add.
   */
  addSensorReading(sensorReading: SensorReading): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .createSensorReading(sensorReading)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.sensorReadingsSignal.update((readings) => [...readings, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create sensor reading'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing sensor reading.
   * @param sensorReading - The sensor reading to update.
   */
  updateSensorReading(sensorReading: SensorReading): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .updateSensorReading(sensorReading)
      .pipe(retry(2))
      .subscribe({
        next: (updated) => {
          this.sensorReadingsSignal.update((readings) =>
            readings.map((r) => (r.id === updated.id ? updated : r)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update sensor reading'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a sensor reading by ID.
   * @param id - The ID of the sensor reading to delete.
   */
  deleteSensorReading(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .deleteSensorReading(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.sensorReadingsSignal.update((readings) => readings.filter((r) => r.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete sensor reading'));
          this.loadingSignal.set(false);
        },
      });
  }


  /**
   * Adds a new notification.
   * @param notification - The notification to add.
   */
  addNotification(notification: Notification): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .createNotification(notification)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.notificationsSignal.update((notifs) => [...notifs, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create notification'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing notification.
   * @param notification - The notification to update.
   */
  updateNotification(notification: Notification): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .updateNotification(notification)
      .pipe(retry(2))
      .subscribe({
        next: (updated) => {
          this.notificationsSignal.update((notifs) =>
            notifs.map((n) => (n.id === updated.id ? updated : n)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update notification'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a notification by ID.
   * @param id - The ID of the notification to delete.
   */
  deleteNotification(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .deleteNotification(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.notificationsSignal.update((notifs) => notifs.filter((n) => n.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete notification'));
          this.loadingSignal.set(false);
        },
      });
  }


  /**
   * Loads all sensor readings from the API.
   */
   loadSensorReadings(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .getSensorReadings()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (readings) => {
          this.sensorReadingsSignal.set(readings);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },
        error: () => {
          this.sensorReadingsSignal.set([
            new SensorReading({ id: 1, zone: 'Sala',    temperature: 24, co2: 850,  humidity: 62, timestamp: new Date() }),
            new SensorReading({ id: 2, zone: 'Cocina',  temperature: 27, co2: 1100, humidity: 55, timestamp: new Date() }),
            new SensorReading({ id: 3, zone: 'Cuarto',  temperature: 22, co2: 680,  humidity: 68, timestamp: new Date() }),
          ]);
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Loads all notifications from the API.
   */
   loadNotifications(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi
      .getNotifications()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (notifs) => {
          this.notificationsSignal.set(notifs);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },
        error: () => {
          this.notificationsSignal.set([
            new Notification({ id: 1, title: 'CO₂ elevado — Sala',         description: 'El nivel de CO₂ supera los 1000 ppm en la Sala.',       action: 'Activar ventilación',  severity: 'critical', time: 'Hace 5 min',   icon: 'warning' }),
            new Notification({ id: 2, title: 'Temperatura alta — Cocina',   description: 'La temperatura alcanzó los 27 °C en Cocina.',           action: 'Revisar umbral',       severity: 'warning',  time: 'Hace 18 min',  icon: 'thermostat' }),
            new Notification({ id: 3, title: 'Batería baja — Cuarto',       description: 'El nodo de Cuarto tiene la batería al 15 %.',           action: 'Recargar dispositivo', severity: 'warning',  time: 'Hace 40 min',  icon: 'battery_alert' }),
            new Notification({ id: 4, title: 'Firmware actualizado',        description: 'El nodo de Sala se actualizó a la versión 1.2.1.',      action: '',                     severity: 'info',     time: 'Hace 2 horas', icon: 'system_update' }),
            new Notification({ id: 5, title: 'Nuevo dispositivo vinculado', description: 'Se registró un nuevo sensor en Cuarto 2 correctamente.', action: '',                    severity: 'info',     time: 'Ayer',         icon: 'devices' }),
          ]);
          this.loadingSignal.set(false);
        },
      });
  }


  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}

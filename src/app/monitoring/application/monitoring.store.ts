import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorReading } from '../domain/model/sensor-reading.entity';
import { Notification } from '../domain/model/notification.entity';
import { Environment } from '../domain/model/environment.entity';
import { SensorReadingApiEndpoint } from '../infrastructure/sensor-reading-api-endpoint';
import { NotificationApiEndpoint } from '../infrastructure/notification-api-endpoint';

@Injectable({ providedIn: 'root' })
export class MonitoringStore {
  private http = inject(HttpClient);
  private sensorEndpoint = new SensorReadingApiEndpoint(this.http);
  private notificationEndpoint = new NotificationApiEndpoint(this.http);

  currentReading = signal<SensorReading | null>(null);
  notifications = signal<Notification[]>([]);
  environments = signal<Environment[]>([
    { id: 1, name: 'Cuarto',   hasAlert: false },
    { id: 2, name: 'Sala',     hasAlert: true  },
    { id: 3, name: 'Cocina',   hasAlert: false },
    { id: 4, name: 'Cuarto 2', hasAlert: false },
    { id: 5, name: 'Cuarto 3', hasAlert: false },
  ]);
  fanUsage = signal([
    { name: 'Ventilador cuarto',  pct: 80 },
    { name: 'Ventilador sala',    pct: 50 },
    { name: 'Ventilador cocina',  pct: 45 },
    { name: 'Ventilador cuarto 2',pct: 30 },
    { name: 'Ventilador cuarto 3',pct: 70 },
  ]);

  loadCurrentReading() {
    this.sensorEndpoint.getAll().subscribe({
      next: readings => {
        if (readings.length > 0) this.currentReading.set(readings[0]);
      },
      error: () => {
        // mock fallback
        this.currentReading.set({
          id: 1, zone: 'General',
          temperature: 47, co2: 400, humidity: 20,
          timestamp: new Date()
        });
      }
    });
  }

  loadNotifications() {
    this.notificationEndpoint.getAll().subscribe({
      next: notifs => this.notifications.set(notifs),
      error: () => {
        this.notifications.set([
          { id: 1, title: 'Nivel crítico CO2', description: 'Alerta: Se ha detectado 1,450 ppm de CO2 en la cocina', action: 'El ventilador se ha activado', severity: 'critical', time: '1h',           icon: '⚠️' },
          { id: 2, title: 'Humedad elevada',   description: '70% detectado en la oficina.',                          action: 'El ventilador se ha activado', severity: 'warning', time: 'Ayer',         icon: '💧' },
          { id: 3, title: 'Filtro ventilador 3',description: 'Filtro del ventilador 3 al 8% de vida útil',          action: 'Mantenimiento sugerido',       severity: 'warning', time: 'Jueves',       icon: '🔧' },
          { id: 4, title: 'Hito de ahorro',    description: 'Has ahorrado $12 de energía esta semana',              action: '',                             severity: 'info',    time: 'Hace 1 semana', icon: '⚙️' },
        ]);
      }
    });
  }
}

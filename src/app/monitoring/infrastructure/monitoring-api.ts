import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationApiEndpoint } from './notification-api-endpoint';
import { SensorReadingApiEndpoint } from './sensor-reading-api-endpoint';
import { Notification } from '../domain/model/notification.entity';
import { SensorReading } from '../domain/model/sensor-reading.entity';

@Injectable({ providedIn: 'root' })
export class MonitoringApi extends BaseApi {
  private readonly notificationEndpoint: NotificationApiEndpoint;
  private readonly sensorReadingEndpoint: SensorReadingApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.notificationEndpoint = new NotificationApiEndpoint(http);
    this.sensorReadingEndpoint = new SensorReadingApiEndpoint(http);
  }

  /**
   * Retrieves all notifications.
   * @returns Stream with the notification collection.
   */
  getNotifications(): Observable<Notification[]> {
    return this.notificationEndpoint.getAll();
  }

  /**
   * Retrieves a single notification by ID.
   * @param id - The ID of the notification.
   * @returns Stream with the selected notification.
   */
  getNotification(id: number): Observable<Notification> {
    return this.notificationEndpoint.getById(id);
  }

  /**
   * Creates a new notification.
   * @param notification - The notification entity to persist.
   * @returns Stream with the created notification.
   */
  createNotification(notification: Notification): Observable<Notification> {
    return this.notificationEndpoint.create(notification);
  }

  /**
   * Updates an existing notification.
   * @param notification - The notification entity carrying updated values.
   * @returns Stream with the updated notification.
   */
  updateNotification(notification: Notification): Observable<Notification> {
    return this.notificationEndpoint.update(notification, notification.id);
  }

  /**
   * Deletes a notification by ID.
   * @param id - The ID of the notification to delete.
   * @returns Completion stream.
   */
  deleteNotification(id: number): Observable<void> {
    return this.notificationEndpoint.delete(id);
  }

  /**
   * Retrieves all sensor readings.
   * @returns Stream with the sensor reading collection.
   */
  getSensorReadings(): Observable<SensorReading[]> {
    return this.sensorReadingEndpoint.getAll();
  }

  /**
   * Retrieves a single sensor reading by ID.
   * @param id - The ID of the sensor reading.
   * @returns Stream with the selected sensor reading.
   */
  getSensorReading(id: number): Observable<SensorReading> {
    return this.sensorReadingEndpoint.getById(id);
  }

  /**
   * Creates a new sensor reading.
   * @param sensorReading - The sensor reading entity to persist.
   * @returns Stream with the created sensor reading.
   */
  createSensorReading(sensorReading: SensorReading): Observable<SensorReading> {
    return this.sensorReadingEndpoint.create(sensorReading);
  }

  /**
   * Updates an existing sensor reading.
   * @param sensorReading - The sensor reading entity carrying updated values.
   * @returns Stream with the updated sensor reading.
   */
  updateSensorReading(sensorReading: SensorReading): Observable<SensorReading> {
    return this.sensorReadingEndpoint.update(sensorReading, sensorReading.id);
  }

  /**
   * Deletes a sensor reading by ID.
   * @param id - The ID of the sensor reading to delete.
   * @returns Completion stream.
   */
  deleteSensorReading(id: number): Observable<void> {
    return this.sensorReadingEndpoint.delete(id);
  }
}

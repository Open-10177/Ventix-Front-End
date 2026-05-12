import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { MetricsApiEndpoint } from './metrics-api-endpoint';
import { HistoryRecordsApiEndpoint } from './history-records-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Metric } from '../domain/model/metric.entity';
import { HistoryRecord } from '../domain/model/history-record.entity';

@Injectable({ providedIn: 'root' })
export class AnalyticsApi extends BaseApi {
  private readonly metricsEndpoint: MetricsApiEndpoint;
  private readonly historyRecordsEndpoint: HistoryRecordsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.metricsEndpoint = new MetricsApiEndpoint(http);
    this.historyRecordsEndpoint = new HistoryRecordsApiEndpoint(http);
  }

  getKpis(): Observable<Metric[]> {
    return this.metricsEndpoint.getAll();
  }

  getHistoryRecords(): Observable<HistoryRecord[]> {
    return this.historyRecordsEndpoint.getAll();
  }
}

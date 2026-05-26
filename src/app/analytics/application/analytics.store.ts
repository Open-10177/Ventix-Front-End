import { Injectable, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Metric } from '../domain/model/metric.entity';
import { HistoryRecord } from '../domain/model/history-record.entity';
import { AnalyticsApi } from '../infrastructure/analytics-api';

@Injectable({ providedIn: 'root' })

export class AnalyticsStore {

  private readonly kpisSignal = signal<Metric[]>([]);
  private readonly historyRecordsSignal = signal<HistoryRecord[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly kpis = this.kpisSignal.asReadonly();
  readonly historyRecords = this.historyRecordsSignal.asReadonly();
  readonly kpiCount = computed(() => this.kpis().length);
  readonly historyCount = computed(() => this.historyRecords().length);
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor(private analyticsApi: AnalyticsApi) {
    this.loadKpis();
    this.loadHistoryRecords();
  }

  private loadKpis(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticsApi.getKpis().pipe(takeUntilDestroyed(), retry(2)).subscribe({

        next: metrics => {
          this.kpisSignal.set(metrics);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },

        error: error => {
          this.errorSignal.set(this.formatError(error, 'Failed to load analytics KPIs'));
          this.loadingSignal.set(false);

          // Mock fallback
          this.kpisSignal.set([

            new Metric({
              id: 1,
              title: 'Total de horas',
              value: '1.250h',
              status: '+12% que el mes anterior'
            }),

            new Metric({
              id: 2,
              title: 'Ahorro de energía',
              value: '30%',
              status: '50 soles ahorrados'
            }),

            new Metric({
              id: 3,
              title: 'Dispositivos activos',
              value: '4 de 6',
              status: 'Funcionando correctamente'
            }),

            new Metric({
              id: 4,
              title: 'Estado de filtros',
              value: '75%',
              status: 'Óptimo'
            })
          ]);
        }
      });
  }

  private loadHistoryRecords(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticsApi.getHistoryRecords().pipe(takeUntilDestroyed(), retry(2)).subscribe({ next: records => {
          this.historyRecordsSignal.set(records);
          this.loadingSignal.set(false);
          this.errorSignal.set(null);
        },

        error: error => {this.errorSignal.set(this.formatError(error, 'Failed to load history records'));
          this.loadingSignal.set(false);
          // Mock fallback
          this.historyRecordsSignal.set([

            new HistoryRecord({
              id: 1,
              date: '05/03/26',
              zone: 'Cuarto',
              humidity: '70%',
              co2: '40ppm',
              temperature: '28,5°C',
              action: 'Auto. Hum. Alerta'
            }),

            new HistoryRecord({
              id: 2,
              date: '10/03/26',
              zone: 'Sala',
              humidity: '30%',
              co2: '50ppm',
              temperature: '24,0°C',
              action: 'Deshumedad prevenir'
            })
          ]);
        }
      });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes(
        'Resource not found'
      )
        ? `${fallback}: Not found`
        : error.message;
    }

    return fallback;
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceManagementStore } from '../../../application/device-management.store';
import { MonitoringStore } from '../../../../monitoring/application/monitoring.store';
import { DatePipe } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-threshold-config',
  imports: [DatePipe, MatSliderModule, FormsModule, MatSelectModule],
  templateUrl: './threshold-config.component.html',
  styleUrl: './threshold-config.component.css',
})
export class ThresholdConfigComponent implements OnInit {
  protected store = inject(DeviceManagementStore);
  protected monitoringStore = inject(MonitoringStore);
  private router = inject(Router);

  activeMode: 'auto' | 'manual' = 'auto';
  ventilationValue = 60;
  temperatureValue = 28;
  co2Value = 900;
  selectedZoneId = 1;

  ngOnInit() {
    this.store.loadAllThresholds();
    this.store.loadThreshold(1);
  }

  onZoneChange(id: number) {
    this.selectedZoneId = id;
    this.store.loadThreshold(id);
    // esperar a que llegue el dato y sincronizar sliders
    setTimeout(() => this.syncSliders(), 300);
  }

  syncSliders() {
    const cfg = this.store.selectedThreshold();
    if (cfg) {
      this.ventilationValue = cfg.ventilationPct;
      this.temperatureValue = cfg.temperatureLimit;
      this.co2Value = cfg.co2Limit;
      this.activeMode = cfg.optimizedMode ? 'auto' : 'manual';
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  setMode(mode: 'auto' | 'manual') {
    this.activeMode = mode;
  }

  getBatteryPct(): number {
    const cfg = this.store.selectedThreshold();
    if (!cfg) return 0;
    const match = this.store
      .roomBatteries()
      .find(
        (b) =>
          b.name.toLowerCase().includes(cfg.zone.toLowerCase()) ||
          cfg.zone.toLowerCase().includes(b.name.toLowerCase()),
      );
    return match?.batteryPct ?? 75;
  }

  getZoneReading() {
    const cfg = this.store.selectedThreshold();
    if (!cfg) return null;
    return (
      this.monitoringStore
        .sensorReadings()
        .find((r) => r.zone.toLowerCase() === cfg.zone.toLowerCase()) ??
      this.monitoringStore.sensorReadings()[0] ??
      null
    );
  }

  getBarWidth(value: number, max: number): number {
    return Math.min((value / max) * 100, 100);
  }
}

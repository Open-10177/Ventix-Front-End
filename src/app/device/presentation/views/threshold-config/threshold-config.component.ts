import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceManagementStore } from '../../../application/device-management.store';
import { MonitoringStore } from '../../../../monitoring/application/monitoring.store';
import { ThresholdConfig } from '../../../domain/model/threshold-config.entity';
import { DatePipe } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-threshold-config',
  imports: [DatePipe, MatSliderModule, FormsModule, MatSelectModule, MatIconModule, MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './threshold-config.component.html',
  styleUrl: './threshold-config.component.css',
})
export class ThresholdConfigComponent implements OnInit {
  protected store = inject(DeviceManagementStore);
  protected monitoringStore = inject(MonitoringStore);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  activeMode: 'auto' | 'manual' = 'auto';
  ventilationValue = 60;
  temperatureValue = 28;
  co2Value = 900;
  selectedZone = '';

  /** All available zones: threshold configs + registered devices/environments (deduped). */
  zones = computed(() => {
    const names = new Set<string>();
    this.store.thresholdConfigs().forEach(c => names.add(c.zone));
    this.store.devices().forEach(d => names.add(d.zone));
    this.monitoringStore.environments().forEach(e => names.add(e.name));
    return Array.from(names);
  });

  ngOnInit() {
    this.store.loadAllThresholds();
    this.store.loadDevices();
    this.monitoringStore.loadEnvironments();

    const zone = this.route.snapshot.queryParamMap.get('zone');
    setTimeout(() => {
      const target = zone || this.zones()[0] || '';
      if (target) this.onZoneChange(target);
    }, 400);
  }

  onZoneChange(zone: string) {
    this.selectedZone = zone;
    const z = zone.toLowerCase();
    const cfg = this.store.thresholdConfigs().find(
      c => c.zone.toLowerCase() === z ||
           c.zone.toLowerCase().includes(z) ||
           z.includes(c.zone.toLowerCase())
    );
    // If the zone has no saved threshold yet, show sensible defaults for it.
    this.store.selectedThreshold.set(cfg ?? this.defaultThresholdFor(zone));
    this.syncSliders();
  }

  private defaultThresholdFor(zone: string): ThresholdConfig {
    return {
      id: 0,
      nodeId: 0,
      zone,
      ventilationPct: 60,
      temperatureLimit: 28,
      co2Limit: 900,
      optimizedMode: true,
      savingMode: false,
    };
  }

  syncSliders() {
    const cfg = this.store.selectedThreshold();
    if (cfg) {
      this.ventilationValue = cfg.ventilationPct;
      this.temperatureValue = cfg.temperatureLimit;
      this.co2Value         = cfg.co2Limit;
      this.activeMode       = cfg.optimizedMode ? 'auto' : 'manual';
    }
  }

  goBack() { this.router.navigate(['/home']); }

  setMode(mode: 'auto' | 'manual') { this.activeMode = mode; }

  getBatteryPct(): number {
    const cfg = this.store.selectedThreshold();
    if (!cfg) return 0;
    const match = this.store.roomBatteries().find(
      b => b.name.toLowerCase().includes(cfg.zone.toLowerCase()) ||
           cfg.zone.toLowerCase().includes(b.name.toLowerCase())
    );
    return match?.batteryPct ?? 75;
  }

  getZoneReading() {
    const cfg = this.store.selectedThreshold();
    if (!cfg) return null;
    return (
      this.monitoringStore.sensorReadings().find(r => r.zone.toLowerCase() === cfg.zone.toLowerCase()) ??
      this.monitoringStore.sensorReadings()[0] ??
      null
    );
  }

  getBarWidth(value: number, max: number): number {
    return Math.min((value / max) * 100, 100);
  }
}

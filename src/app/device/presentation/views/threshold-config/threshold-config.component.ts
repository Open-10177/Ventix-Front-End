import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceManagementStore } from '../../../application/device-management.store';

@Component({
  selector: 'app-threshold-config',
  imports: [],
  templateUrl: './threshold-config.component.html',
  styleUrl: './threshold-config.component.css'
})
export class ThresholdConfigComponent implements OnInit {
  protected store = inject(DeviceManagementStore);
  private router = inject(Router);

  ngOnInit() { this.store.loadThreshold(1); }
  goBack()   { this.router.navigate(['/home']); }
}

import {Component, inject, OnInit } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider, MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MonitoringStore } from '../../../../monitoring/application/monitoring.store';
import { Router } from '@angular/router';
import { MatBadge } from '@angular/material/badge';

/**
 * Home view for the shared presentation context.
 */
@Component({
  selector: 'app-home',
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    MatIcon,
    MatList,
    MatListItem,
    MatNavList,
    MatProgressBar,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatBadge,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected store = inject(MonitoringStore);
  private router = inject(Router);

  ngOnInit() {}

  goToNotifications() {
    this.router.navigate(['/monitoring/notifications']);
  }
  goToMap() {
    this.router.navigate(['/device/map']);
  }
  goToHistory() {
    this.router.navigate(['/analytics/history']);
  }
  goToThresholds() {
    this.router.navigate(['/device/thresholds']);
  }
}

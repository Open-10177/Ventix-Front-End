import { Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider, MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MonitoringStore } from '../../../../monitoring/application/monitoring.store';
import { Environment } from '../../../../monitoring/domain/model/environment.entity';
import { Notification } from '../../../../monitoring/domain/model/notification.entity';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PanicDialogComponent } from '../../components/panic-dialog/panic-dialog.component';

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
    MatProgressBar,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected store = inject(MonitoringStore);
  private router  = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private translate = inject(TranslateService);

  ngOnInit() {
    this.store.loadEnvironments();
  }

  goToEnvironment(env: Environment) {
    this.router.navigate(['/device/thresholds'], { queryParams: { zone: env.name } });
  }

  goToMap()        { this.router.navigate(['/device/map']); }
  goToHistory()    { this.router.navigate(['/analytics/history']); }
  goToThresholds() { this.router.navigate(['/device/thresholds']); }
  goToRegister()   { this.router.navigate(['/device/register']); }

  triggerPanic() {
    const ref = this.dialog.open(PanicDialogComponent, {
      data: { environments: this.store.environments() },
      panelClass: 'panic-dialog-panel',
    });
    ref.afterClosed().subscribe((zone: string | undefined) => {
      if (!zone) return;

      // Register the emergency as a real notification so it shows up in the list.
      const notif = new Notification({
        id: Date.now(),
        title: this.translate.instant('panic.notifTitle', { zone }),
        description: this.translate.instant('panic.notifDesc', { zone }),
        action: this.translate.instant('panic.notifAction'),
        severity: 'critical',
        time: this.translate.instant('panic.now'),
        icon: 'crisis_alert',
      });
      this.store.addNotification(notif);

      const msg = this.translate.instant('panic.sent', { zone });
      this.snackBar.open(msg, this.translate.instant('common.close'), {
        duration: 6000,
        panelClass: ['panic-snackbar'],
      });
      this.router.navigate(['/monitoring/notifications']);
    });
  }
}

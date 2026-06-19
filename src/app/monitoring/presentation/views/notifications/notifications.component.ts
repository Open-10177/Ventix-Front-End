import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonitoringStore } from '../../../application/monitoring.store';
import { Notification } from '../../../domain/model/notification.entity';
import { NotificationDetailComponent } from '../notification-detail/notification-detail.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  imports: [NgClass, MatCardModule, MatButtonModule, MatIcon, MatDivider, TranslatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  protected store = inject(MonitoringStore);
  private router   = inject(Router);
  private dialog   = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  get urgentNotifs() {
    return this.store.notifications().filter(n => n.severity !== 'info');
  }

  get infoNotifs() {
    return this.store.notifications().filter(n => n.severity === 'info');
  }

  openDetail(notification: Notification) {
    const ref = this.dialog.open(NotificationDetailComponent, {
      data: notification,
      width: '440px',
      autoFocus: false,
    });

    ref.afterClosed().subscribe(result => {
      if (result === 'resolved') {
        this.snackBar.open(`"${notification.action}" ejecutado correctamente.`, 'Cerrar', { duration: 4000 });
      }
    });
  }

  goBack() { this.router.navigate(['/home']); }
}

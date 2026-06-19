import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { Notification } from '../../../domain/model/notification.entity';

@Component({
  selector: 'app-notification-detail',
  imports: [MatDialogModule, MatButtonModule, MatIcon, MatDivider, TranslatePipe],
  templateUrl: './notification-detail.component.html',
  styleUrl: './notification-detail.component.css',
})
export class NotificationDetailComponent {
  protected data = inject<Notification>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<NotificationDetailComponent>);

  readonly severityLabel: Record<string, string> = {
    critical: 'notifications.severityCritical',
    warning:  'notifications.severityWarning',
    info:     'notifications.severityInfo',
  };

  close()   { this.dialogRef.close(); }
  resolve() { this.dialogRef.close('resolved'); }
}

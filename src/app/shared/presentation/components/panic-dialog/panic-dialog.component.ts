import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Environment } from '../../../../monitoring/domain/model/environment.entity';

/**
 * Dialog that lets the user pick which environment the panic alert targets.
 * Closes returning the selected zone name, or undefined when cancelled.
 */
@Component({
  selector: 'app-panic-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, TranslatePipe],
  template: `
    <h2 mat-dialog-title class="panic-title">
      <mat-icon class="panic-title-icon">crisis_alert</mat-icon>
      {{ 'panic.title' | translate }}
    </h2>
    <mat-dialog-content>
      <p class="panic-sub">{{ 'panic.selectEnvironment' | translate }}</p>
      <div class="panic-list">
        @for (env of data.environments; track env.id) {
          <button type="button" mat-stroked-button class="panic-item" (click)="select(env.name)">
            <mat-icon [class.alert]="env.hasAlert">{{ env.hasAlert ? 'error' : 'meeting_room' }}</mat-icon>
            <span>{{ env.name }}</span>
          </button>
        }
        @if (data.environments.length === 0) {
          <p class="panic-empty">{{ 'panic.noEnvironments' | translate }}</p>
        }
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button type="button" mat-button (click)="cancel()">{{ 'common.cancel' | translate }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .panic-title { display: flex; align-items: center; gap: 8px; color: #c62828; }
    .panic-title-icon { color: #c62828; }
    .panic-sub { margin: 0 0 12px; color: #555; }
    .panic-list { display: flex; flex-direction: column; gap: 8px; min-width: 280px; }
    .panic-item { display: flex; align-items: center; justify-content: flex-start; gap: 10px; }
    .panic-item mat-icon.alert { color: #c62828; }
    .panic-empty { color: #777; text-align: center; }
  `],
})
export class PanicDialogComponent {
  protected data = inject<{ environments: Environment[] }>(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<PanicDialogComponent>);

  select(zone: string) { this.ref.close(zone); }
  cancel() { this.ref.close(); }
}

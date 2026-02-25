import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { httpResource } from '@angular/common/http';
import { API_URL } from '../../../../core/tokens/api-url.token';
import { NotificationService } from '../../../../core/services/notification.service';
import { SampleService } from '../../services/sample.service';
import { Sample } from '../../models/sample.model';
import {
  PageHeaderComponent,
  Breadcrumb,
} from '../../../../shared/components/page-header/page-header.component';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sample-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PageHeaderComponent,
    LoadingStateComponent,
  ],
  template: `
    <app-page-header title="Sample" [breadcrumbs]="breadcrumbs()">
      <button
        mat-stroked-button
        color="warn"
        (click)="confirmDelete()"
        [disabled]="!resource.hasValue()"
      >
        <mat-icon>delete</mat-icon> Delete
      </button>
    </app-page-header>

    @if (resource.isLoading()) {
      <app-loading-state status="loading" />
    } @else if (resource.error()) {
      <app-loading-state
        status="error"
        errorMessage="Failed to load sample"
        (retry)="resource.reload()"
      />
    } @else if (resource.hasValue()) {
      <mat-card appearance="outlined" class="detail-card">
        <mat-card-content>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">ID</span
              ><span class="detail-value">{{ resource.value()!.id }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Biopsy Date</span
              ><span class="detail-value">{{ resource.value()!.biopsy_date || '—' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Tumor</span
              ><span class="detail-value">{{ resource.value()!.tumor_biobank_code || '—' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Has Serum</span
              ><span class="detail-value">{{
                resource.value()!.has_serum === true
                  ? 'Yes'
                  : resource.value()!.has_serum === false
                    ? 'No'
                    : '—'
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Has Buffy Coat</span
              ><span class="detail-value">{{
                resource.value()!.has_buffy === true
                  ? 'Yes'
                  : resource.value()!.has_buffy === false
                    ? 'No'
                    : '—'
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Has Plasma</span
              ><span class="detail-value">{{
                resource.value()!.has_plasma === true
                  ? 'Yes'
                  : resource.value()!.has_plasma === false
                    ? 'No'
                    : '—'
              }}</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    }
  `,
  styles: `
    .detail-card {
      border-radius: 12px !important;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .detail-label {
      font: var(--mat-sys-label-medium);
      color: var(--mat-sys-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .detail-value {
      font: var(--mat-sys-body-large);
      color: var(--mat-sys-on-surface);
    }
  `,
})
export class SampleDetailPage {
  id = input.required<string>();

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private service = inject(SampleService);
  private notification = inject(NotificationService);
  private apiUrl = inject(API_URL);

  breadcrumbs = computed<Breadcrumb[]>(() => [
    { label: 'Samples', route: '/samples' },
    { label: this.id() },
  ]);

  resource = httpResource<Sample>(() => `${this.apiUrl}/samples/${this.id()}`);

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Sample',
        message: 'Delete this sample? This cannot be undone.',
        confirmLabel: 'Delete',
        confirmColor: 'warn',
      } satisfies ConfirmDialogData,
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.service.delete(this.id()).subscribe({
          next: () => {
            this.notification.success('Sample deleted');
            this.router.navigate(['/samples']);
          },
          error: () => {
            this.notification.error('Failed to delete sample');
          },
        });
      }
    });
  }
}

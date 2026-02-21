import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface Breadcrumb {
  label: string;
  route?: string;
}

@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  template: `
    <div class="page-header">
      @if (breadcrumbs().length) {
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          @for (crumb of breadcrumbs(); track crumb.label; let last = $last) {
            @if (crumb.route && !last) {
              <a [routerLink]="crumb.route" class="breadcrumb-link">{{ crumb.label }}</a>
              <mat-icon class="breadcrumb-sep">chevron_right</mat-icon>
            } @else {
              <span class="breadcrumb-current" [attr.aria-current]="last ? 'page' : null">{{ crumb.label }}</span>
            }
          }
        </nav>
      }
      <div class="header-row">
        <div class="header-text">
          <h1 class="page-title">{{ title() }}</h1>
          @if (subtitle()) {
            <p class="page-subtitle">{{ subtitle() }}</p>
          }
        </div>
        <div class="header-actions">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: `
    .page-header {
      margin-bottom: 1.5rem;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
      font: var(--mat-sys-body-small);
    }

    .breadcrumb-link {
      color: var(--mat-sys-primary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .breadcrumb-sep {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--mat-sys-outline);
    }

    .breadcrumb-current {
      color: var(--mat-sys-on-surface-variant);
    }

    .header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .page-title {
      font: var(--mat-sys-headline-medium);
      color: var(--mat-sys-on-surface);
      margin: 0;
    }

    .page-subtitle {
      font: var(--mat-sys-body-medium);
      color: var(--mat-sys-on-surface-variant);
      margin: 0.25rem 0 0;
    }

    .header-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  breadcrumbs = input<Breadcrumb[]>([]);
}

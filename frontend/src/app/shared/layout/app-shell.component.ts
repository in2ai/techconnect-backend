import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { map } from 'rxjs';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-sidenav-container class="shell-container">
      <mat-sidenav
        #sidenav
        [mode]="isMobile() ? 'over' : 'side'"
        [opened]="!isMobile()"
        class="app-sidenav"
        role="navigation"
      >
        <div class="sidenav-header">
          <a routerLink="/dashboard" class="brand-link">
            <mat-icon class="brand-icon">biotech</mat-icon>
            <span class="brand-text">TechConnect</span>
          </a>
        </div>

        <mat-nav-list>
          @for (group of navGroups; track group.title) {
            <div class="nav-group">
              <span class="nav-group-label">{{ group.title }}</span>
              @for (item of group.items; track item.route) {
                <a
                  mat-list-item
                  [routerLink]="item.route"
                  routerLinkActive="active-link"
                  (click)="isMobile() ? sidenav.close() : null"
                >
                  <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  <span matListItemTitle>{{ item.label }}</span>
                </a>
              }
            </div>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar class="app-toolbar">
          @if (isMobile()) {
            <button mat-icon-button (click)="sidenav.toggle()" aria-label="Toggle navigation">
              <mat-icon>menu</mat-icon>
            </button>
          }
          <span class="toolbar-spacer"></span>
        </mat-toolbar>

        <main class="content-area">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .shell-container {
      height: 100%;
    }

    .app-sidenav {
      width: 260px;
      border-right: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface);
    }

    .sidenav-header {
      padding: 1.25rem 1rem;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--mat-sys-on-surface);
    }

    .brand-icon {
      color: var(--mat-sys-primary);
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .brand-text {
      font: var(--mat-sys-title-large);
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .nav-group {
      padding: 0.5rem 0;
    }

    .nav-group-label {
      display: block;
      padding: 0.5rem 1rem 0.25rem;
      font: var(--mat-sys-label-small);
      color: var(--mat-sys-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .active-link {
      background-color: var(--mat-sys-secondary-container) !important;
      color: var(--mat-sys-on-secondary-container) !important;
      border-radius: 28px;

      mat-icon {
        color: var(--mat-sys-on-secondary-container);
      }
    }

    .app-toolbar {
      background: var(--mat-sys-surface);
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .toolbar-spacer {
      flex: 1;
    }

    .main-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .content-area {
      flex: 1;
      padding: 1.5rem 2rem;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;

      @media (max-width: 768px) {
        padding: 1rem;
      }
    }
  `,
})
export class AppShellComponent {
  private breakpoint = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakpoint.observe([Breakpoints.Handset]).pipe(map((r) => r.matches)),
    { initialValue: false },
  );

  navGroups = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
      ],
    },
    {
      title: 'Registry',
      items: [
        { label: 'Patients', icon: 'person', route: '/patients' },
        { label: 'Tumors', icon: 'coronavirus', route: '/tumors' },
        { label: 'Liquid Biopsies', icon: 'water_drop', route: '/liquid-biopsies' },
      ],
    },
    {
      title: 'Research',
      items: [
        { label: 'Biomodels', icon: 'science', route: '/biomodels' },
        { label: 'Passages', icon: 'swap_horiz', route: '/passages' },
        { label: 'Trials', icon: 'assignment', route: '/trials' },
      ],
    },
  ];
}

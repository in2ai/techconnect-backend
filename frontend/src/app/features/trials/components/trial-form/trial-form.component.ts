import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Trial } from '../../models/trial.model';

export interface TrialFormData {
  mode: 'create' | 'edit';
  trial?: Trial;
}

@Component({
  selector: 'app-trial-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, FormsModule],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'create' ? 'New Trial' : 'Edit Trial' }}</h2>
    <mat-dialog-content>
      <form class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Passage ID</mat-label>
          <input matInput [(ngModel)]="model.passage_id" name="passage_id" required />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Creation Date</mat-label>
          <input matInput [(ngModel)]="model.creation_date" name="creation_date" type="date" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Biobank Arrival Date</mat-label>
          <input matInput [(ngModel)]="model.biobank_arrival_date" name="biobank_arrival_date" type="date" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="model.description" name="description" rows="3"></textarea>
        </mat-form-field>
        <div class="checkbox-group">
          <mat-checkbox [(ngModel)]="model.success" name="success">Success</mat-checkbox>
          <mat-checkbox [(ngModel)]="model.biobank_shipment" name="biobank_shipment">Biobank Shipment</mat-checkbox>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button [mat-dialog-close]="model" [disabled]="!model.passage_id">
        {{ data.mode === 'create' ? 'Create' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; min-width: 400px; }
    .full-width { grid-column: 1 / -1; }
    .checkbox-group { grid-column: 1 / -1; display: flex; gap: 1.5rem; padding: 0.5rem 0; }
  `,
})
export class TrialFormComponent {
  data = inject<TrialFormData>(MAT_DIALOG_DATA);

  model: Trial = this.data.trial
    ? { ...this.data.trial }
    : { id: '', success: null, description: null, creation_date: null, biobank_shipment: null, biobank_arrival_date: null, passage_id: '' };
}

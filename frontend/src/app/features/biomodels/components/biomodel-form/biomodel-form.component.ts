import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Biomodel } from '../../models/biomodel.model';

export interface BiomodelFormData {
  mode: 'create' | 'edit';
  biomodel?: Biomodel;
}

@Component({
  selector: 'app-biomodel-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'create' ? 'New Biomodel' : 'Edit Biomodel' }}</h2>
    <mat-dialog-content>
      <form class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Tumor Biobank Code</mat-label>
          <input
            matInput
            [(ngModel)]="model.tumor_biobank_code"
            name="tumor_biobank_code"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Type</mat-label>
          <input matInput [(ngModel)]="model.type" name="type" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <input matInput [(ngModel)]="model.status" name="status" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Viability</mat-label>
          <input
            matInput
            [(ngModel)]="model.viability"
            name="viability"
            type="number"
            step="0.01"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Creation Date</mat-label>
          <input matInput [(ngModel)]="model.creation_date" name="creation_date" type="date" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="model.description" name="description" rows="2"></textarea>
        </mat-form-field>
        <mat-checkbox [(ngModel)]="model.progresses" name="progresses">Progresses</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button [mat-dialog-close]="model" [disabled]="!model.tumor_biobank_code">
        {{ data.mode === 'create' ? 'Create' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      min-width: 400px;
    }
    .full-width {
      grid-column: 1 / -1;
    }
  `,
})
export class BiomodelFormComponent {
  data = inject<BiomodelFormData>(MAT_DIALOG_DATA);

  model: Biomodel = this.data.biomodel
    ? { ...this.data.biomodel }
    : {
        id: '',
        type: null,
        description: null,
        creation_date: null,
        status: null,
        progresses: null,
        viability: null,
        tumor_biobank_code: '',
        parent_trial_id: null,
      };
}

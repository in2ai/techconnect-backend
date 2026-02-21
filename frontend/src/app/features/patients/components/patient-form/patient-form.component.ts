import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../models/patient.model';

export interface PatientFormData {
  mode: 'create' | 'edit';
  patient?: Patient;
}

@Component({
  selector: 'app-patient-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'create' ? 'New Patient' : 'Edit Patient' }}</h2>
    <mat-dialog-content>
      <form class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>NHC</mat-label>
          <input
            matInput
            [(ngModel)]="model.nhc"
            name="nhc"
            required
            [readonly]="data.mode === 'edit'"
            placeholder="Enter NHC identifier"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Sex</mat-label>
          <mat-select [(ngModel)]="model.sex" name="sex">
            <mat-option [value]="null">Not specified</mat-option>
            <mat-option value="M">Male</mat-option>
            <mat-option value="F">Female</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Birth Date</mat-label>
          <input matInput [(ngModel)]="model.birth_date" name="birth_date" type="date" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-flat-button
        [mat-dialog-close]="model"
        [disabled]="!model.nhc"
      >
        {{ data.mode === 'create' ? 'Create' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .form-grid {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-width: 350px;
    }
  `,
})
export class PatientFormComponent {
  data = inject<PatientFormData>(MAT_DIALOG_DATA);

  model: Patient = this.data.patient
    ? { ...this.data.patient }
    : { nhc: '', sex: null, birth_date: null };
}

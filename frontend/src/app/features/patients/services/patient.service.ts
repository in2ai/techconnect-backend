import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseCrudService<Patient> {
  protected endpoint = 'patients';
}

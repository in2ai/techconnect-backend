import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { Tumor } from '../models/tumor.model';

@Injectable({ providedIn: 'root' })
export class TumorService extends BaseCrudService<Tumor> {
  protected endpoint = 'tumors';
}

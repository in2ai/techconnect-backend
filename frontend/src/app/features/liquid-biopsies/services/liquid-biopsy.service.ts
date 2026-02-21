import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { LiquidBiopsy } from '../models/liquid-biopsy.model';

@Injectable({ providedIn: 'root' })
export class LiquidBiopsyService extends BaseCrudService<LiquidBiopsy> {
  protected endpoint = 'liquid-biopsies';
}

import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { Passage } from '../models/passage.model';

@Injectable({ providedIn: 'root' })
export class PassageService extends BaseCrudService<Passage> {
  protected endpoint = 'passages';
}

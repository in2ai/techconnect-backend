import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { Sample } from '../models/sample.model';

@Injectable({ providedIn: 'root' })
export class SampleService extends BaseCrudService<Sample> {
  protected endpoint = 'samples';
}

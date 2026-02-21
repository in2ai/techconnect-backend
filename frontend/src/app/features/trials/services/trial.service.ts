import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { Trial, PDXTrial, PDOTrial, LCTrial } from '../models/trial.model';
import {
  Implant,
  SizeRecord,
  Mouse,
  FACS,
  UsageRecord,
  TrialImage,
  Cryopreservation,
  GenomicSequencing,
  MolecularData,
} from '../models/trial-related.model';

@Injectable({ providedIn: 'root' })
export class TrialService extends BaseCrudService<Trial> {
  protected endpoint = 'trials';
}

@Injectable({ providedIn: 'root' })
export class PDXTrialService extends BaseCrudService<PDXTrial> {
  protected endpoint = 'pdx-trials';
}

@Injectable({ providedIn: 'root' })
export class PDOTrialService extends BaseCrudService<PDOTrial> {
  protected endpoint = 'pdo-trials';
}

@Injectable({ providedIn: 'root' })
export class LCTrialService extends BaseCrudService<LCTrial> {
  protected endpoint = 'lc-trials';
}

@Injectable({ providedIn: 'root' })
export class ImplantService extends BaseCrudService<Implant> {
  protected endpoint = 'implants';
}

@Injectable({ providedIn: 'root' })
export class SizeRecordService extends BaseCrudService<SizeRecord> {
  protected endpoint = 'size-records';
}

@Injectable({ providedIn: 'root' })
export class MouseService extends BaseCrudService<Mouse> {
  protected endpoint = 'mice';
}

@Injectable({ providedIn: 'root' })
export class FACSService extends BaseCrudService<FACS> {
  protected endpoint = 'facs';
}

@Injectable({ providedIn: 'root' })
export class UsageRecordService extends BaseCrudService<UsageRecord> {
  protected endpoint = 'usage-records';
}

@Injectable({ providedIn: 'root' })
export class TrialImageService extends BaseCrudService<TrialImage> {
  protected endpoint = 'images';
}

@Injectable({ providedIn: 'root' })
export class CryopreservationService extends BaseCrudService<Cryopreservation> {
  protected endpoint = 'cryopreservations';
}

@Injectable({ providedIn: 'root' })
export class GenomicSequencingService extends BaseCrudService<GenomicSequencing> {
  protected endpoint = 'genomic-sequencings';
}

@Injectable({ providedIn: 'root' })
export class MolecularDataService extends BaseCrudService<MolecularData> {
  protected endpoint = 'molecular-data';
}

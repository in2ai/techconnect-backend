export interface Implant {
  id: string;
  implant_location: string | null;
  type: string | null;
  mouse_id: string;
}

export interface Measure {
  id: string;
  measure_date: string | null;
  measure_value: number | null;
  implant_id: string;
}

export interface Mouse {
  id: string;
  birth_date: string | null;
  death_cause: string | null;
  animal_facility: string | null;
  proex: string | null;
  strain: string | null;
  sex: string | null;
  death_date: string | null;
  pdx_trial_id: string;
}

export interface FACS {
  id: string;
  measure: string | null;
  measure_value: number | null;
  lc_trial_id: string | null;
}

export interface UsageRecord {
  id: string;
  record_type: string | null;
  description: string | null;
  record_date: string | null;
  trial_id: string;
}

export interface TrialImage {
  id: string;
  image_date: string | null;
  scanner_magnification: number | null;
  type: string | null;
  ap_review: boolean | null;
  trial_id: string;
}

export interface Cryopreservation {
  id: string;
  location: string | null;
  cryo_date: string | null;
  vial_count: number | null;
  trial_id: string;
}

export interface TrialGenomicSequencing {
  id: string;
  annotations: string | null;
  trial_id: string | null;
}

export interface TrialMolecularData {
  id: string;
  annotations: string | null;
  trial_id: string | null;
}

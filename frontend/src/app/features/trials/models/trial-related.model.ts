export interface Implant {
  id: string;
  implant_location: string | null;
  type: string | null;
  size_limit: number | null;
  pdx_trial_id: string;
}

export interface SizeRecord {
  id: string;
  week_number: number | null;
  initial_size_mm3: number | null;
  final_size_mm3: number | null;
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
  lc_trial_id: string | null;
}

export interface UsageRecord {
  id: string;
  usage_type: string | null;
  description: string | null;
  record_date: string | null;
  trial_id: string;
}

export interface TrialImage {
  id: string;
  image_date: string | null;
  type: string | null;
  ap_review: string | null;
  trial_id: string;
}

export interface Cryopreservation {
  id: string;
  location: string | null;
  cryo_date: string | null;
  vial_count: number | null;
  trial_id: string;
}

export interface GenomicSequencing {
  id: string;
  trial_id: string | null;
}

export interface MolecularData {
  id: string;
  trial_id: string | null;
}

export interface Tumor {
  biobank_code: string;
  lab_code: string | null;
  classification: string | null;
  ap_observation: string | null;
  grade: string | null;
  organ: string | null;
  status: string | null;
  tnm: string | null;
  registration_date: string | null;
  operation_date: string | null;
  patient_nhc: string;
}

export interface TumorGenomicSequencing {
  id: string;
  has_data: boolean | null;
  data: string | null;
  tumor_biobank_code: string | null;
}

export interface TumorMolecularData {
  id: string;
  has_data: boolean | null;
  data: string | null;
  tumor_biobank_code: string | null;
}

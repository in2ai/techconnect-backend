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

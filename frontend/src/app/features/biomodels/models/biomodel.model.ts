export interface Biomodel {
  id: string;
  type: string | null;
  description: string | null;
  creation_date: string | null;
  status: string | null;
  progresses: boolean | null;
  viability: number | null;
  tumor_biobank_code: string;
  parent_trial_id: string | null;
}

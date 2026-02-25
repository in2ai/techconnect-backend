export interface Passage {
  id: string;
  number: number | null;
  description: string | null;
  biomodel_id: string;
  parent_trial_id: string | null;
}

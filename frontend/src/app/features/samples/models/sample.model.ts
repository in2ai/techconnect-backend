export interface Sample {
  id: string;
  has_serum: boolean | null;
  has_buffy: boolean | null;
  has_plasma: boolean | null;
  biopsy_date: string | null;
  tumor_biobank_code: string | null;
}

export interface Trial {
  id: string;
  success: boolean | null;
  description: string | null;
  creation_date: string | null;
  biobank_shipment: boolean | null;
  biobank_arrival_date: string | null;
  passage_id: string;
}

export interface PDXTrial {
  id: string;
  ffpe: boolean | null;
  he_slide: boolean | null;
  ihq_data: string | null;
  latency_weeks: number | null;
  s_index: number | null;
  scanner_magnification: string | null;
}

export interface PDOTrial {
  id: string;
  drop_count: number | null;
  frozen_organoid_count: number | null;
  organoid_count: number | null;
  plate_type: string | null;
  visualization_day: number | null;
  assessment: string | null;
}

export interface LCTrial {
  id: string;
  confluence: number | null;
  spheroids: boolean | null;
  digestion_date: string | null;
  cell_line: string | null;
  plate_type: string | null;
}

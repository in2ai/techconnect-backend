# TechConnect Backend Data Model

## Entity Relationship Diagram

```mermaid
erDiagram
    PATIENT ||--o{ TUMOR : "has"
    TUMOR ||--o{ LIQUID_BIOPSY : "has"
    TUMOR ||--o{ BIOMODEL : "derived_from"
    BIOMODEL ||--o{ PASSAGE : "has"
    PASSAGE ||--o{ TRIAL : "generates"
    
    TRIAL ||--o| PDX_TRIAL : "is_a"
    TRIAL ||--o| PDO_TRIAL : "is_a"
    TRIAL ||--o| LC_TRIAL : "is_a"
    
    TRIAL ||--o{ USAGE_RECORD : "has"
    TRIAL ||--o{ IMAGE : "generates"
    TRIAL ||--o{ CRYOPRESERVATION : "has"
    TRIAL ||--o| GENOMIC_SEQUENCING : "has"
    TRIAL ||--o| MOLECULAR_DATA : "has"
    
    PDX_TRIAL ||--o{ IMPLANT : "creates"
    PDX_TRIAL ||--o| MOUSE : "uses"
    IMPLANT ||--o{ SIZE_RECORD : "has"
    
    LC_TRIAL ||--o| FACS : "has"
    
    PATIENT {
        string nhc PK
        string sex
        date birth_date
    }
    
    TUMOR {
        string biobank_code PK
        string lab_code
        string classification
        string ap_observation
        string grade
        string organ
        string status
        string tnm
        date registration_date
        date operation_date
        string patient_nhc FK
    }
    
    LIQUID_BIOPSY {
        uuid id PK
        boolean has_serum
        boolean has_buffy
        boolean has_plasma
        date biopsy_date
        string tumor_biobank_code FK
    }
    
    BIOMODEL {
        uuid id PK
        string type
        string preclinical_trials
        string description
        date creation_date
        string status
        boolean progresses
        float viability
        string tumor_biobank_code FK
    }
    
    PASSAGE {
        uuid id PK
        integer number
        string status
        float s_index
        float viability
        string description
        uuid biomodel_id FK
    }
    
    TRIAL {
        uuid id PK
        boolean success
        string description
        date creation_date
        boolean biobank_shipment
        date biobank_arrival_date
        uuid passage_id FK
    }
    
    PDX_TRIAL {
        uuid id PK
        boolean ffpe
        boolean he_slide
        string ihq_data
        integer latency_weeks
        float s_index
        string scanner_magnification
    }
    
    PDO_TRIAL {
        uuid id PK
        integer drop_count
        integer frozen_organoid_count
        integer organoid_count
        string plate_type
        integer visualization_day
        string assessment
    }
    
    LC_TRIAL {
        uuid id PK
        float confluence
        boolean spheroids
        date digestion_date
        string cell_line
        string plate_type
    }
    
    USAGE_RECORD {
        uuid id PK
        string usage_type
        string description
        date record_date
        uuid trial_id FK
    }
    
    IMAGE {
        uuid id PK
        date image_date
        string type
        string ap_review
        uuid trial_id FK
    }
    
    CRYOPRESERVATION {
        uuid id PK
        string location
        date cryo_date
        integer vial_count
        uuid trial_id FK
    }
    
    GENOMIC_SEQUENCING {
        uuid id PK
        uuid trial_id FK
    }
    
    MOLECULAR_DATA {
        uuid id PK
        uuid trial_id FK
    }
    
    IMPLANT {
        uuid id PK
        string implant_location
        string type
        float size_limit
        uuid pdx_trial_id FK
    }
    
    SIZE_RECORD {
        uuid id PK
        integer week_number
        float initial_size_mm3
        float final_size_mm3
        uuid implant_id FK
    }
    
    MOUSE {
        uuid id PK
        date birth_date
        string death_cause
        string animal_facility
        string proex
        string strain
        string sex
        date death_date
        uuid pdx_trial_id FK
    }
    
    FACS {
        uuid id PK
        uuid lc_trial_id FK
    }
```

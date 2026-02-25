"""
Trial models - Parent entity and subtypes (PDXTrial, PDOTrial, LCTrial).

Implements Is_a inheritance pattern using joined table inheritance.
"""

from datetime import date
from typing import TYPE_CHECKING, Optional, Union
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .biomodel import Biomodel
    from .passage import Passage
    from .pdx_entities import Mouse
    from .lc_entities import FACS
    from .trial_entities import (
        UsageRecord,
        Image,
        Cryopreservation,
        TrialGenomicSequencing,
        TrialMolecularData,
    )


class Trial(SQLModel, table=True):
    """
    Trial parent entity - base class for all trial types.
    
    Attributes:
        id: Unique identifier (UUID)
        success: Whether the trial was successful
        description: General description
        status: Status of the trial
        preclinical_trials: Preclinical trials information
        creation_date: Date the trial was created
        biobank_shipment: Whether there was a biobank shipment
        biobank_arrival_date: Date of biobank arrival
        passage_id: FK to Passage
    """
    
    __tablename__ = "trial"
    
    # Primary key
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    
    # Fields
    success: Optional[bool] = Field(default=None)
    description: Optional[str] = Field(default=None)  # text field
    status: Optional[bool] = Field(default=None)
    preclinical_trials: Optional[str] = Field(default=None)
    creation_date: Union[date, None] = Field(default=None)
    biobank_shipment: Optional[bool] = Field(default=None)
    biobank_arrival_date: Union[date, None] = Field(default=None)
    
    # Foreign keys (required - 1:N relationship with Passage)
    passage_id: UUID = Field(foreign_key="passage.id", description="FK to Passage")
    
    # Relationships
    passage: Optional["Passage"] = Relationship(
        back_populates="trials",
        sa_relationship_kwargs={"foreign_keys": "[Trial.passage_id]"}
    )
    usage_records: list["UsageRecord"] = Relationship(back_populates="trial")
    images: list["Image"] = Relationship(back_populates="trial")
    cryopreservations: list["Cryopreservation"] = Relationship(back_populates="trial")
    genomic_sequencing: Optional["TrialGenomicSequencing"] = Relationship(back_populates="trial")
    molecular_data: Optional["TrialMolecularData"] = Relationship(back_populates="trial")
    child_biomodels: list["Biomodel"] = Relationship(back_populates="parent_trial")
    child_passages: list["Passage"] = Relationship(
        back_populates="parent_trial",
        sa_relationship_kwargs={"foreign_keys": "[Passage.parent_trial_id]"}
    )
    
    # Subtype relationships (1:1 for inheritance pattern)
    pdx_trial: Optional["PDXTrial"] = Relationship(back_populates="trial")
    pdo_trial: Optional["PDOTrial"] = Relationship(back_populates="trial")
    lc_trial: Optional["LCTrial"] = Relationship(back_populates="trial")


class PDXTrial(SQLModel, table=True):
    """
    PDXTrial subtype - Patient-Derived Xenograft trial.
    
    Attributes:
        id: Same as parent Trial id (shared primary key)
        ffpe: Formalin-fixed paraffin-embedded
        he_slide: H&E slide available
        ihq_data: Immunohistochemistry data
        has_ihq_data: Has immunohistochemistry data
        latency_weeks: Latency period in weeks
        similarity: Similarity value
    """
    
    __tablename__ = "pdx_trial"
    
    # Primary key (references Trial)
    id: UUID = Field(foreign_key="trial.id", primary_key=True)
    
    # Fields
    ffpe: Optional[bool] = Field(default=None)
    he_slide: Optional[bool] = Field(default=None)
    ihq_data: Optional[str] = Field(default=None)  # text field
    has_ihq_data: Optional[bool] = Field(default=None)
    latency_weeks: Optional[float] = Field(default=None)
    similarity: Optional[float] = Field(default=None)
    
    # Relationships
    trial: Optional["Trial"] = Relationship(back_populates="pdx_trial")
    mouse: Optional["Mouse"] = Relationship(back_populates="pdx_trial")


class PDOTrial(SQLModel, table=True):
    """
    PDOTrial subtype - Patient-Derived Organoid trial.
    
    Attributes:
        id: Same as parent Trial id (shared primary key)
        drop_count: Number of drops
        frozen_organoid_count: Number of frozen organoids
        organoid_count: Total organoid count
        plate_type: Type of plate used
        assessment: Assessment result
    """
    
    __tablename__ = "pdo_trial"
    
    # Primary key (references Trial)
    id: UUID = Field(foreign_key="trial.id", primary_key=True)
    
    # Fields
    drop_count: Optional[int] = Field(default=None)
    frozen_organoid_count: Optional[int] = Field(default=None)
    organoid_count: Optional[int] = Field(default=None)
    plate_type: Optional[str] = Field(default=None, max_length=50)
    assessment: Optional[str] = Field(default=None, max_length=100)
    
    # Relationships
    trial: Optional["Trial"] = Relationship(back_populates="pdo_trial")


class LCTrial(SQLModel, table=True):
    """
    LCTrial subtype - Liquid Culture trial.
    
    Attributes:
        id: Same as parent Trial id (shared primary key)
        confluence: Confluence percentage
        spheroids: Whether spheroids are present
        digestion_date: Date of digestion
        plate_type: Type of plate used
    """
    
    __tablename__ = "lc_trial"
    
    # Primary key (references Trial)
    id: UUID = Field(foreign_key="trial.id", primary_key=True)
    
    # Fields
    confluence: Optional[float] = Field(default=None)
    spheroids: Optional[bool] = Field(default=None)
    digestion_date: Union[date, None] = Field(default=None)
    plate_type: Optional[str] = Field(default=None, max_length=50)
    
    # Relationships
    trial: Optional["Trial"] = Relationship(back_populates="lc_trial")
    facs: Optional["FACS"] = Relationship(back_populates="lc_trial")

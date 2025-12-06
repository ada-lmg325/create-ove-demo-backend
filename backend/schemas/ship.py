from pydantic import BaseModel
from typing import Optional


class CruiseShip(BaseModel):
    id: int
    name: str
    line: str
    age: int
    tonnage: float
    passengers: float
    length: float
    cabins: float
    passenger_density: float
    crew: float
    meta: Optional[object] = None


class CruiseShipQueryParams(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    line: Optional[str] = None
    min_age: Optional[int] = None
    max_age: Optional[int] = None
    age: Optional[int] = None
    min_tonnage: Optional[float] = None
    max_tonnage: Optional[float] = None
    tonnage: Optional[float] = None
    min_passengers: Optional[float] = None
    max_passengers: Optional[float] = None
    passengers: Optional[float] = None
    min_length: Optional[float] = None
    max_length: Optional[float] = None
    length: Optional[float] = None
    min_cabins: Optional[float] = None
    max_cabins: Optional[float] = None
    cabins: Optional[float] = None
    min_passenger_density: Optional[float] = None
    max_passenger_density: Optional[float] = None
    passenger_density: Optional[float] = None
    min_crew: Optional[float] = None
    max_crew: Optional[float] = None
    crew: Optional[float] = None


class RefreshResponse(BaseModel):
    success: bool

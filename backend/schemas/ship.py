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
    age: Optional[int] = None
    tonnage: Optional[float] = None
    passengers: Optional[float] = None
    length: Optional[float] = None
    cabins: Optional[float] = None
    passenger_density: Optional[float] = None
    crew: Optional[float] = None

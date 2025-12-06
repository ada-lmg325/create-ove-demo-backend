from sqlalchemy import Column, String, Integer, Float, JSON
from app.db.session import Base


class DictMixin:
    def to_dict(self):
        return {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }


class APIKey(Base):
    __tablename__ = "api_keys"
    id = Column(String, primary_key=True)


class CruiseShip(Base):
    __tablename__ = "cruise_ship"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    line = Column(String)
    age = Column(Integer)
    tonnage = Column(Float)
    passengers = Column(Float)
    length = Column(Float)
    cabins = Column(Float)
    passenger_density = Column(Float)
    crew = Column(Float)

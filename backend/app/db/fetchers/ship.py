from app.db.models import CruiseShip
from schemas.ship import CruiseShipQueryParams
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.core.logger import logger


def get_ships_db(params: CruiseShipQueryParams = None):
    Session = create_session()
    with Session() as session:
        query = session.query(CruiseShip)
        filters = params.dict(exclude_none=True)
        for col, val in filters.items():
            col_obj = getattr(CruiseShip, col)
            query = query.filter(col_obj == val)

        return query.all()


def get_ship_db(id):
    Session = create_session()
    with Session() as session:
        return session.query(CruiseShip).filter_by(id=id).first()


def create_session():
    # TODO: Consider using db settings for this
    db_name = 'create-ove-demo.db'
    engine = create_engine(f"sqlite:///{db_name}", echo=True)
    Session = sessionmaker(bind=engine)
    return Session

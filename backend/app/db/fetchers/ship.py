from sqlalchemy import func
from app.db.models import CruiseShip
from schemas.ship import CruiseShipQueryParams
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func, text
from app.core.logger import logger
import pandas as pd


def get_ships_db(params: CruiseShipQueryParams = None):
    Session = create_session()
    with Session() as session:
        query = session.query(CruiseShip)
        filters = params.dict(exclude_none=True)
        for col, val in filters.items():
            min = False
            max = False
            if ("min_" in col):
                min = True
                col = col.replace("min_", "")

            if ("max_" in col):
                max = True
                col = col.replace("max_", "")

            col_obj = getattr(CruiseShip, col)
            if (min):
                logger.info("In min")
                query = query.filter(col_obj >= val)
            elif (max):
                logger.info("In max")
                query = query.filter(col_obj <= val)
            else:
                logger.info("In Else")
                query = query.filter(col_obj == val)

        return {
            "ships": query.all(), "meta": {
                "filters": get_filter_values(session)
            }}


def get_ship_db(id):
    Session = create_session()

    numeric_cols = [
        "age",
        "tonnage",
        "passengers",
        "length",
        "cabins",
        "passenger_density",
        "crew",
    ]

    with Session() as session:

        rank_exprs = [
            func.rank().over(order_by=getattr(
                CruiseShip, col).desc()).label(f"{col}_rank")
            for col in numeric_cols
        ]

        total_rows_expr = func.count(CruiseShip.id).over().label("total_rows")

        subquery = (
            session.query(CruiseShip, *rank_exprs, total_rows_expr)
            .subquery()
        )
        res = session.query(subquery).filter_by(id=id).first()
        if res:
            return {
                "id": res.id,
                "name": res.name,
                "line": res.line,
                "age": res.age,
                "tonnage": res.tonnage,
                "passengers": res.passengers,
                "length": res.length,
                "cabins": res.cabins,
                "passenger_density": res.passenger_density,
                "crew": res.crew,
                "meta": {
                    "rank": {
                        "age": res.age_rank,
                        "tonnage": res.tonnage_rank,
                        "passengers": res.passengers_rank,
                        "length": res.length_rank,
                        "cabins": res.cabins_rank,
                        "passenger_density": res.passenger_density_rank,
                        "crew": res.crew_rank
                    },
                    "total": res.total_rows
                }
            }
        else:
            return None


def load_data_from_csv():
    path_name = './data/cruise_ship_info.csv'
    df = pd.read_csv(path_name)
    df.rename(columns={
        "Ship_name": "name",
        "Cruise_line": "line",
        "Age": 'age',
        "Tonnage": 'tonnage'
    }, inplace=True)
    logger.info(df.head())
    objects = [
        CruiseShip(**row.to_dict())
        for _, row in df.iterrows()
    ]
    Session = create_session()
    with Session() as session:

        session.execute(text("DELETE FROM cruise_ship"))
        session.commit()

        session.add_all(objects)
        session.commit()


def get_filter_values(session):
    numeric_cols = [
        "age",
        "tonnage",
        "passengers",
        "length",
        "cabins",
        "passenger_density",
        "crew",
    ]
    aggregates = []
    for col_name in numeric_cols:
        col = getattr(CruiseShip, col_name)
        aggregates.append(func.min(col).label(f"{col_name}_min"))
        aggregates.append(func.max(col).label(f"{col_name}_max"))

    row = session.query(*aggregates).one()

    result = {}
    for col_name in numeric_cols:
        min = getattr(row, f"{col_name}_min")
        max = getattr(row, f"{col_name}_max")
        result["min_" + col_name] = min
        result["max_" + col_name] = max

    col = getattr(CruiseShip, col_name)
    result["line"] = [val for (val,) in session.query(
        CruiseShip.line).distinct().all()]

    return result


def create_session():
    db_name = './data/main.db'
    engine = create_engine(f"sqlite:///{db_name}", echo=False)
    Session = sessionmaker(bind=engine)
    return Session

from pathlib import Path

from fastapi import APIRouter, Request, Depends, HTTPException

from app.core.auth import cookie_scheme
from app.core.cache import cached
from app.core.config import get_settings
from app.core.rate_limiter import limiter
from app.db.fetchers.ship import get_ships_db, get_ship_db

from schemas.ship import CruiseShip, CruiseShipQueryParams

from app.core.logger import logger

router = APIRouter()
settings = get_settings()


@router.get("/ships", response_model=list[CruiseShip])
@limiter.limit("100/second")
@cached
async def get_ships(
        request: Request,
        params: CruiseShipQueryParams = Depends(),
        _auth=Depends(cookie_scheme)
) -> list[CruiseShip]:
    try:
        return get_ships_db(params)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/ships/{id}", response_model=CruiseShip)
@limiter.limit("100/second")
@cached
async def get_ship(
        id: int,
        request: Request, _auth=Depends(cookie_scheme)) -> CruiseShip:
    try:
        ship = get_ship_db(id)
        if ship is None:
            raise HTTPException(status_code=404, detail="Not Found")
        return ship
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")

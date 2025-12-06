import aiosqlite
import pandas as pd
import os
from app.db.fetchers.ship import load_data_from_csv

from app.core.logger import logger

# TODO: Figure out where to do this. And whether we can use the existing database from settings (database_url)


def configure_db():
    load_data_from_csv()

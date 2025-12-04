import aiosqlite
import pandas as pd

from app.core.logger import logger

# TODO: Figure out where to do this. And whether we can use the existing database from settings (database_url)


async def configure_db():
    if aiosqlite is not None:
        db_name = 'create-ove-demo.db'
        path_name = './data/cruise_ship_info.csv'
        table_name = 'cruise_ship'
        await create_db(db_name, table_name)
        await load_from_csv(db_name, table_name, path_name)


# TODO: Handle async nature of create_db and load_from_csv
async def create_db(db_name, table_name):
    # Connect to the SQLite database (creates file if it doesn't exist)
    async with aiosqlite.connect(db_name) as db:
        # Execute a simple SQL statement
        await db.execute(
            f"""
            CREATE TABLE IF NOT EXISTS {table_name} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                line TEXT,
                age INT,
                tonnage FLOAT(24),
                passengers FLOAT(24),
                length FLOAT(24),
                cabins FLOAT(24),
                passenger_density FLOAT(24),
                crew FLOAT(24)
            )
            """
        )
        # Commit changes
        await db.commit()
        logger.info("Database and table created!")


async def load_from_csv(db_name, table_name, path_name):
    df = pd.read_csv(path_name)

    async with aiosqlite.connect(db_name) as db:
        rows = list(df.itertuples(index=False, name=None))
        await db.executemany(
            f"""
            INSERT OR IGNORE INTO {table_name} (
            name,
            line,
            age,
            tonnage,
            passengers,
            length,
            cabins,
            passenger_density,
            crew
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            rows
        )
        await db.commit()

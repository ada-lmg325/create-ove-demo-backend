# Cruise Ship Visualization

A small web application used to visualize data about cruise ships. The app is constructed using a FastAPI backend and a React/Vite frontend. The app contains three top level views which allow users to access a directory of all cruise ships, a bar chart of summary statistics for all cruise lines, as well as a dashboard view of the same summary statistics. It also features am individual cruise ship summary view, where you can see information about an individual cruise ship, and where it ranks amongst all cruise ships.

The philosophy around the design was to make each top level view very flexible so that the filters could be leveraged as much as possible. The views will display all of the data that is specified by the filters, allowing the user to customize what they are seeing. The individual cruise ship view was designed to show an alternative view of the data that differs from the top level views.

Given that the charts are quite simple, I decided to use Recharts and ApexCharts as they provide nice out of the box solutions. For more complex data visualizations, I think that a more customizable framework such as D3.js would be appropriate.

At the startup of the application, the cruise ship data is loaded into an SQLite database. While this could have been done in memory, if the dataset were to grow beyond the current number of ships this would become quite costly. 

---

## Prerequisites

- Node.js ≥ 18.x  
- pnpm  
- Python ≥ 3.10  
- pip install uv (`pip install uv`)  
- sqlite3 (if using SQLite) **or** Docker & Docker Compose (if using Postgres)  
- Git  

---

## Setup & Install

### 1. Backend

```bash
cd backend
pip install uv
uv sync --locked
```

Add a .env file replacing {{PATH_TO_PROJECT}} with the path to the project on your local machine

```dotenv
CACHE_HOST="localhost"
CACHE_PORT=6379
CACHE_EXPIRATION=3600
CACHE_ENABLED=false

FRONTEND_ORIGIN="http://localhost:5173"
WEBSOCKET_ORIGIN="ws://localhost:5173"

DATABASE_URL="sqlite+aiosqlite:///{{PATH_TO_PROJECT}}/backend/data/main.db"
DATA_DIR="{{PATH_TO_PROJECT}}/backend/data"
BASE_PATH="/example-project"
PUBLIC_DIR="{{PATH_TO_PROJECT}}/backend/public"
MODELS_DIR="{{PATH_TO_PROJECT}}/backend/models"
TEMPLATES_DIR="{{PATH_TO_PROJECT}}/backend/templates"

PORT=80

DISABLE_AUTH="true"
USE_LEGACY_AUTH=true
LEGACY_AUTH_KEY=""
METRICS_USERNAME="admin"
METRICS_PASSWORD=""

VITE_BACKEND="http://localhost:8000/example-project"
VITE_SOCKET_SERVER="http://localhost:8000"
VITE_SOCKET_PATH="/example-project/ws/socket.io"
VITE_ENABLE_DEBUG=true
```

### 2. Frontend

```bash
cd frontend
pnpm install
```

### Run Frontend

```bash
cd frontend
pnpm run dev
```

Visit `http://localhost:5173`

---

### Run Backend
```bash
cd backend
uv run fastapi dev app/main.py --port 8000
```



## Project Layout


├── backend/
│   ├── app/                FastAPI app (auth, cache, sockets, API, DB)
│   ├── data/               SQLite file or Postgres data
│   ├── migrations/         Alembic configs & versions
│   ├── scripts/            Codegen: OpenAPI, AsyncAPI, JSON-Schemas
│   ├── public/             Static docs (asyncapi.html, docs.html)
│   ├── .env(.production)   Environment variables
│   └── main.py             Entrypoint
├── frontend/
│   ├── src/                React code, hooks, styles, Debug overlay
│   ├── api/                Generated REST hooks & socket clients
│   ├── cli/codegen/        TS generators for schemas, API & sockets
│   ├── public/             Static assets (favicon, robots.txt, manifest)
│   ├── package.json        Scripts & dependencies
│   └── vite.config.ts
├── docker-compose.yml
├── Dockerfile
└── README.md


---

## Frontend Scripts

From the `frontend/` directory:

- `pnpm run dev`       — start HMR/Vite server  
- `pnpm run build`     — compile production assets  
- `pnpm run serve`     — preview production build  
- `pnpm run test`      — run Vitest suite  
- `pnpm run sync`      — regenerate TS schemas, API & sockets  
- `pnpm run check`     — Prettier & ESLint fixes  
- `pnpm run lint`      — ESLint only  
- `pnpm run format`    — Prettier only  
- `pnpm run clean`     — remove `dist/`  

---

## Backend Commands

From the `backend/` directory:

- `uv sync --locked`                             — install dependencies  
- `uv run alembic revision --autogenerate -m "..."`
- `uv run alembic upgrade head`                  — apply migrations  
- `uv run scripts/schemas.py`                    — generate OpenAPI/AsyncAPI/JSON-Schemas  

---

## Tips & Next Steps

- Keep `.env*` files out of version control.  
- After any schema/API change, run codegen then frontend sync.  
- Adjust cache, rate-limit and auth policies in `app/core/config.py`.  
- Use React-Query DevTools for inspecting REST queries.  
- Customize UI primitives via the `components/` folder or `shadcn` presets.  

---

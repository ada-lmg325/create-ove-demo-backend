import { CruiseShip } from "@/interfaces/cruise-ship";
import { formatString } from "@/utils/string-formatter";
import { Gauge } from "./gauge";

export type CruiseLineQuantitySummaryProps = {
  selectedQuantity: keyof CruiseShip;
  ships: CruiseShip[];
  max: number;
  units?: string;
};

export const CruiseLineQuantitySummary = ({
  selectedQuantity,
  ships,
  max,
  units = "",
}: CruiseLineQuantitySummaryProps) => {
  const shipsData = ships.reduce(
    (acc: Record<string, any>, ship) => {
      const val = ship[selectedQuantity];
      if (val > acc.max) {
        acc.max = val;
        acc.max_ship = ship;
      }
      if (val < acc.min) {
        acc.min = val;
        acc.min_ship = ship;
      }
      acc.value += ship[selectedQuantity];
      acc.count++;
      return acc;
    },
    {
      value: 0,
      count: 0,
      max: 0,
      min: Number.MAX_VALUE,
      min_ship: null,
      max_ship: null,
    }
  );

  return shipsData ? (
    <div className="m-2 rounded-lg border border-gray-200 bg-white p-4">
      <h1 className="text-4xl font-bold tracking-tight">
        {formatString(selectedQuantity)}
      </h1>
      <div className="m-3 flex justify-between text-center">
        <div>
          <span>Average</span>
          <Gauge
            value={(shipsData.value / shipsData.count / max) * 100}
            label={
              (shipsData.value / shipsData.count).toFixed(2) +
              (units ? " " + units : "")
            }
          />
        </div>
        <div>
          <span>Min</span>
          <Gauge
            value={(shipsData.min / max) * 100}
            label={shipsData.min.toFixed(2) + (units ? " " + units : "")}
          />
          <a
            href={`/ship/${shipsData.min_ship.id}`}
            className="text-blue-500 underline hover:text-blue-700"
            rel="noopener noreferrer"
          >
            {shipsData.min_ship.name}
          </a>
        </div>
        <div>
          <span>Max</span>
          <Gauge
            value={(shipsData.max / max) * 100}
            label={shipsData.max.toFixed(2) + (units ? " " + units : "")}
          />
          <a
            href={`/ship/${shipsData.max_ship.id}`}
            className="text-blue-500 underline hover:text-blue-700"
            rel="noopener noreferrer"
          >
            {shipsData.max_ship.name}
          </a>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

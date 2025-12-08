import { CruiseShip } from "@/interfaces/cruise-ship";
import { formatString } from "@/utils/string-formatter";
import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Dropdown } from "./dropdown";

export type CruiseLineSummaryProps = {
  ships: CruiseShip[];
};

type val_options = Omit<keyof CruiseShip, "id" | "name" | "line">;

const val_opts: val_options[] = [
  "age",
  "tonnage",
  "passengers",
  "length",
  "cabins",
  "passenger_density",
  "crew",
];

type OptDisplay = Record<string, string>;

const opt_display: OptDisplay = {
  age: "Age (years)",
  tonnage: "Tonnage (GT)",
  passengers: "Passengers",
  length: "Length (feet)",
  cabins: "Cabins",
  passenger_density: "Passenger Density (GT / Passenger)",
  crew: "Crew",
};

//TODO: Redo the typing of this component to avoid all of the type casting
export const CruiseLineSummary = ({ ships }: CruiseLineSummaryProps) => {
  const [selectedValue, setSelectedValue] = useState<val_options>("tonnage");
  const [mode, setMode] = useState("average");
  const data = useMemo(() => {
    if (!ships) {
      return [];
    }
    const shipData = ships.reduce((acc: Record<string, any>, ship) => {
      if (acc[ship.line]) {
        acc[ship.line].value += ship[selectedValue as keyof CruiseShip];
        acc[ship.line].count++;
      } else {
        acc[ship.line] = {
          value: ship[selectedValue as keyof CruiseShip],
          count: 1,
          name: formatString(ship.line),
        };
      }
      return acc;
    }, {});

    if (mode == "average") {
      for (const line in shipData) {
        shipData[line].value = shipData[line].value / shipData[line].count;
      }
    }
    return Object.values(shipData);
  }, [ships, selectedValue, mode]);

  return data ? (
    <div className="mx-auto h-[700px] w-full">
      <div className="flex space-x-4">
        <Dropdown
          label="Value"
          options={val_opts as string[]}
          onSelect={(o) => setSelectedValue(o)}
          currVal={selectedValue as string}
        />
        <Dropdown
          label="Mode"
          options={["average", "total"]}
          onSelect={(o) => setMode(o)}
          currVal={mode}
        />
      </div>
      <ResponsiveContainer>
        <BarChart
          data={data}
          responsive
          margin={{ top: 20, right: 20, bottom: 150, left: 80 }}
        >
          <Bar dataKey="value" fill="#3B82F6" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            label={{ value: "Cruise Line", position: "bottom", offset: 80 }}
          />
          <YAxis
            label={{
              value: opt_display[selectedValue as keyof OptDisplay] as string,
              angle: -90,
              position: "insideLeft",
              offset: -10,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <span>No Data Available</span>
  );
};

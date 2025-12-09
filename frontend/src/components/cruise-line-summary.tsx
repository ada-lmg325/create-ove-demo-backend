import { CruiseShip } from "@/interfaces/cruise-ship";
import { FilterOptions } from "@/interfaces/filter";
import { CruiseLineQuantitySummary } from "./cruise-line-quantity-summary";

export type CruiseLineSummaryProps = {
  ships: CruiseShip[];
  ranges: FilterOptions;
};
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
export const CruiseLineSummary = ({
  ships,
  ranges,
}: CruiseLineSummaryProps) => {
  return ships && ranges ? (
    <div>
      <CruiseLineQuantitySummary
        selectedQuantity="age"
        ships={ships}
        max={ranges.max_age}
        units="years"
      />
      <CruiseLineQuantitySummary
        selectedQuantity="tonnage"
        ships={ships}
        max={ranges.max_tonnage}
        units="GT"
      />
      <CruiseLineQuantitySummary
        selectedQuantity="passengers"
        ships={ships}
        max={ranges.max_passengers}
      />
      <CruiseLineQuantitySummary
        selectedQuantity="length"
        ships={ships}
        max={ranges.max_length}
        units="feet"
      />
      <CruiseLineQuantitySummary
        selectedQuantity="cabins"
        ships={ships}
        max={ranges.max_cabins}
      />
      <CruiseLineQuantitySummary
        selectedQuantity="passenger_density"
        ships={ships}
        max={ranges.max_passenger_density}
        units="GT/Pass"
      />
      <CruiseLineQuantitySummary
        selectedQuantity="crew"
        ships={ships}
        max={ranges.max_crew}
      />
    </div>
  ) : (
    <></>
  );
};

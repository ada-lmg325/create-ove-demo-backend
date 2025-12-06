import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCruiseShips } from "@/hooks/get-cruise-ships";
import { useState } from "react";
import { CruiseLineSummary } from "./cruise-line-summary";
import { CruiseShipTable } from "./cruise-ship-table";
import { Filters } from "./filters";

export const CruiseShipPage = () => {
  const [filterState, setFilterState] = useState<{
    line: string | null;
    min_tonnage: number | null;
    max_tonnage: number | null;
    min_age: number | null;
    max_age: number | null;
    min_crew: number | null;
    max_crew: number | null;
    min_length: number | null;
    max_length: number | null;
    min_passengers: number | null;
    max_passengers: number | null;
    min_passenger_density: number | null;
    max_passenger_density: number | null;
  }>({
    line: null,
    min_tonnage: null,
    max_tonnage: null,
    min_age: null,
    max_age: null,
    min_crew: null,
    max_crew: null,
    min_length: null,
    max_length: null,
    min_passengers: null,
    max_passengers: null,
    min_passenger_density: null,
    max_passenger_density: null,
  });

  const { data: ships, loading } = getCruiseShips("/ships", filterState);

  return !loading && ships ? (
    <div className="flex w-full flex-col gap-6 bg-white text-black">
      <h1 className="text-4xl font-bold tracking-tight">Cruise Ships</h1>
      <Filters
        data={ships}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <Tabs defaultValue="directory">
        <TabsList>
          <TabsTrigger value="directory">Cruise Ship Directory</TabsTrigger>
          <TabsTrigger value="lines">Cruise Lines</TabsTrigger>
        </TabsList>
        <TabsContent value="directory">
          <CruiseShipTable ships={ships} />
        </TabsContent>
        <TabsContent value="lines">
          <CruiseLineSummary ships={ships} />
        </TabsContent>
      </Tabs>
    </div>
  ) : (
    <div>
      <span>No Data Available</span>
    </div>
  );
};

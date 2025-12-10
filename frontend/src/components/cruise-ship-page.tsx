import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCruiseShips } from "@/hooks/get-cruise-ships";
import { FilterState } from "@/interfaces/filter";
import { getDefaultFilterState } from "@/utils/filters";
import { useState } from "react";
import { CruiseLineSummary } from "./cruise-line-summary";
import { CruiseLineSummaryGraph } from "./cruise-line-summary-graph";
import { CruiseShipTable } from "./cruise-ship-table";
import { Filters } from "./filters";
export const CruiseShipPage = () => {
  const [filterState, setFilterState] = useState<FilterState>(
    getDefaultFilterState()
  );

  const { data } = getCruiseShips("/ships", filterState);

  return (
    <div className="flex w-full flex-col gap-6 bg-white p-6 text-black">
      <h1 className="text-4xl font-bold tracking-tight">Cruise Ships</h1>
      <div className="flex w-full flex-row">
        <div className="w-1/5 text-black">
          <Filters
            filterOptions={data?.meta?.filters}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </div>
        <div className="flex-1 text-black">
          <Tabs defaultValue="directory">
            <TabsList>
              <TabsTrigger value="directory">Cruise Ship Directory</TabsTrigger>
              <TabsTrigger value="lines">Cruise Line Data</TabsTrigger>
              <TabsTrigger value="lines-dashboard">
                Cruise Line Summary
              </TabsTrigger>
            </TabsList>
            <TabsContent value="directory">
              <CruiseShipTable ships={data?.ships} />
            </TabsContent>
            <TabsContent value="lines">
              <CruiseLineSummaryGraph ships={data?.ships} />
            </TabsContent>
            <TabsContent value="lines-dashboard">
              <CruiseLineSummary
                ships={data?.ships}
                ranges={data?.meta?.filters}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

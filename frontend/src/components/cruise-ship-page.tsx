import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCruiseShips } from "@/hooks/get-cruise-ships";
import { CruiseLineSummary } from "./cruise-line-summary";
import { CruiseShipTable } from "./cruise-ship-table";

export const CruiseShipPage = () => {
  const { data: ships, loading } = getCruiseShips("/ships");
  return !loading && ships ? (
    <div className="flex w-full flex-col gap-6 bg-white text-black">
      <h1 className="text-4xl font-bold tracking-tight">Cruise Ships</h1>
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

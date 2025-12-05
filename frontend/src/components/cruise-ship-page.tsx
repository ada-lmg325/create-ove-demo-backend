import { getData } from "@/hooks/get-data";
import { CruiseShipTable } from "./cruise-ship-table";

export const CruiseShipPage = () => {
  const { data: ships, loading } = getData("/ships");
  return !loading && ships ? (
    <>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">
        Cruise Ship Directory
      </h2>
      <CruiseShipTable ships={ships} />
    </>
  ) : (
    <></>
  );
};

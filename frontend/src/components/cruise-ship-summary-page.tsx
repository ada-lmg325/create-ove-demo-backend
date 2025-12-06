import { getCruiseShips } from "@/hooks/get-cruise-ships";
import { useNavigate } from "@tanstack/react-router";
import { Ranking } from "./ranking";
import { Button } from "./ui/button";

export type CruiseShipSummaryPageProps = {
  id: string;
};

export function CruiseShipSummaryPage({ id }: CruiseShipSummaryPageProps) {
  const { data: cruiseShip } = getCruiseShips(`/ships/${id}`);

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate({ to: "/" });
  };
  return cruiseShip ? (
    <div className="bg-white p-4 text-black">
      <div className="flex w-full items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Ship Name: {cruiseShip.name}
          </h1>
          <h2 className="mt-2 text-lg font-medium text-gray-300">
            Cruise Line: {cruiseShip.line}
          </h2>
        </div>
        <Button onClick={handleNavigateHome}>Home</Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <Ranking
            label={`Age: ${cruiseShip.age} years old`}
            rank={cruiseShip.meta.rank.age}
            total={cruiseShip.meta.total}
          />
          <Ranking
            label={`Tonnage: ${cruiseShip.tonnage} tonnes`}
            rank={cruiseShip.meta.rank.tonnage}
            total={cruiseShip.meta.total}
          />
          <Ranking
            label={`Passengers: ${cruiseShip.passengers}`}
            rank={cruiseShip.meta.rank.passengers}
            total={cruiseShip.meta.total}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Ranking
            label={`Cabins: ${cruiseShip.cabins}`}
            rank={cruiseShip.meta.rank.cabins}
            total={cruiseShip.meta.total}
          />
          {/* TODO: Determine units here */}
          <Ranking
            label={`Passenger Density: ${cruiseShip.passenger_density}`}
            rank={cruiseShip.meta.rank.passenger_density}
            total={cruiseShip.meta.total}
          />
          <Ranking
            label={`Crew: ${cruiseShip.crew} crew members`}
            rank={cruiseShip.meta.rank.crew}
            total={cruiseShip.meta.total}
          />
          <div className="grid grid-cols-1 gap-4">
            <Ranking
              label={`Length: ${cruiseShip.length} feet`}
              rank={cruiseShip.meta.rank.length}
              total={cruiseShip.meta.total}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    //   </DialogContent>
    // </Dialog>
    <></>
  );
}

import { getCruiseShips } from "@/hooks/get-cruise-ships";
import { numberFormatter } from "@/utils/number-formatter";
import { formatString } from "@/utils/string-formatter";
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
        <div className="m-1">
          <h1 className="text-4xl font-bold tracking-tight">
            Ship Name: {cruiseShip.name}
          </h1>
          <h2 className="mt-1 text-lg font-medium text-gray-300">
            Cruise Line: {formatString(cruiseShip.line)}
          </h2>
        </div>
        <Button onClick={handleNavigateHome}>Home</Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <Ranking
            label={`Age: ${numberFormatter(cruiseShip.age)} years old`}
            rank={cruiseShip.meta.rank.age}
            total={cruiseShip.meta.total}
            ascending
          />
          <Ranking
            label={`Tonnage: ${numberFormatter(cruiseShip.tonnage)} GT`}
            rank={cruiseShip.meta.rank.tonnage}
            total={cruiseShip.meta.total}
          />
          <Ranking
            label={`Passengers: ${numberFormatter(cruiseShip.passengers)}`}
            rank={cruiseShip.meta.rank.passengers}
            total={cruiseShip.meta.total}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Ranking
            label={`Cabins: ${numberFormatter(cruiseShip.cabins)}`}
            rank={cruiseShip.meta.rank.cabins}
            total={cruiseShip.meta.total}
          />
          <Ranking
            label={`Passenger Density: ${numberFormatter(cruiseShip.passenger_density)} GT/ Passenger`}
            rank={cruiseShip.meta.rank.passenger_density}
            total={cruiseShip.meta.total}
          />
          <Ranking
            label={`Crew: ${numberFormatter(cruiseShip.crew)} crew members`}
            rank={cruiseShip.meta.rank.crew}
            total={cruiseShip.meta.total}
          />
          <div className="grid grid-cols-1 gap-4">
            <Ranking
              label={`Length: ${numberFormatter(cruiseShip.length)} feet`}
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

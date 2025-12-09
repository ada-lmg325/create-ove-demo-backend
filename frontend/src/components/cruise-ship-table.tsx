import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CruiseShip } from "@/interfaces/cruise-ship";
import { numberFormatter } from "@/utils/number-formatter";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";

export type CruiseShipTableProps = {
  ships: CruiseShip[];
  pageSize?: number;
};
export function CruiseShipTable({
  ships,
  pageSize = 10,
}: CruiseShipTableProps) {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate({ to: "/ship/$id", params: { id: id.toString() } });
  };

  const totalPages = useMemo(
    () => Math.ceil(ships?.length / pageSize),
    [ships, pageSize]
  );

  const paginatedShips = useMemo(
    () => (ships ?? []).slice((page - 1) * pageSize, page * pageSize),
    [ships, page, pageSize]
  );

  useEffect(() => {
    setPage(1);
  }, [ships]);

  return paginatedShips ? (
    <>
      <Table>
        <TableCaption>Cruise Ship Directory</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Name</TableHead>
            <TableHead className="text-black">Line</TableHead>
            <TableHead className="text-black">Crew</TableHead>
            <TableHead className="text-black">Length (feet)</TableHead>
            <TableHead className="text-black">Cabins</TableHead>
            <TableHead className="text-black">Age (years)</TableHead>
            <TableHead className="text-black">
              Passenger Density (GT / Pass)
            </TableHead>
            <TableHead className="text-black">Passengers</TableHead>
            <TableHead className="text-black">Tonnage (GT)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedShips.map((ship: any) => (
            <TableRow key={ship.id}>
              <TableCell>{ship.name}</TableCell>
              <TableCell>{ship.line}</TableCell>
              <TableCell>{numberFormatter(ship.crew)}</TableCell>
              <TableCell>{numberFormatter(ship.length)}</TableCell>
              <TableCell>{numberFormatter(ship.cabins)}</TableCell>
              <TableCell>{numberFormatter(ship.age)}</TableCell>
              <TableCell>{numberFormatter(ship.passenger_density)}</TableCell>
              <TableCell>{numberFormatter(ship.passengers)}</TableCell>
              <TableCell>{numberFormatter(ship.tonnage)}</TableCell>
              <TableCell>
                {
                  <Button onClick={() => handleNavigate(ship.id)}>
                    View Details
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </>
  ) : (
    <span>No Data Available</span>
  );
}

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
import { getData } from "@/service-functions/get-data";
import { useEffect, useMemo, useState } from "react";
import { CruiseShipModal } from "./cruise-ship-modal";
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
  const [selectedShip, setSelectedShip] = useState<CruiseShip | undefined>();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();

  //TODO: Extract into custom hook
  useEffect(() => {
    if (selectedId) {
      getData(`/ships/${selectedId}`).then((res) => {
        console.log(res);
        setSelectedShip(res.data);
      });
    }
  }, [selectedId]);

  const totalPages = useMemo(
    () => Math.ceil(ships.length / pageSize),
    [ships, pageSize]
  );

  const paginatedShips = useMemo(
    () => ships.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize]
  );
  return (
    <>
      <CruiseShipModal
        open={open}
        setOpen={setOpen}
        cruiseShip={selectedShip}
      />
      <Table>
        <TableCaption>Cruise Ship Directory</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Line</TableHead>
            <TableHead>Crew</TableHead>
            <TableHead>Length</TableHead>
            <TableHead>Cabins</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Passenger Density</TableHead>
            <TableHead>Passengers</TableHead>
            <TableHead>Tonnage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedShips.map((ship: any) => (
            <TableRow key={ship.id}>
              <TableCell>{ship.name}</TableCell>
              <TableCell>{ship.line}</TableCell>
              <TableCell>{ship.crew}</TableCell>
              <TableCell>{ship.length}</TableCell>
              <TableCell>{ship.cabins}</TableCell>
              <TableCell>{ship.age}</TableCell>
              <TableCell>{ship.passenger_density}</TableCell>
              <TableCell>{ship.passengers}</TableCell>
              <TableCell>{ship.tonnage}</TableCell>
              <TableCell>
                {
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setSelectedId(ship.id);
                    }}
                  >
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
  );
}

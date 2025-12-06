import type { RootRoute } from "@tanstack/react-router";
import { createRoute, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import { CruiseShipSummaryPage } from "@/components/cruise-ship-summary-page";
import { socket } from "@/lib/sockets";

export const ShipPage = () => {
  const { id } = useParams({ strict: false });
  useEffect(() => {
    socket.connect();
    return () => void socket.disconnect();
  }, []);

  return id ? (
    <main className="min-h-screen w-screen overflow-auto bg-[#080929]">
      <CruiseShipSummaryPage id={id} />
    </main>
  ) : (
    <></>
  );
};

const ShipRoute = <A, B, C, D, E, F extends Record<string, never>, G, H>(
  parentRoute: RootRoute<A, B, C, D, E, F, G, H>
) =>
  createRoute({
    path: "/ship/$id",
    component: ShipPage,
    getParentRoute: () => parentRoute,
  });

export default ShipRoute;

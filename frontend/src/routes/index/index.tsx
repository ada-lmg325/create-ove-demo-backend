import type { RootRoute } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

import { socket } from "@/lib/sockets";
import { CruiseShipPage } from "@/components/cruise-ship-page";

export const IndexPage = () => {
  useEffect(() => {
    socket.connect();
    return () => void socket.disconnect();
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#080929]">
      <CruiseShipPage/>
    </main>
  );
};

const IndexRoute = <A, B, C, D, E, F extends Record<string, never>, G, H>(
  parentRoute: RootRoute<A, B, C, D, E, F, G, H>
) =>
  createRoute({
    path: "/",
    component: IndexPage,
    getParentRoute: () => parentRoute,
  });

export default IndexRoute;

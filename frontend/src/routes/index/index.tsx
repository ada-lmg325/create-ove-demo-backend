import type { RootRoute } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { CruiseShipPage } from "@/components/cruise-ship-page";
import { socket } from "@/lib/sockets";

export const IndexPage = () => {
  useEffect(() => {
    socket.connect();
    return () => void socket.disconnect();
  }, []);

  return (
    <main className="min-h-screen w-screen overflow-auto bg-[#080929]">
      <CruiseShipPage />
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

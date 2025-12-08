import { env } from "@/env";
import axios from "axios";

export async function getData(route: string, params: Record<string, any>) {
  return axios.get(env.VITE_SOCKET_SERVER + "/api/v1" + route, {
    params,
  });
}

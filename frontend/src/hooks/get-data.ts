import { env } from "@/env.ts";
import axios from "axios";
import { useEffect, useState } from "react";

export const getData = (route: string) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    setLoading(true);
    axios
      .get(env.VITE_SOCKET_SERVER + "/api/v1" + route)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [route]);

  return { data, loading };
};

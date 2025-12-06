import { getData } from "@/service-functions/get-data";
import { useEffect, useState } from "react";

export const getCruiseShips = (route: string) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    setLoading(true);
    getData(route)
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

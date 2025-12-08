import { getData } from "@/service-functions/get-data";
import { useEffect, useState } from "react";

export const getCruiseShips = (route: string, params?: Record<string, any>) => {
  console.log(params);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    setLoading(true);
    getData(route, handleParams(params))
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [route, params]);

  return { data, loading };
};

const handleParams = (original?: Record<string, any>) => {
  if (original) {
    return Object.fromEntries(
      Object.entries(original).filter(([_, value]) => value !== null)
    );
  } else {
    return {};
  }
};

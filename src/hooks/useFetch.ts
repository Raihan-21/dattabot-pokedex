import axiosInstance from "@/axios";
import React, { useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetch = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(url);
      setData(res.data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    fetch,
    data,
    isLoading,
    error,
  };
};

export default useFetch;

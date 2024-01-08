import React, { useEffect } from "react";
import Card from "../molecules/Card";
import useFetch from "@/hooks/useFetch";

const Detail = ({
  data,
  isLoading,
  onClose,
}: {
  data: any;
  isLoading: boolean;
  onClose: () => void;
}) => {
  //   const { fetch, data, isLoading } = useFetch(`/pokemon/${id}`);
  //   useEffect(() => {
  //     fetch();
  //   }, []);

  return (
    <div className="sticky top-0 bottom-0 h-screen w-full flex justify-center items-center py-10 px-4">
      <div
        className="absolute h-full w-full bg-black opacity-70"
        onClick={onClose}
      ></div>
      <Card data={data} isLoading={isLoading} onClose={onClose} />
    </div>
  );
};

export default Detail;

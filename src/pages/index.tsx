import Image from "next/image";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState, useRef } from "react";
import Observer from "@/components/organisms/Observer";
import axiosInstance from "@/axios";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/molecules/Loader";
import ListItem from "@/components/molecules/Listitem";
import Detail from "@/components/organisms/Detail";
import axios from "axios";
import Topbar from "@/components/molecules/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const res = await axiosInstance.get("/pokemon?limit=10");
  console.log(res.data);

  return {
    props: { responseData: res.data },
  };
};

export default function Home({ responseData }: { responseData: any }) {
  /**
   *
   * States
   *
   */
  const [isInitialLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [dataList, setDataList] = useState<any[]>([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(10);

  const { fetch, data, isLoading } = useFetch(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  const observerRef = useRef<any>(null);

  /**
   *
   * Functions
   *
   */

  const fetchData = useCallback(async () => {
    setOffset(offset + 10);
    try {
      await fetch();
    } catch (error) {}
  }, [data, offset, isLoading]);
  const getDetail = useCallback(async (url: string) => {
    setIsSelected(true);
    setIsDetailLoading(true);
    try {
      const res = await axios.get(url);
      setDetailData(res.data);
      console.log(res.data);
    } catch (error) {
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  /**
   *
   * useEffects
   *
   */

  useEffect(() => {
    setDataList(responseData.results);
    // setresponseData
  }, [responseData]);

  useEffect(() => {
    if (data) setDataList((prevState) => [...prevState, ...data!.results]);
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });
    observer.observe(observerRef.current);
    return () => {
      observer.unobserve(observerRef.current);
    };
  }, [observerRef]);

  return (
    <div>
      <Topbar />
      <div
        className={`flex h-full flex-col items-center justify-between ${inter.className}`}
      >
        <div className="overflow-y space-y-4 p-24">
          {dataList.length &&
            dataList.map((data: any, i) => (
              <ListItem
                name={data.name}
                onClick={() => {
                  getDetail(data.url);
                }}
                key={i}
              />
            ))}
        </div>
        {isSelected && (
          <Detail
            data={detailData}
            isLoading={isDetailLoading}
            onClose={() => {
              setIsSelected(false);
            }}
          />
        )}
        <div ref={observerRef}> {isLoading && <Loader />}</div>
      </div>
    </div>
  );
}

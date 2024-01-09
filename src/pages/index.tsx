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

  // Client side fetch data funtion
  const fetchData = async () => {
    setOffset((prevState) => prevState + 10);
    try {
      await fetch();
    } catch (error) {}
  };

  // Get detail function
  const getDetail = useCallback(async (url: string) => {
    setIsSelected(true);
    setIsDetailLoading(true);
    try {
      const res = await axios.get(url);
      setDetailData(res.data);
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

  //Assign SSR data to client side state
  useEffect(() => {
    setDataList(responseData.results);
    // setresponseData
  }, [responseData]);

  // Update data list everytime usefetch is called
  useEffect(() => {
    if (data) setDataList((prevState) => [...prevState, ...data!.results]);
  }, [data]);

  // Create intersection observer instance for infinite scroll
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
  }, [observerRef, offset]);

  return (
    <div>
      <Topbar />
      <div
        className={`flex h-full flex-col items-center justify-between ${inter.className}`}
      >
        <div className="overflow-y space-y-4 pt-[100px] w-full max-w-[500px]">
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

import Image from "next/image";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import Observer from "@/components/organisms/Observer";
import axiosInstance from "@/axios";
import useFetch from "@/hooks/useFetch";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const res = await axiosInstance.get("/pokemon?limit=10");
  console.log(res.data);

  return {
    props: { datas: res.data },
  };
};

export default function Home({ datas }: { datas: any }) {
  const [isInitialLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { fetch, data, isLoading } = useFetch(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  const fetchData = useCallback(async () => {
    setOffset(offset + 10);
    try {
      await fetch();
      console.log(data);
    } catch (error) {}
  }, [data, offset, isLoading]);

  useEffect(() => {
    // setdatas
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <button onClick={fetchData}>load pokemon</button>
      {datas.results.length &&
        datas.results.map((data: any) => <div>{data.name}</div>)}
      <Observer isLoading={isInitialLoading} />
    </main>
  );
}

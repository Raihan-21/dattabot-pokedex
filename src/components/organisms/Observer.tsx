import React, { useEffect, useRef } from "react";
import Loader from "../molecules/Loader";

const Observer = ({ isLoading }: { isLoading: boolean }) => {
  const observerRef = useRef<any>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries[0].isIntersecting);
    });
    observer.observe(observerRef.current);
    return () => {
      observer.unobserve(observerRef.current);
    };
  }, [observerRef]);

  return <div ref={observerRef}>{isLoading && <Loader />}</div>;
};

export default Observer;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Loader = () => (
  <div className="loader fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex items-center justify-center bg-black/40">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
  </div>
);

export default function RouteLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading ? <Loader /> : null;
}

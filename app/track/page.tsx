"use client";

import { ImageUpload } from "@/components/FileUpload";

import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";
import Loading from "@/components/ui/loading";
import { useDeliveryTracker } from "@/hooks/useDeliveryTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeliveryTrackingResult } from "@/components/DeliveryTrackingResult";
import LiveBarcodeScan from "@/components/LiveBarcodeScan";
export default function Home() {
  const [trackingNumber, settrackingNumber] = useState("");
  const { data, error, loading, fetchData, retry } = useDeliveryTracker();

  const placeholders = [
    "Enter your tracking number here",
    "It's something like LD1234567890MA",
    "Did you find it ?",
    "Look at the top of Amana delivery reciept",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settrackingNumber(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      fetchData(trackingNumber);
    }, 1000);
  };
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-full max-w-[100%] min-h-[80vh] font-[family-name:var(--font-geist-sans)]">
        <main className="flex md:w-full max-w-[100%] gap-8 row-start-2 justify-center">
          <Tabs defaultValue="tracking_number" className="md:w-[50%] min-h-64">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tracking_number">Tracking Number</TabsTrigger>
              <TabsTrigger value="image">Image Upload</TabsTrigger>
              <TabsTrigger value="live_scan">Live Scan</TabsTrigger>
            </TabsList>
            <TabsContent value="tracking_number">
              <div className="flex flex-col justify-center items-center min-h-96 border border-dashed bg-neutral-50 dark:bg-neutral-700/10 border-neutral-200 dark:border-neutral-800 rounded-lg backdrop-blur-md">
                {!loading && !data && !error && (
                  <div className="flex justify-center items-center p-0 h-full">
                    <div className="h-full flex flex-col items-center w-[30rem]">
                      <h2 className="mb-5 text-xl text-center sm:text-2xl dark:text-white text-black">
                        Use Your Tracking Number
                      </h2>
                      <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                      />
                    </div>
                  </div>
                )}
                {loading && !data && !error ? (
                  <div className="flex justify-center w-full items-center h-full">
                    <Loading />
                  </div>
                ) : !loading && !data && error ? (
                  <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-center text-red-500">{error}</p>
                    <Button onClick={() => retry()}>Retry</Button>
                  </div>
                ) : data && !loading && !error ? (
                  <div className="flex flex-col gap-3 justify-center items-center h-full w-[80%]">
                   <DeliveryTrackingResult data={data} />
                  </div>
                ) : null}
              </div>
            </TabsContent>
            <TabsContent value="image">
              <ImageUpload />
            </TabsContent>
            <TabsContent value="live_scan">
             <LiveBarcodeScan />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}

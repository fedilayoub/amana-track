"use client";
import React, { useEffect, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import Image from "next/image";
import { useBarcodeReader } from "@/hooks/useBarcodeReader";
import { Button } from "./ui/button";
import { useDeliveryTracker } from "@/hooks/useDeliveryTracker";
import { DeliveryTrackingResult } from "./DeliveryTrackingResult";
import Loading from "./ui/loading";
import { Package } from "lucide-react";

export function ImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { barcode, getBarcode } = useBarcodeReader();
  const { data, error, loading, fetchData, retry } = useDeliveryTracker();

  useEffect(() => {
    if (barcode) {
      fetchData(barcode);
    }
  }, [barcode]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    if (files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (event.target?.result) {
          const base64Data = event.target.result as string;
          setImageSrc(base64Data);
        }
      };
      fileReader.readAsDataURL(files[0]);
    }
  };
  const trackDelivery = () => {
    getBarcode(imageSrc!);
  };
  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-neutral-50 dark:bg-neutral-700/10 border-neutral-200 dark:border-neutral-800 rounded-lg backdrop-blur-md">
      {!data && !loading && !error && (
        <div className="flex h-full items-center justify-center">
          <FileUpload onChange={handleFileUpload} />
          {imageSrc && (
            <>
              <div className="w-full flex flex-col justify-center rounded-xl">
                <Image
                  id="scanner_container"
                  src={imageSrc}
                  alt="Uploaded file"
                  width={400}
                  height={300}
                  className="rounded-xl mb-2"
                />
                <p className="text-xs text-center text-neutral-700 dark:text-white">
                  {files[0].name}
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {imageSrc && !data && !loading && !error && (
        <div className="flex w-full justify-center">
          <Button variant={"outline"} onClick={trackDelivery} className="mb-5">
            <Package className="mr-2" />
            Track Delivery
          </Button>
        </div>
      )}

      {loading && !data && !error ? (
        <Loading />
      ) : !loading && !data && error ? (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <p className="text-center text-red-500">{error}</p>
          <Button onClick={() => retry()}>Retry</Button>
        </div>
      ) : data && !loading && !error ? (
        <div className="flex flex-col gap-3 justify-center items-center h-full w-full px-5 py-5">
          <DeliveryTrackingResult data={data} />
        </div>
      ) : null}
    </div>
  );
}

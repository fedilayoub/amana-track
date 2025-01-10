import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useBarcodeReader } from "@/hooks/useBarcodeReader";
import { DeliveryTrackingResult } from "./DeliveryTrackingResult";
import Loading from "./ui/loading";
import { useDeliveryTracker } from "@/hooks/useDeliveryTracker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Camera, RefreshCcw, Scan } from "lucide-react";

const SimpleBarcodeScanner = () => {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [foundBarcode, setFoundBarcode] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const { getBarcode, barcode } = useBarcodeReader();
  const {
    data,
    error: deliveryError,
    loading,
    fetchData,
    retry,
  } = useDeliveryTracker();

  // Start video stream
  const startVideo = async () => {
    setIsVideoLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsVideoActive(true);
          setIsVideoLoading(false);
          setError(null);
        };
      }
    } catch (err) {
      setError("Failed to access camera: " + err.message);
      setIsVideoLoading(false);
    }
  };

  // Stop video stream
  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsVideoActive(false);
  };

  // Capture screenshot and process barcode
  const captureImage = async () => {
    if (!videoRef.current) return;

    try {
      // Create canvas and draw video frame
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);

      // Get base64 image data
      const base64Data = canvas.toDataURL("image/png", 1);
      setCapturedImage(base64Data);
      stopVideo();

      // Process barcode
      try {
        await getBarcode(base64Data);
        if (barcode) {
          setFoundBarcode(barcode);
          console.log("detectedBarcode", detectedBarcode);

          setCapturedImage(null); // Hide image once barcode is detected
        } else {
          setError("No barcode detected");
        }
      } catch (err) {
        setError("Failed to process barcode: " + err.message);
      }
    } catch (err) {
      setError("Failed to capture image: " + err.message);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  useEffect(() => {
    if (barcode) {
      fetchData(barcode);
    }
  }, [barcode]);
  return (
    <>
      {!data && !loading && !deliveryError && (
        <div className="flex flex-col w-full h-full p-16 gap-3 min-h-40 justify-center items-center border border-dashed bg-neutral-50 dark:bg-neutral-700/10 border-neutral-200 dark:border-neutral-800 rounded-lg backdrop-blur-md">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="text-left text-neutral-600 dark:text-neutral-100">
                Click &quot;Start Scanning&quot; to activate your camera, then hold your
                barcode in front of the camera and click &quot;Capture Barcode&quot;.
              </p>
            </AlertDescription>
          </Alert>

          {/* Video feed */}
          {(isVideoActive || isVideoLoading) &&
            !capturedImage &&
            !foundBarcode && (
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                    Loading camera...
                  </div>
                )}
              </div>
            )}

          {/* Captured image */}
          {capturedImage && !foundBarcode && (
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={capturedImage}
                alt="Captured"
                id="#scanner_container"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="w-full p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Control buttons */}
          <div className="flex justify-center gap-4 h-12">
            {!isVideoActive &&
              !isVideoLoading &&
              !capturedImage &&
              !foundBarcode && (
                <Button variant={"outline"} onClick={startVideo}>
                  <Camera className="h-4 w-4 mr-1" />
                  Start Scanning
                </Button>
              )}

            {isVideoActive &&
              !isVideoLoading &&
              !capturedImage &&
              !foundBarcode && (
                <Button variant={"outline"} onClick={captureImage}>
                  <Scan className="h-4 w-4 mr-1" />
                  Capture Barcode
                </Button>
              )}

            {(capturedImage || foundBarcode || error) && (
              <Button
                variant={"outline"}
                onClick={() => {
                  setIsVideoActive(false);
                  setCapturedImage(null);
                  setFoundBarcode(null);
                  setError(null);
                  startVideo();
                }}
              >
                <RefreshCcw className="h-4 w-4 mr-1" />
                Try Again
              </Button>
            )}
          </div>
        </div>
      )}
      {loading && !data && !deliveryError ? (
        <Loading />
      ) : !loading && !data && deliveryError ? (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <p className="text-center text-red-500">{deliveryError}</p>
          <Button onClick={() => retry()}>Retry</Button>
        </div>
      ) : data && !loading && !deliveryError ? (
        <div className="flex flex-col gap-3 justify-center items-center h-full w-full px-5 py-5">
          <DeliveryTrackingResult data={data} />
        </div>
      ) : null}
    </>
  );
};

export default SimpleBarcodeScanner;

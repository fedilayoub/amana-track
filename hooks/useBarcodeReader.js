import { useState } from "react";
import Quagga from "quagga";

export const useBarcodeReader = () => {
  const [barcode, setBarcode] = useState(null);
  const getBarcode = (data) => {
    try {
      Quagga.decodeSingle(
        {
          src: data,
          numOfWorkers: 0,
          inputStream: {
            type: "ImageStream",
            target: document.querySelector("#scanner_container"),
          },
          decoder: {
            readers: ["code_39_reader"],
          },
          locate: true,
          debug: {
            showCanvas: false,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true,
            boxFromPatches: {
              color: "red",
              lineWidth: 2,
            },
          },
        },
        (result) => {
          if (result?.codeResult) {
            console.log(result.codeResult.code);
            setBarcode(result.codeResult.code);
            return result.codeResult.code;
          } else {
            console.log("No barcode found");
            setBarcode(null);
            return null;
          }
        }
      );
    } catch (error) {
      console.error("Error initializing Quagga:", error);
    }
  };
  return { barcode, getBarcode };
};

"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableCaption,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeliveryData } from "@/hooks/useDeliveryTracker";
export const DeliveryTrackingResult = ({ data }: { data: DeliveryData }) => {
  return (
    <>
      {!data.not_found ? (
        <>
          <div className="flex items-center justify-between w-full px-5 py-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700">
                {/* Icon for departure */}
                <span role="img" aria-label="departure">
                  📍
                </span>
              </div>
              <div className="text-sm">
                <p className="text-gray-400">Departed From</p>
                {data?.departed_from}
              </div>
            </div>
            <div className="h-px bg-gray-600 flex-1 mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700">
                {/* Icon for destination */}
                <span role="img" aria-label="destination">
                  📍
                </span>
              </div>
              <div className="text-sm">
                <p className="text-gray-400">Destination</p>
                {data?.destination}
              </div>
            </div>
          </div>
          <Table>
            <TableCaption>Your delivery timeline</TableCaption>
            <TableHeader>
              <TableRow className="bg-neutral-300 dark:bg-neutral-500">
                <TableHead>Dilevered with</TableHead>
                <TableHead>Current Position</TableHead>
                <TableHead>CRBT AMOUNT</TableHead>
                <TableHead>Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {data?.productName}
                </TableCell>
                <TableCell>{data?.currentPosition}</TableCell>
                <TableCell>{data?.mttCrbt}</TableCell>
                <TableCell>{data?.weight}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex flex-col items-start px-4 w-[100%]">
            <ol className="relative border-s border-gray-200 dark:border-gray-700 w-full max-h-32 overflow-y-scroll custom-scrollbar">
              {data?.timelineInfos.map((info, index) => (
                <li key={index} className="mb-10 ms-4">
                  <span
                    className={
                      index === 0
                        ? "absolute flex h-3 w-3 -start-1.5 mt-1.5 "
                        : " hidden"
                    }
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-600"></span>
                  </span>
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {info.date} | {info.time}
                  </time>

                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {info.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : (
        <p className="text-center text-neutral-400 dark:text-white">
          Delivery not found
        </p>
      )}
    </>
  );
};

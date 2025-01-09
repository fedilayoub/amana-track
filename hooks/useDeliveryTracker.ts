import axios from 'axios';
import { useState } from 'react';

interface TimelineInfo {
  date: string;
  time: string;
  description: string;
}

export interface DeliveryData {
  productName: string;
  currentPosition: string;
  mttCrbt: string;
  weight: string;
  departed_from: string;
  destination: string;
  timelineInfos: TimelineInfo[];
  not_found: boolean;
}

export const useDeliveryTracker = () => {
  const [data, setData] = useState<DeliveryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
const retry = () => {
    setError(null)
    setData(null)
}
  const fetchData = async (trackingNumber: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/tracking/${trackingNumber}`
      );
      setData(response.data);
    } catch (error: any) {
      setError(error.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData,retry };
};

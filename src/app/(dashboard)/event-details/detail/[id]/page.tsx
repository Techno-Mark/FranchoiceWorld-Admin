"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { post } from "@/services/apiService";
import { eventDetails } from "@/services/endpoint/event-details";
import EventDetail from "./EventDetail";

const Page = ({ params }: { params: { id: string } }) => {
  const [eventDetail, seteventDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await post(eventDetails.getById, { eventId: params.id });
        if (response.ResponseStatus !== "success") {
          throw new Error("Failed to fetch data");
        }
        const data = await response;
        seteventDetail(data.ResponseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);
  return (
    <>
      <LoadingBackdrop isLoading={loading} />
      {!loading && eventDetail && <EventDetail eventDetails={eventDetail} />}
    </>
  );
};

export default Page;

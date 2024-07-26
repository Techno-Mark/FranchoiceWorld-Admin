"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { post } from "@/services/apiService";
import { brandList } from "@/services/endpoint/brandList";
import InvestorDetail from "./InvestorDetail";
import { investorList } from "@/services/endpoint/investorList";

const Page = ({ params }: { params: { id: string } }) => {
  const [investorDetail, setInvestorDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await post(investorList.getById, {
          investorId: params.id,
        });
        if (response.ResponseStatus !== "success") {
          throw new Error("Failed to fetch data");
        }
        const data = await response;
        setInvestorDetail(data.ResponseData);
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
      {!loading && investorDetail && (
        <InvestorDetail
          investorDetail={investorDetail}
          // open={EDIT_BLOG}
          // editingRow={editingRow}
          // handleClose={() => router.push("/content-management/blogs")}
        />
      )}
    </>
  );
};

export default Page;

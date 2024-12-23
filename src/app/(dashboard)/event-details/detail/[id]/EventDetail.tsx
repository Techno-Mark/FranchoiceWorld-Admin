"use client";

import { Box, Card, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PageProps = {
  eventDetails: any;
};

function EventDetail({ eventDetails: data }: PageProps) {
  const router = useRouter();
  const [countries, setCountries] = useState<Record<number, string>>({});
  const [states, setStates] = useState<Record<number, string>>({});
  const [cities, setCities] = useState<Record<number, string>>({});
  const [categories, setCategories] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/dropdown/countries`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/dropdown/categories`),
        ]);

        const countriesData = await countriesRes.json();
        const categoriesData = await categoriesRes.json();

        setCountries(
          countriesData.ResponseData.reduce(
            (
              acc: Record<number, string>,
              country: { id: number; name: string }
            ) => {
              acc[country.id] = country.name;
              return acc;
            },
            {}
          )
        );

        setCategories(
          categoriesData.ResponseData.reduce(
            (
              acc: Record<number, string>,
              category: { id: number; name: string }
            ) => {
              acc[category.id] = category.name;
              return acc;
            },
            {}
          )
        );

        if (data.country) {
          const statesRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/dropdown/states`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ countryId: Number(data.country) }),
            }
          );
          const statesData = await statesRes.json();

          setStates(
            statesData.ResponseData.reduce(
              (
                acc: Record<number, string>,
                state: { id: number; name: string }
              ) => {
                acc[state.id] = state.name;
                return acc;
              },
              {}
            )
          );
        }

        if (data.state) {
          const citiesRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/dropdown/cities`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ stateId: Number(data.state) }),
            }
          );
          const citiesData = await citiesRes.json();

          setCities(
            citiesData.ResponseData.reduce(
              (
                acc: Record<number, string>,
                city: { id: number; name: string }
              ) => {
                acc[city.id] = city.name;
                return acc;
              },
              {}
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data.country, data.state]);

  return (
    <Grid container spacing={6} alignItems={"flex-start"}>
      <Grid
        item
        xs={12}
        sm={8}
        display={"flex"}
        flexDirection={"column"}
        rowGap={6}
      >
        <Grid item xs={6} sm={11}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Event Details:{" "}
            </Typography>

            <div className="p-2 flex flex-col space-y-2 my-2">
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Event Name:{" "}
                </Typography>
                <Typography>{data.eventName || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Event Description:{" "}
                </Typography>
                <Typography>{data.eventDescription || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Event Category:{" "}
                </Typography>
                <Typography>
                  {categories[data.eventCategory] || "NA"}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Location:{" "}
                </Typography>
                <Typography>{data.location || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Country:{" "}
                </Typography>
                <Typography>{countries[data.country] || "NA"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  State:{" "}
                </Typography>
                <Typography>{states[data.state] || "NA"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  City:{" "}
                </Typography>
                <Typography>{cities[data.city] || "NA"}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Start Date:{" "}
                </Typography>
                <Typography>{data.startDate || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  End Date:{" "}
                </Typography>
                <Typography>{data.endDate || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Start Time:{" "}
                </Typography>
                <Typography>{data.startTime || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  End Time:{" "}
                </Typography>
                <Typography>{data.endTime || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Contact Info:{" "}
                </Typography>
                <Typography>{data.contactInfo || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Status:{" "}
                </Typography>
                <Typography>{data.status || "NA"} </Typography>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        display={"flex"}
        flexDirection={"column"}
        rowGap={4}
      >
        <Card className="p-2">
          <Typography variant="h5" className="underline">
            {" "}
            Event Images:{" "}
          </Typography>

          <div className="p-2 my-2">
            <table>
              <tr>
                <td>
                  {" "}
                  <Typography variant="h6"> Event Images: </Typography>
                </td>
                <td className="flex gap-x-2 gap-y-4 flex-wrap">
                  {data.brandImages?.length &&
                  Array.isArray(data.brandImages) &&
                  data.brandImages.length > 0
                    ? data.brandImages.map((path: string) => {
                        return (
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${path}`}
                            width={"350px"}
                            height={"200px"}
                            className="object-cover p-1 rounded-lg"
                          />
                        );
                      })
                    : "NA"}
                </td>
              </tr>
            </table>
            <div className="flex items-center space-x-2"></div>
          </div>
        </Card>
      </Grid>

      <Grid item xs={12} style={{ position: "sticky", bottom: 0, zIndex: 10 }}>
        <Box
          p={2}
          display="flex"
          gap={2}
          justifyContent="end"
          bgcolor="background.paper"
        >
          <button
            className="bg-[#17498a] text-white font-semibold py-2 px-4 mx-2 cursor-pointer rounded-lg shadow-md hover:bg-[#1d4981] transition-colors duration-300"
            onClick={() => router.push("/event-details")}
          >
            Back
          </button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EventDetail;

import { Card, Typography, Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import React from "react";

type pageProps = {
  brandDetails: any;
};

function BrandDetail({ brandDetails: data }: pageProps) {
  console.log(data.salesRevenueModel?.length);
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
              User Details:{" "}
            </Typography>

            <div className="p-2 flex flex-col space-y-2 my-2">
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Full Name:{" "}
                </Typography>
                <Typography>{data.fullName || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Email:{" "}
                </Typography>
                <Typography>{data.email || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Phone Number:{" "}
                </Typography>
                <Typography>
                  {data.countryCode + " " + data.phoneNumber}{" "}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Company Name:{" "}
                </Typography>
                <Typography>{data.companyName || "NA"} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Website URL:{" "}
                </Typography>
                <Typography>{data.websiteURL || "NA"} </Typography>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={11}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Franchise Details:{" "}
            </Typography>
            <table className="p-2">
              <tr>
                <td className="w-32">
                  <Typography variant="h6" className="w-40">
                    Franchise Fee:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.franchiseFee || "NA"} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">
                    {" "}
                    Sales and Revenue Model:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.salesRevenueModel &&
                    Array.isArray(data.salesRevenueModel) &&
                    data.salesRevenueModel.length > 0
                      ? data.salesRevenueModel.join(", ")
                      : "NA"}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    ROI:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.roi || "NA"}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Payback Period:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.paybackPeriodAssociation?.name || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Tenure Period:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.tenurePeriodAssociation?.name || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Support Provided: </Typography>
                </td>
                <td>
                  <Typography>
                    {data.supportProvided &&
                    Array.isArray(data.supportProvided) &&
                    data.supportProvided.length > 0
                      ? data.supportProvided.join(", ")
                      : " NA"}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Other Applicable:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.otherApplicable || "NA"} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Is Operating Manuals:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.isOperatingManuals?.toString() || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Is Assistance Available:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.isAssistanceAvailable?.toString() || "NA"}{" "}
                  </Typography>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Is Expert Guidance:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.isExpertGuidance?.toString() || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Is IT System Included:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.isITSystemIncluded?.toString() || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    Number of Locations{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.OutletAssociation?.name || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    Description{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.brandDescription || "NA"} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    USP{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.usp || "NA"} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Area Required </Typography>
                </td>
                <td>
                  <Typography>
                    {data.areaRequiredAssociation?.name || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Investment Range </Typography>
                </td>
                <td>
                  <Typography>
                    {data.investmentRangeAssociation?.range || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
            </table>
          </Card>
        </Grid>
        <Grid item xs={12} sm={11}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Brand Details:{" "}
            </Typography>
            <table className="p-2">
              <tr>
                <td className="w-40">
                  <Typography variant="h6"> Brand Name: </Typography>
                </td>
                <td>
                  <Typography>{data.brandName || "NA"} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Industry: </Typography>
                </td>
                <td>
                  <Typography>
                    {data.industryAssociation?.name || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Sub Category: </Typography>
                </td>
                <td>
                  <Typography>
                    {data.subCategoryAssociation?.name || "NA"}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Service: </Typography>
                </td>
                <td>
                  <Typography>
                    {data.serviceAssociation?.name || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">
                    {" "}
                    Business Commenced Year:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.businessCommencedYear || "NA"} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">
                    {" "}
                    Franchise Commenced Year:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.franchiseCommencedYear || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Headquarter: </Typography>
                </td>
                <td>
                  <Typography>
                    {data.headquartersLocationAssociation?.name || "NA"}{" "}
                  </Typography>
                </td>
              </tr>
            </table>
          </Card>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        display={"flex"}
        flexDirection={"column"}
        rowGap={6}
      >
        <Grid item xs={12} sm={10}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              State:{" "}
            </Typography>
            {data.state?.length &&
            Array.isArray(data.state) &&
            data.state.length > 0
              ? data.state?.map((name: string) => (
                  <ListItem>
                    <ListItemText primary={`${name}`} />
                  </ListItem>
                ))
              : "NA"}
          </Card>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              City:{" "}
            </Typography>
            {data.city?.length &&
            Array.isArray(data.city) &&
            data.city.length > 0
              ? data.city.map((name: string) => (
                  <ListItem>
                    <ListItemText primary={`${name}`} />
                  </ListItem>
                ))
              : "NA"}
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
            Brand Images:{" "}
          </Typography>

          <div className="p-2 my-2">
            <table>
              <tr>
                <td className="w-32">
                  {" "}
                  <Typography variant="h6"> Brochure Link: </Typography>
                </td>
                <td>
                  {" "}
                  {data.brochure ? (
                    <Typography>
                      {" "}
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.brochure}`}
                        target="_blank"
                        className="underline text-blue-500"
                      >
                        {" "}
                        Brochure Link{" "}
                      </Link>{" "}
                    </Typography>
                  ) : (
                    "NA"
                  )}
                </td>
              </tr>
              <tr>
                <td className="w-32">
                  {" "}
                  <Typography variant="h6">
                    {" "}
                    Franchise Aggrement File:{" "}
                  </Typography>
                </td>
                <td>
                  {" "}
                  {data.franchiseAggrementFile ? (
                    <Typography>
                      {" "}
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.franchiseAggrementFile}`}
                        target="_blank"
                        className="underline text-blue-500"
                      >
                        {" "}
                        Franchise Aggrement File Link{" "}
                      </Link>{" "}
                    </Typography>
                  ) : (
                    "NA"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Logo:</Typography>
                </td>
                <td>
                  {data.logo ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.logo}`}
                      width={"90px"}
                      height={"90px"}
                      className="object-cover border"
                    />
                  ) : (
                    "NA"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Video:</Typography>
                </td>
                <td>
                  {data.video ? (
                    <video
                      width="350"
                      height="200"
                      controls
                      className="border rounded-lg"
                    >
                      <source
                        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.video}`}
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    "NA"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Typography variant="h6"> Brand Images: </Typography>
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
    </Grid>
  );
}

export default BrandDetail;

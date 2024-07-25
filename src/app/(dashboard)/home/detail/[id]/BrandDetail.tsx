import {
  Card,
  Typography,
  Grid,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Tooltip,
  IconButton,
  Table,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import React from "react";

type pageProps = {
  brandDetails: any;
};

function BrandDetail({ brandDetails: data }: pageProps) {
  console.log(data);
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
                <Typography>{data.fullName} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Email:{" "}
                </Typography>
                <Typography>{data.email} </Typography>
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
                <Typography>{data.companyName} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Website URL:{" "}
                </Typography>
                <Typography>{data.websiteURL} </Typography>
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
                <td>
                  <Typography variant="h6" className="w-40">
                    Franchise Fee:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.franchiseFee} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">
                    {" "}
                    sales and revenue model:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.salesRevenueModel?.length &&
                      data.salesRevenueModel.join(", ")}{" "}
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
                  <Typography>{data.roi}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    paybackPeriod:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.paybackPeriod} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> supportProvided: </Typography>
                </td>
                <td>
                  <Typography>
                    {data.supportProvided?.length &&
                      data.supportProvided.join(", ")}{" "}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    otherApplicable:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.otherApplicable} </Typography>
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
                  <Typography>{data.numberOfLocations} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    Description{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.brandDescription} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    USP{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.usp} </Typography>
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
            <table>
              <tr>
                <td>
                  <Typography variant="h6"> brand Name: </Typography>
                </td>
                <td>
                  <Typography>{data.brandName} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Industry: </Typography>
                </td>
                <td>
                  <Typography>{data.industry} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Sub Category: </Typography>
                </td>
                <td>
                  <Typography>{data.subCategory}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Service: </Typography>
                </td>
                <td>
                  <Typography>{data.service} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> year Founded: </Typography>
                </td>
                <td>
                  <Typography>{data.yearFounded} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Headquarter: </Typography>
                </td>
                <td>
                  <Typography>{data.headquartersLocation} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> Number of Locations: </Typography>
                </td>
                <td>
                  <Typography>{data.numberOfLocations} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">Description: </Typography>
                </td>
                <td>
                  <Typography>{data.brandDescription} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6">USP: </Typography>
                </td>
                <td>
                  <Typography>{data.usp} </Typography>
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
              data.state?.map((name: string) => (
                <ListItem>
                  <ListItemText primary={`${name}`} />
                </ListItem>
              ))}
          </Card>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              City:{" "}
            </Typography>
            {data.city?.length &&
              data.city?.map((name: string) => (
                <ListItem>
                  <ListItemText primary={`${name}`} />
                </ListItem>
              ))}
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
            User Details:{" "}
          </Typography>

          <div className="p-2 flex flex-col space-y-2 my-2">
            <div className="flex items-center space-x-2">
              <Typography variant="h6" className="w-32">
                {" "}
                Brochure Link:{" "}
              </Typography>
              <Typography>
                {" "}
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.brochure}`}
                  target="_blank"
                >
                  {" "}
                  Brochure Link{" "}
                </Link>{" "}
              </Typography>
            </div>
          </div>
          <div>
            <Typography variant="h5"> Logo:</Typography>
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.logo}`}
              width={"350px"}
              height={"350px"}
              className="object-cover"
            />
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BrandDetail;

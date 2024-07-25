import { Card, Typography, Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

type pageProps = {
  brandDetails: any;
};

function BrandDetail({ brandDetails: data }: pageProps) {
  console.log(data);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={8} display={"flex"} flexDirection={"column"}>
        <Grid item xs={6} sm={8}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              User Details:{" "}
            </Typography>
            <div className="p-2 flex flex-col space-y-2 my-2">
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Full Name: </Typography>
                <Typography>{data.fullName} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Email: </Typography>
                <Typography>{data.email} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Phone Number: </Typography>
                <Typography>
                  {data.countryCode + " " + data.phoneNumber}{" "}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Company Name: </Typography>
                <Typography>{data.comapny} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Website URL: </Typography>
                <Typography>{data.websiteURL} </Typography>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Franchise Details:{" "}
            </Typography>
            <div className="p-2 flex flex-col space-y-2 my-2">
              <div className="flex items-center space-x-2">
                <Typography variant="h6">Franchise Fee: </Typography>
                <Typography>{data.franchiseFee} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> sales and revenue model: </Typography>
                <Typography>{data.salesRevenueModel?.[0]} </Typography>
                <Typography>{data.salesRevenueModel?.[1]} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> ROI: </Typography>
                <Typography>{data.roi}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> paybackPeriod: </Typography>
                <Typography>{data.paybackPeriod} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> supportProvided: </Typography>
                <Typography>{data.supportProvided.valueOf()} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> otherApplicable: </Typography>
                <Typography>{data.otherApplicable} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Number of Locations </Typography>
                <Typography>{data.numberOfLocations} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6">Description </Typography>
                <Typography>{data.brandDescription} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6">USP </Typography>
                <Typography>{data.usp} </Typography>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Brand Details:{" "}
            </Typography>
            <div className="p-2 flex flex-col space-y-2 my-2">
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> brand Name: </Typography>
                <Typography>{data.brandName} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Industry: </Typography>
                <Typography>{data.industry} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Sub Category: </Typography>
                <Typography>{data.subCategory}</Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Service: </Typography>
                <Typography>{data.service} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> year Founded: </Typography>
                <Typography>{data.yearFounded} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Headquarter: </Typography>
                <Typography>{data.headquartersLocation} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6"> Number of Locations </Typography>
                <Typography>{data.numberOfLocations} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6">Description </Typography>
                <Typography>{data.brandDescription} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6">USP </Typography>
                <Typography>{data.usp} </Typography>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Grid item xs={12} sm={10}>
          <Card>
            {data.state?.map((name: string) => (
              <ListItem>
                <ListItemText primary={`${name}`} />
              </ListItem>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Card>
            {data.city?.map((name: string) => (
              <ListItem>
                <ListItemText primary={`${name}`} />
              </ListItem>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BrandDetail;

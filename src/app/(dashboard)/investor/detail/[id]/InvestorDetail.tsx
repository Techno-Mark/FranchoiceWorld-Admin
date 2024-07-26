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
import React from "react";

type pageProps = {
  investorDetail: any;
};

function InvestorDetail({ investorDetail: data }: pageProps) {
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
                  address:{" "}
                </Typography>
                <Typography>{data.address} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  state:{" "}
                </Typography>
                <Typography>{data.state} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  city:{" "}
                </Typography>
                <Typography>{data.city} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  pincode:{" "}
                </Typography>
                <Typography>{data.pincode} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  Education Qualification:{" "}
                </Typography>
                <Typography>{data.educationQualification} </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography variant="h6" className="w-32">
                  {" "}
                  occupation:{" "}
                </Typography>
                <Typography>{data.occupation} </Typography>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={11}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Investor Details:{" "}
            </Typography>
            <table className="p-2">
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    industry Type:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.industryType} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> needForLoan: </Typography>
                </td>
                <td>
                  <Typography>{data.needForLoan?.toString()}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    likeToInvest:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.likeToInvest}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6" className="w-40">
                    {" "}
                    lookingFor:{" "}
                  </Typography>
                </td>
                <td>
                  <Typography>{data.lookingFor} </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="h6"> ownProperty: </Typography>
                </td>
                <td>
                  <Typography>{data.ownProperty?.toString()}</Typography>
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
              looking for State:{" "}
            </Typography>
            {data.lookingForState?.length &&
              data.lookingForState?.map((name: string) => (
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
              looking for city:{" "}
            </Typography>
            {data.lookingForCity?.length &&
              data.lookingForCity?.map((name: string) => (
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

export default InvestorDetail;

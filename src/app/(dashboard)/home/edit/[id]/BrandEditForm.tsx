import CustomTextField from "@/@core/components/mui/TextField";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { BrandEditDataType } from "@/types/apps/brandListType";
import { Box, Button, Card, Grid, MenuItem, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  fetchAreaRequired,
  fetchCities,
  fetchCountries,
  fetchFranchiseDuration,
  fetchHeadquarter,
  fetchIndustry,
  fetchInvestmentRange,
  fetchOutlet,
  fetchPaybackPeriod,
  fetchSalesAndRevenueModel,
  fetchService,
  fetchStates,
  fetchSubCategory,
  fetchSupportProvided,
} from "./dropdownAPIService";
import AppReactDatepicker from "@/libs/styles/AppReactDatepicker";
import CustomAutocomplete from "@/@core/components/mui/Autocomplete";
import { brandList } from "@/services/endpoint/brandList";
import { post } from "@/services/apiService";
import { toast } from "react-toastify";

type pageProps = {
  editData: BrandEditDataType;
  handleClose: Function;
};

type dropdownValueType = [{ id: number; name: string }];
type InvestmentRangeType = [{ id: number; range: string }];

const initialErrorData = {
  fullName: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
  pincode: "",
  userState: "",
  userCity: "",
  kylasLeadId: "",
  companyName: "",
  websiteURL: "",
  brandName: "",
  industry: "",
  subCategory: "",
  headquartersLocation: "",
  service: "",
  businessCommencedYear: "",
  franchiseCommencedYear: "",
  numberOfLocations: "",
  brandDescription: "",
  usp: "",
  country: "",
  state: "",
  city: "",
  areaRequired: "",
  investmentRange: "",
  franchiseFee: "",
  salesRevenueModel: "",
  roi: "",
  paybackPeriod: "",
  tenurePeriod: "",
  supportProvided: "",
  otherApplicable: "",
  isOperatingManuals: "",
  isAssistanceAvailable: "",
  isExpertGuidance: "",
  isITSystemIncluded: "",
  trainingLocation: "",
  brochure: "",
  logo: "",
  brandImages: "",
  video: "",
  franchiseAggrementFile: "",
  franchiseAgreement: "",
  franchiseDuration: "",
  isRenewable: "",
  active: "",
  approved: "",
  deletedAt: "",
  createdAt: "",
  updatedAt: "",
};

function BrandEditForm({ editData, handleClose }: pageProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(editData);
  const [formErrors, setFormErrors] = useState(initialErrorData);
  //Dropdown Data
  const [country, setCountry] = useState<dropdownValueType>();
  const [state, setState] = useState<dropdownValueType>();
  const [city, setCity] = useState<dropdownValueType>();
  const [industry, setIndustry] = useState<dropdownValueType>();
  const [subCategory, setSubCategory] = useState<dropdownValueType>();
  const [service, setService] = useState<dropdownValueType>();
  const [headquarter, setHeadquarter] = useState<dropdownValueType>();
  const [outlet, setOutlet] = useState<dropdownValueType>();
  const [areaRequired, setAreaRequired] = useState<dropdownValueType>();
  const [investmentRange, setInvestmentRange] = useState<InvestmentRangeType>();
  const [salesRevenueModel, setSalesRevenueModel] =
    useState<dropdownValueType>();
  const [paybackPeriod, setPaybackPeriod] = useState<dropdownValueType>();
  const [supportProvided, setSupportProvided] = useState<dropdownValueType>();
  const [franchiseDuration, setFranchiseDuration] =
    useState<dropdownValueType>();

  //Functions
  async function fetchCity() {
    let data = await fetchCities([formData.userState]);
    setCity(data);
    setFormData({ ...formData, userCity: -1 });
  }

  //Hooks
  useEffect(() => {
    async function getData() {
      setLoading(true);

      const [
        countries,
        states,
        cities,
        industries,
        subCategories,
        services,
        headquarters,
        outlets,
        areas,
        investmentRanges,
        salesRevenueModels,
        paybackPeriods,
        supportProvided,
        durations,
      ] = await Promise.all([
        fetchCountries(),
        fetchStates(),
        fetchCities([editData.userState]),
        fetchIndustry(),
        fetchSubCategory(editData.industry),
        fetchService(editData.subCategory),
        fetchHeadquarter(),
        fetchOutlet(),
        fetchAreaRequired(),
        fetchInvestmentRange(),
        fetchSalesAndRevenueModel(),
        fetchPaybackPeriod(),
        fetchSupportProvided(),
        fetchFranchiseDuration(),
      ]);
      setCountry(countries);
      setState(states);
      setCity(cities);
      setIndustry(industries);
      setSubCategory(subCategories);
      setService(services);
      setHeadquarter(headquarters);
      setOutlet(outlets);
      setAreaRequired(areas);
      setInvestmentRange(investmentRanges);
      setSalesRevenueModel(salesRevenueModels);
      setPaybackPeriod(paybackPeriods);
      setSupportProvided(supportProvided);
      setFranchiseDuration(durations);
      setLoading(false);
    }
    getData();
  }, []);

  const handleSubmit = async () => {
    if (true) {
      // add validation method
      try {
        setLoading(true);
        const endpoint = brandList.edit;

        const payload = {
          ...formData,
        };

        const response = await post(endpoint, payload);

        if (response.ResponseStatus === "success") {
          toast.success(response.Message);
        } else {
          toast.error(response.Message);
        }
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <LoadingBackdrop isLoading={loading} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="h-10 flex items-center mb-2">
            <div>
              <Typography variant="h5" className={`capitalize`}>
                &nbsp; Brand Edit Page &nbsp;
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              User Details:{" "}
            </Typography>

            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  error={!!formErrors?.fullName}
                  helperText={formErrors?.fullName}
                  label="Full Name *"
                  fullWidth
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={(e) => {
                    let val = e.target.value;
                    setFormData({ ...formData, fullName: val });
                    if (val.trim().length == 0) {
                      setFormErrors({
                        ...formErrors,
                        fullName: "Full Name is Required",
                      });
                    } else {
                      setFormErrors({
                        ...formErrors,
                        fullName: "",
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  disabled={true}
                  error={!!formErrors?.phoneNumber}
                  helperText={formErrors?.phoneNumber}
                  label="Phone Number"
                  fullWidth
                  placeholder="Enter Phone Number"
                  value={formData.countryCode + " " + formData.phoneNumber}
                  onChange={(e) => {
                    let val = e.target.value.toString();
                    setFormData({ ...formData, phoneNumber: val });
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} className="mt-2">
              <CustomTextField
                error={!!formErrors?.email}
                helperText={formErrors?.email}
                label="Email Address *"
                fullWidth
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => {
                  let val = e.target.value;
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setFormData({ ...formData, email: val });
                  if (val.trim().length == 0) {
                    setFormErrors({
                      ...formErrors,
                      email: "Email is Required",
                    });
                  } else if (!emailRegex.test(val)) {
                    setFormErrors({
                      ...formErrors,
                      email: "Invalid email address",
                    });
                  } else {
                    setFormErrors({
                      ...formErrors,
                      email: "",
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} className="mt-2">
              <CustomTextField
                error={!!formErrors?.brandName}
                helperText={formErrors?.brandName}
                label="Brand Name *"
                fullWidth
                placeholder="Enter Brand Name"
                value={formData.brandName}
                onChange={(e) => {
                  setFormData({ ...formData, brandName: e.target.value });
                  let val = e.target.value;
                  setFormData({ ...formData, brandName: val });
                  if (val.trim().length == 0) {
                    setFormErrors({
                      ...formErrors,
                      brandName: "Brand Name is Required",
                    });
                  } else {
                    setFormErrors({
                      ...formErrors,
                      brandName: "",
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} className="mt-2">
              <CustomTextField
                error={!!formErrors?.websiteURL}
                helperText={formErrors?.websiteURL}
                label="Website URL"
                fullWidth
                placeholder="Enter Website URL"
                value={formData.websiteURL}
                onChange={(e) =>
                  setFormData({ ...formData, websiteURL: e.target.value })
                }
              />
            </Grid>
            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  error={!!formErrors?.country}
                  helperText={formErrors?.country}
                  select
                  fullWidth
                  defaultValue=""
                  value={formData.country}
                  label="Select Country *"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      country: Number(e.target.value),
                    });
                    if (val === -1) {
                      setFormErrors({
                        ...formErrors,
                        country: "Please Select Country",
                      });
                    } else {
                      setFormErrors({
                        ...formErrors,
                        country: "",
                      });
                    }
                  }}
                >
                  <MenuItem value={-1}>
                    <em>Select Country</em>
                  </MenuItem>
                  {!loading &&
                    !!country?.length &&
                    country.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  error={!!formErrors?.userState}
                  helperText={formErrors?.userState}
                  select
                  fullWidth
                  defaultValue="-1"
                  value={formData.userState}
                  label="Select State *"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      userState: val,
                    });
                    if (val === -1) {
                      setFormErrors({
                        ...formErrors,
                        userState: "Please Select State",
                      });
                    } else {
                      setFormErrors({
                        ...formErrors,
                        userState: "",
                      });
                    }
                    // fetchCity();
                  }}
                >
                  <MenuItem value={-1}>
                    <em>Select State</em>
                  </MenuItem>
                  {!loading &&
                    !!state?.length &&
                    state.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  error={!!formErrors?.userCity}
                  helperText={formErrors?.userCity}
                  select
                  fullWidth
                  defaultValue="-1"
                  value={formData.userCity}
                  label="Select City *"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      userCity: val,
                    });
                    if (val === -1) {
                      setFormErrors({
                        ...formErrors,
                        userCity: "Please Select City",
                      });
                    } else {
                      setFormErrors({
                        ...formErrors,
                        userCity: "",
                      });
                    }
                  }}
                >
                  <MenuItem value={-1}>
                    <em>Select City</em>
                  </MenuItem>
                  {!loading &&
                    !!city?.length &&
                    city.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  error={!!formErrors?.pincode}
                  helperText={formErrors?.pincode}
                  label="Pincode *"
                  fullWidth
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  onChange={(e) => {
                    let val = e.target.value;
                    setFormData({ ...formData, pincode: val });
                    const pincodeRegex = /^[1-9][0-9]{5}$/;
                    if (val.trim().length === 0) {
                      setFormErrors({
                        ...formErrors,
                        pincode: "Pincode is Required",
                      });
                    } else if (!pincodeRegex.test(val)) {
                      setFormErrors({
                        ...formErrors,
                        pincode: "Enter Correct Pincode",
                      });
                    } else {
                      setFormErrors({
                        ...formErrors,
                        pincode: "",
                      });
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12} sm={6} className="mt-2">
                {/* <CustomAutocomplete
                  fullWidth
                  options={state}
                  value={formData.country}
                  id="autocomplete-custom"
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => (
                    <CustomTextField
                      placeholder="Select City"
                      {...params}
                      label="City"
                    />
                  )}
                /> */}
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="p-2">
            <Typography variant="h5" className="underline mb-4">
              {" "}
              Brand Details:{" "}
            </Typography>

            <Grid item xs={12} sm={12} className="mt-2">
              <CustomTextField
                error={!!formErrors?.companyName}
                helperText={formErrors?.companyName}
                label="Company Name *"
                fullWidth
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </Grid>
            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12} sm={6} className="mt-2">
                <AppReactDatepicker
                  showYearPicker
                  dateFormat="yyyy"
                  selected={formData.businessCommencedYear}
                  id="year-picker"
                  onChange={(date: Date) =>
                    setFormData({ ...formData, businessCommencedYear: date })
                  }
                  placeholderText="Business Commenced Year"
                  customInput={
                    <CustomTextField
                      label="Business Commenced Year"
                      fullWidth
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className="mt-2">
                <AppReactDatepicker
                  showYearPicker
                  dateFormat="yyyy"
                  selected={formData.franchiseCommencedYear}
                  id="year-picker"
                  onChange={(date: Date) =>
                    setFormData({ ...formData, franchiseCommencedYear: date })
                  }
                  placeholderText="Franchise Commenced On"
                  customInput={
                    <CustomTextField label="Franchise Commenced On" fullWidth />
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} className="mt-2">
              <CustomTextField
                multiline
                maxRows={4}
                minRows={4}
                error={!!formErrors?.brandDescription}
                helperText={formErrors?.brandDescription}
                label="Description"
                fullWidth
                placeholder="Enter Brand Description"
                value={formData.brandDescription}
                onChange={(e) =>
                  setFormData({ ...formData, brandDescription: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} className="mt-2">
              <CustomTextField
                multiline
                maxRows={4}
                minRows={4}
                error={!!formErrors?.usp}
                helperText={formErrors?.usp}
                label="Unique Selling Proposition (USP)"
                fullWidth
                placeholder="Enter Unique Selling Proposition"
                value={formData.usp}
                onChange={(e) =>
                  setFormData({ ...formData, usp: e.target.value })
                }
              />
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Investment Details:{" "}
            </Typography>

            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  error={!!formErrors?.fullName}
                  helperText={formErrors?.fullName}
                  label="Full Name *"
                  fullWidth
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Visualize Brand Details:{" "}
            </Typography>

            <Grid container spacing={2} className="mt-2">
              <Grid item xs={12} sm={6} className="mt-2">
                <CustomTextField
                  error={!!formErrors?.fullName}
                  helperText={formErrors?.fullName}
                  label="Full Name *"
                  fullWidth
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ position: "sticky", bottom: 0, zIndex: 10 }}
        >
          <Box
            p={7}
            display="flex"
            gap={2}
            justifyContent="end"
            bgcolor="background.paper"
          >
            <Button
              variant="contained"
              color="error"
              type="reset"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default BrandEditForm;

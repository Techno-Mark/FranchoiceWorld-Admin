import CustomTextField from "@/@core/components/mui/TextField";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { BrandEditDataType } from "@/types/apps/brandListType";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
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
import CustomChip from "@/@core/components/mui/Chip";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

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
  const [allCity, setAllCity] = useState<dropdownValueType>();
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
        allCity,
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
        fetchCities([]),
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
      setAllCity(allCity);
      setLoading(false);
    }
    async function fakeMethod() {
      let data = await fetchStates();
      setState(data);
    }
    // fakeMethod();
    getData();
  }, []);

  const checkFormIsValid = (formErrors: any): boolean => {
    return !Object.keys(formErrors).some((key) => formErrors[key]);
  };

  const handleSubmit = async () => {
    if (checkFormIsValid(formErrors)) {
      // add validation method
      try {
        console.log("form data", formData);
        // setLoading(true);
        // const endpoint = brandList.edit;

        // const payload = {
        //   ...formData,
        // };

        // const response = await post(endpoint, payload);

        // if (response.ResponseStatus === "success") {
        //   toast.success(response.Message);
        // } else {
        //   toast.error(response.Message);
        // }
        // setLoading(false);
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

            <Grid container spacing={2} className="mt-5">
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={12} className="mt-4">
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
            <Grid item xs={12} sm={12} className="mt-4">
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
            <Grid item xs={12} sm={12} className="mt-4">
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
            <Grid container columnSpacing={2} className="mt-4">
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  error={!!formErrors?.country}
                  helperText={formErrors?.country}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.country}
                  label="Select Country *"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      country: Number(e.target.value),
                    });
                    if (val === 0) {
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
                  <MenuItem value={0}>
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
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  error={!!formErrors?.userState}
                  helperText={formErrors?.userState}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.userState}
                  label="Select State *"
                  id="custom-select"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      userState: val,
                    });
                    if (val === 0) {
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
                    let data = await fetchCities([val]);
                    setCity(data);
                    setFormData((prevState) => ({
                      ...prevState,
                      userCity: 0,
                    }));
                  }}
                >
                  <MenuItem value={0}>
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
            </Grid>
            <Grid container columnSpacing={2} className="mt-4">
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  error={!!formErrors?.userCity}
                  helperText={formErrors?.userCity}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.userCity}
                  label="Select City *"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      userCity: val,
                    });
                    if (val === 0) {
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
                  <MenuItem value={"0"}>
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
              <Grid item xs={12} sm={6}>
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
            <Grid container spacing={2} className="mt-4">
              <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={12} className="mt-5">
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
            <Grid container columnSpacing={2} className="mt-4">
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  error={!!formErrors?.industry}
                  helperText={formErrors?.industry}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.industry}
                  label="Industry  "
                  id="custom-select"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      industry: Number(e.target.value),
                      subCategory: 0,
                      service: 0,
                    });
                    let data = await fetchSubCategory(val);
                    setSubCategory(data);
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select industry</em>
                  </MenuItem>
                  {!loading &&
                    !!industry?.length &&
                    industry.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  error={!!formErrors?.subCategory}
                  helperText={formErrors?.subCategory}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.subCategory}
                  label="Sub-Category  "
                  id="custom-select"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      subCategory: Number(e.target.value),
                      service: 0,
                    });
                    let data = await fetchService(val);
                    setService(data);
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select Sub-Category</em>
                  </MenuItem>
                  {!loading &&
                    !!subCategory?.length &&
                    subCategory.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  error={!!formErrors?.service}
                  helperText={formErrors?.service}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.service}
                  label="Service/Product  "
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      service: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select industry</em>
                  </MenuItem>
                  {!loading &&
                    !!service?.length &&
                    service.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
            </Grid>
            <Grid container columnSpacing={2} className="mt-4">
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
            <Grid container columnSpacing={2} className="mt-4">
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  error={!!formErrors?.headquartersLocation}
                  helperText={formErrors?.headquartersLocation}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.headquartersLocation}
                  label="Location of Headquarters  "
                  id="custom-select"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      headquartersLocation: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select Headquarters Location</em>
                  </MenuItem>
                  {!loading &&
                    !!headquarter?.length &&
                    headquarter.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  error={!!formErrors?.numberOfLocations}
                  helperText={formErrors?.numberOfLocations}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.numberOfLocations}
                  label="Current Number of Locations/Outlets"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      numberOfLocations: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select Number of Locations</em>
                  </MenuItem>
                  {!loading &&
                    !!outlet?.length &&
                    outlet.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} className="mt-4">
              <CustomTextField
                multiline
                maxRows={10}
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
            <Grid item xs={12} sm={12} className="mt-4">
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
            <Grid item xs={12} sm={12} className="mt-4">
              <CustomTextField
                select
                fullWidth
                label="States"
                value={formData.state}
                id="demo-multiple-checkbox"
                SelectProps={{
                  MenuProps,
                  multiple: true,
                  onChange: (event: SelectChangeEvent<unknown>) => {
                    let selectedIds = event.target.value as number[];
                    setFormData({ ...formData, state: selectedIds });
                  },
                  renderValue: (selected) => {
                    let selectedValue = selected as number[];
                    const selectedNames =
                      state &&
                      state.length &&
                      state
                        .filter((item) => selectedValue.includes(item.id))
                        .map((item) => (
                          <CustomChip
                            className="mr-2"
                            round="true"
                            label={item.name}
                            color="primary"
                          />
                        ));
                    return selectedNames;
                  },
                }}
              >
                {!loading &&
                  state &&
                  state?.length &&
                  state.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <Checkbox
                        checked={formData.state?.includes(c.id) || false}
                      />
                      <ListItemText primary={c.name} />
                    </MenuItem>
                  ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={12} className="mt-4">
              <CustomTextField
                select
                fullWidth
                label="Cities"
                value={formData.city}
                id="demo-multiple-checkbox"
                SelectProps={{
                  MenuProps,
                  multiple: true,
                  onChange: (event: SelectChangeEvent<unknown>) => {
                    let selectedIds = event.target.value as number[];
                    setFormData({ ...formData, city: selectedIds });
                  },
                  renderValue: (selected) => {
                    let selectedValue = selected as number[];
                    const selectedNames =
                      allCity &&
                      allCity.length &&
                      allCity
                        .filter((item) => selectedValue.includes(item.id))
                        .map((item) => (
                          <CustomChip
                            className="mr-2"
                            round="true"
                            label={item.name}
                            color="primary"
                          />
                        ));
                    return selectedNames;
                  },
                }}
              >
                {!loading &&
                  city &&
                  city?.length &&
                  city.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <Checkbox
                        checked={formData.city?.includes(c.id) || false}
                      />
                      <ListItemText primary={c.name} />
                    </MenuItem>
                  ))}
              </CustomTextField>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="p-2">
            <Typography variant="h5" className="underline">
              {" "}
              Investment Details:{" "}
            </Typography>

            <Grid container spacing={2} className="mt-5">
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  error={!!formErrors?.areaRequired}
                  helperText={formErrors?.areaRequired}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.areaRequired}
                  label="Area Required( Sq.ft )"
                  id="custom-select"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      areaRequired: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select Area Required</em>
                  </MenuItem>
                  {!loading &&
                    !!areaRequired?.length &&
                    areaRequired.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  error={!!formErrors?.investmentRange}
                  helperText={formErrors?.investmentRange}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.investmentRange}
                  label="Total Initial Investment Range"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      investmentRange: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select Total Initial Investment Range</em>
                  </MenuItem>
                  {!loading &&
                    !!investmentRange?.length &&
                    investmentRange.map((c) => (
                      <MenuItem value={c.id} key={c.range}>
                        {c.range}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={12} className="mt-3">
                <CustomTextField
                  type="number"
                  label="Franchise Fee(in INR)"
                  id="form-props-number"
                  fullWidth
                  error={!!formErrors.franchiseFee}
                  helperText={formErrors?.franchiseFee}
                  value={formData?.franchiseFee}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      franchiseFee: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} className="mt-3">
                <CustomTextField
                  error={!!formErrors?.paybackPeriod}
                  helperText={formErrors?.paybackPeriod}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.paybackPeriod}
                  label="Likely Payback Period for a Unit Franchise"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      paybackPeriod: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select Likely Payback Period for a Unit Franchise</em>
                  </MenuItem>
                  {!loading &&
                    !!paybackPeriod?.length &&
                    paybackPeriod.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <CustomTextField
                  error={!!formErrors?.tenurePeriod}
                  helperText={formErrors?.tenurePeriod}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.tenurePeriod}
                  label="Lock In Tenure period"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      tenurePeriod: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select Lock In Tenure period</em>
                  </MenuItem>
                  {!loading &&
                    !!paybackPeriod?.length &&
                    paybackPeriod.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={12} className="mt-3">
                <CustomTextField
                  multiline
                  maxRows={4}
                  minRows={4}
                  error={!!formErrors?.otherApplicable}
                  helperText={formErrors?.otherApplicable}
                  label="Others if applicable"
                  fullWidth
                  placeholder="Your Message"
                  value={formData.usp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      otherApplicable: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <CustomTextField
                  error={!!formErrors?.franchiseDuration}
                  helperText={formErrors?.franchiseDuration}
                  select
                  fullWidth
                  defaultValue="0"
                  value={formData.franchiseDuration}
                  label="How long is the franchise for(in years)?"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = Number(e.target.value);
                    setFormData({
                      ...formData,
                      franchiseDuration: Number(e.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>
                    <em>Select How long is the franchise for</em>
                  </MenuItem>
                  {!loading &&
                    !!franchiseDuration?.length &&
                    franchiseDuration.map((c) => (
                      <MenuItem value={c.id} key={c.name}>
                        {c.name}
                      </MenuItem>
                    ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <CustomTextField
                  error={!!formErrors?.isRenewable}
                  helperText={formErrors?.isRenewable}
                  select
                  fullWidth
                  defaultValue="false"
                  value={formData.isRenewable}
                  label="Is the term renewable?"
                  id="custom-select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let val = e.target.value;
                    setFormData({
                      ...formData,
                      isRenewable: val === "true" ? true : false,
                    });
                  }}
                >
                  <MenuItem value={"true"}>
                    <em>Yes</em>
                  </MenuItem>
                  <MenuItem value={"false"}>
                    <em>No</em>
                  </MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <Typography color="text.primary">
                  Detailed operating manuals for franchisees
                </Typography>
                <RadioGroup
                  row
                  aria-label="controlled"
                  name="controlled"
                  value={formData.isOperatingManuals}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isOperatingManuals:
                        e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <Typography color="text.primary">
                  Franchisee training location
                </Typography>
                <RadioGroup
                  row
                  aria-label="controlled"
                  name="controlled"
                  value={formData.trainingLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trainingLocation:
                        e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Head office"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Online/HQ"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <Typography color="text.primary">
                  Is field assistance available for franchisee?
                </Typography>
                <RadioGroup
                  row
                  aria-label="controlled"
                  name="controlled"
                  value={formData.isAssistanceAvailable}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isAssistanceAvailable:
                        e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <Typography color="text.primary">
                  Current IT systems will be included in the franchise
                </Typography>
                <RadioGroup
                  row
                  aria-label="controlled"
                  name="controlled"
                  value={formData.isITSystemIncluded}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isITSystemIncluded:
                        e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={12} className="mt-3">
                <Typography color="text.primary">
                  Expert guidance from Head Office to franchisee in opening the
                  franchise
                </Typography>
                <RadioGroup
                  row
                  aria-label="controlled"
                  name="controlled"
                  value={formData.isExpertGuidance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isExpertGuidance:
                        e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
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

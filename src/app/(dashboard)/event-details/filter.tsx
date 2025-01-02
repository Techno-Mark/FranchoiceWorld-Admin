import CustomTextField from "@/@core/components/mui/TextField";
import { Button, MenuItem } from "@mui/material";
import {
  getCategories,
  getCity,
  getCountry,
  getState,
} from "./add/dropdownAPIService";
import { eventDetails } from "@/services/endpoint/event-details";
import { useEffect, useState } from "react";

type PropsType = {
  handleCloseFilter: Function;
  filterValue: null | {
    category: number;
    status: string;
    country: number;
    state: number;
    city: number;
    startDate: string;
    endDate: string;
  };
  handleFilterChange: Function;
  handleResetFilter: Function;
  handleFilterSaveAndApply: Function;
  isSaveDisabled: boolean;
  isResetDisabled: boolean;
};

export default function EventFilter({
  handleCloseFilter,
  filterValue,
  handleFilterChange,
  handleResetFilter,
  isSaveDisabled,
  isResetDisabled,
  handleFilterSaveAndApply,
}: PropsType) {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories(eventDetails.categories);
      const formattedCategories = response.ResponseData.map(
        (categorie: any) => ({
          value: categorie.id,
          label: categorie.name,
        })
      );
      setCategoryOptions(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await getCountry(eventDetails.country);
      const formattedCountries = response.ResponseData.map((country: any) => ({
        value: country.id,
        label: country.name,
      }));
      setCountryOptions(formattedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId: number) => {
    if (!countryId) return;
    try {
      const response = await getState(eventDetails.state, {
        countryId: countryId,
      });
      const formattedState = response.ResponseData.map((state: any) => ({
        value: state.id,
        label: state.name,
      }));
      setStateOptions(formattedState);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCity = async (stateId: number) => {
    if (!stateId) return;
    try {
      const response = await getCity(eventDetails.city, {
        stateId: stateId,
      });
      const formattedCity = response.ResponseData.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));
      setCityOptions(formattedCity);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchCategories();
    fetchCountries();
  }, []);

  // Load states when country changes or on initial load if country is selected
  useEffect(() => {
    if (filterValue?.country) {
      fetchStates(filterValue.country);
    }
  }, [filterValue?.country]);

  // Load cities when state changes or on initial load if state is selected
  useEffect(() => {
    if (filterValue?.state) {
      fetchCity(filterValue.state);
    }
  }, [filterValue?.state]);

  const handleCountryChange = async (e: any) => {
    const countryId = e.target.value;
    handleFilterChange("country", countryId);
    // Reset dependent fields
    handleFilterChange("state", "");
    handleFilterChange("city", "");
    setStateOptions([]);
    setCityOptions([]);
  };

  const handleStateChange = async (e: any) => {
    const stateId = e.target.value;
    handleFilterChange("state", stateId);
    // Reset dependent field
    handleFilterChange("city", "");
    setCityOptions([]);
  };

  const handleDateChange = (field: string, value: string) => {
    handleFilterChange(field, value);
  };

  return (
    <>
      <div className="absolute -top-3 right-10 bg-white z-10 shadow-xl rounded-lg p-2">
        <form className="flex flex-col gap-6 p-6">
          <CustomTextField
            select
            fullWidth
            id="category"
            name="category"
            label="Category"
            placeholder="Select Category"
            value={filterValue?.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {categoryOptions.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            id="companyStatus"
            name="companyStatus"
            label="Status"
            placeholder="Select Company Status"
            value={filterValue?.status || ""}
            onChange={(e) => handleFilterChange("status", [e.target.value])}
          >
            <MenuItem key={"Active"} value={"active"}>
              Active
            </MenuItem>
            <MenuItem key={"Inactive"} value={"inactive"}>
              Inactive
            </MenuItem>
            <MenuItem key={"Drafted"} value={"Drafted"}>
              Drafted
            </MenuItem>
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            id="country"
            name="country"
            label="Country"
            placeholder="Select Country"
            value={filterValue?.country || ""}
            onChange={handleCountryChange}
          >
            {countryOptions.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            id="state"
            name="state"
            label="State"
            placeholder="Select State"
            value={filterValue?.state || ""}
            onChange={handleStateChange}
            disabled={!filterValue?.country}
          >
            {stateOptions.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            id="city"
            name="city"
            label="City"
            placeholder="Select City"
            value={filterValue?.city || ""}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            disabled={!filterValue?.state}
          >
            {cityOptions.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
          <div className="flex gap-4">
            <CustomTextField
              fullWidth
              type="date"
              id="startDate"
              name="startDate"
              label="Start Date"
              value={filterValue?.startDate || ""}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomTextField
              fullWidth
              type="date"
              id="endDate"
              name="endDate"
              label="End Date"
              value={filterValue?.endDate || ""}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
             
            />
          </div>

          <div className="flex gap-4">
            <Button
              variant="contained"
              color="success"
              size="small"
              disabled={isSaveDisabled}
              onClick={() => handleFilterSaveAndApply()}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleResetFilter()}
              disabled={isResetDisabled}
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => handleCloseFilter()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

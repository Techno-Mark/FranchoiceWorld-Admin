import CustomTextField from "@/@core/components/mui/TextField";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "./ConfirmationDialog";
// Icon Imports
import { post, postFormData } from "@/services/apiService";
import { eventDetails } from "@/services/endpoint/event-details";
import { FormikHelpers, useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import {
  getCategories,
  getCity,
  getCountry,
  getState,
} from "./dropdownAPIService";

type FileProp = {
  name: string;
  type: string;
  size: number;
  preview?: string;
  file: File;
};

interface FormData {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventCategory: string;
  location: string;
  country: string;
  state: string;
  city: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  contactInfo: string;
  status: string;
  eventImages: FileProp[];
}

const initialValues: FormData = {
  eventId: 0,
  eventName: "",
  eventDescription: "",
  eventCategory: "",
  location: "",
  country: "",
  state: "",
  city: "",
  startDate: null,
  endDate: null,
  startTime: "",
  endTime: "",
  contactInfo: "",
  status: "Publish",
  eventImages: [],
};

const validationSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  eventDescription: Yup.string().required("Event Description is required"),
  eventCategory: Yup.string().required("Event Category is required"),
  location: Yup.string().required("Location is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  startTime: Yup.string().required("Start Time is required"),
  endTime: Yup.string().required("End Time is required"),
  status: Yup.string().required("Status is required"),
  eventImages: Yup.array()
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed")
    .test("fileSize", "File size exceeds limit", function (value) {
      if (!value) return true;

      if (value.length === 1) {
        if (value[0].size > 2000000) {
          return this.createError({
            message: "Single image size cannot exceed 2MB",
          });
        }
        return true;
      }

      const totalSize = value.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > 10000000) {
        return this.createError({
          message: "Total size of all images cannot exceed 10MB",
        });
      }

      return true;
    })
    .test("fileType", "Only PNG, JPEG & JPG files are allowed", (value) => {
      if (!value) return true;
      const supportedTypes = ["image/png", "image/jpeg", "image/jpg"];
      return value.every((file) => supportedTypes.includes(file.type));
    })
    .required("At least one image is required"),
});

function EditEventForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const params = useParams();
  const eventId = params.id;
  const [loading, setLoading] = useState(false);

  //dropdown
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  //Modal State
  const [isCancel, setIsCancel] = useState<boolean>(false);

  // Images Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 10000000,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: async (acceptedFiles: File[]) => {
      const currentFiles = formik.values.eventImages;

      if (currentFiles.length + acceptedFiles.length > 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }

      const newFiles = acceptedFiles.map((file: File) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file),
        file: file,
      }));

      const updatedFiles = [...currentFiles, ...newFiles];

      if (updatedFiles.length === 1 && updatedFiles[0].size > 2000000) {
        toast.error("Single image size cannot exceed 2MB");
        return;
      }

      const totalSize = updatedFiles.reduce((sum, file) => sum + file.size, 0);
      if (updatedFiles.length > 1 && totalSize > 10000000) {
        toast.error("Total size of all images cannot exceed 10MB");
        return;
      }

      await formik.setFieldValue("eventImages", updatedFiles);
      formik.setFieldError("eventImages", undefined);
      formik.setFieldTouched("eventImages", true, false);
    },
    onDropRejected: (fileRejections) => {
      const errors = fileRejections
        .map((rejection) =>
          rejection.errors.map((error) => {
            if (error.code === "file-too-large") {
              return "File is too large. Size limit is 2MB for single image or 10MB total for multiple images";
            }
            return error.message;
          })
        )
        .flat();
      toast.error(errors.join(", "), { autoClose: 3000 });
    },
  });

  const handleRemoveImage = (fileToRemove: FileProp) => {
    const updatedFiles = formik.values.eventImages.filter(
      (file) => file.name !== fileToRemove.name
    );

    formik.setFieldValue("eventImages", updatedFiles);

    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
  };

  const renderFilePreview = (file: FileProp) => {
    if (file.type?.startsWith("image/") || typeof file.name === "string") {
      const imageSrc =
        file.preview ||
        (file.name.startsWith("/") ? file.name : `${API_URL}/${file.name}`);

      return (
        <img
          width={100}
          height={100}
          alt={file.name.split("/").pop() || "Event image"}
          src={imageSrc}
          style={{
            objectFit: "cover",
            borderRadius: "4px",
            padding: "5px",
          }}
          onError={(e) => {
            console.error(`Error loading preview for ${file.name}`);
            e.currentTarget.src = "/placeholder-image.png";
          }}
        />
      );
    }
    return null;
  };

  // Fetch a country
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

  const fetchStates = async (countryIds: number) => {
    try {
      const response = await getState(eventDetails.state, {
        countryId: countryIds,
      });
      const formattedstate = response.ResponseData.map((state: any) => ({
        value: state.id,
        label: state.name,
      }));
      setStateOptions(formattedstate);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCity = async (stateIds: number) => {
    try {
      const response = await getCity(eventDetails.city, {
        stateId: stateIds,
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

  const fetchCategories = async () => {
    try {
      const response = await getCategories(eventDetails.categories);
      const formattedCategories = response.ResponseData.map(
        (categorie: any) => ({
          value: categorie.id,
          label: categorie.name,
        })
      );
      setCategoriesOptions(formattedCategories);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    formik.validateField("eventImages");
  }, []);

  const handleCancel = () => {
    router.push("/event-details");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    validateOnChange: true,
    onSubmit: async (
      values: FormData,
      { setFieldTouched }: FormikHelpers<FormData>
    ) => {
      if (values.eventImages.length === 0) {
        toast.error("At least one image is required");
        return;
      }

      const formDataObject = new FormData();

      (Object.keys(values) as Array<keyof typeof values>).forEach((key) => {
        if (key !== "eventImages") {
          const value = values[key];
          if (value === null) {
            formDataObject.append(key, "");
          } else if (value instanceof Date) {
            formDataObject.append(key, value.toISOString());
          } else {
            formDataObject.append(key, String(value));
          }
        }
      });
      values.eventImages.forEach((fileProp: FileProp) => {
        formDataObject.append("eventImages", fileProp.file);
      });
      formDataObject.append("eventId", String(eventId));

      try {
        setLoading(true);
        const response = await postFormData(eventDetails.save, formDataObject);
        toast.success(response.Message);
        router.push("/event-details");
      } catch (error: any) {
        console.error("Error posting data:", error.message);
        toast.error(error.message || "Error submitting form");
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchEventDetails = async () => {
    try {
      const response = await post(eventDetails.getById, { eventId: eventId });
      const eventData = response.ResponseData;

      // Fetch dependent dropdowns data based on event data
      if (eventData.country) {
        await fetchStates(eventData.country);
      }
      if (eventData.state) {
        await fetchCity(eventData.state);
      }

      const formattedImages =
        eventData.eventImages?.map((imagePath: string) => ({
          name: imagePath.split("/").pop(),
          type: "image/jpeg",
          size: 0,
          preview: imagePath.startsWith("/")
            ? imagePath
            : `${API_URL?.replace("/api", "")}${imagePath.startsWith("api/") ? imagePath.replace("api/", "") : `/${imagePath}`}`,
        })) || [];

      // Set form values
      formik.setValues({
        eventId: eventData.id,
        eventName: eventData.eventName || "",
        eventDescription: eventData.eventDescription || "",
        eventCategory: eventData.eventCategory || "",
        location: eventData.location || "",
        country: eventData.country || "",
        state: eventData.state || "",
        city: eventData.city || "",
        startDate: eventData.startDate || null,
        endDate: eventData.endDate || null,
        startTime: eventData.startTime || "",
        endTime: eventData.endTime || "",
        contactInfo: eventData.contactInfo || "",
        status: eventData.status || "Publish",
        eventImages: formattedImages,
      });
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Error loading event details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
    fetchCountries();
    fetchCategories();
    return () => {
      formik.values.eventImages.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [eventId]);

  if (loading) {
    return <LoadingBackdrop isLoading={loading} />;
  }

  return (
    <>
      {/* <LoadingBackdrop isLoading={loading} /> */}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="h-10 flex items-center mb-2">
              <Typography variant="h5" className="capitalize">
                &nbsp; Event Edit Page &nbsp;
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Card className="p-2">
              <Typography variant="h5" className="underline">
                Event Details:
              </Typography>

              <Grid container spacing={2} className="mt-5">
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Event Name *"
                    fullWidth
                    error={
                      formik.touched.eventName &&
                      Boolean(formik.errors.eventName)
                    }
                    helperText={
                      formik.touched.eventName && formik.errors.eventName
                    }
                    {...formik.getFieldProps("eventName")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Event Description *"
                    fullWidth
                    multiline
                    rows={4}
                    error={
                      formik.touched.eventDescription &&
                      Boolean(formik.errors.eventDescription)
                    }
                    helperText={
                      formik.touched.eventDescription &&
                      formik.errors.eventDescription
                    }
                    {...formik.getFieldProps("eventDescription")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Event Category *"
                    select
                    fullWidth
                    error={
                      formik.touched.eventCategory &&
                      Boolean(formik.errors.eventCategory)
                    }
                    helperText={
                      formik.touched.eventCategory &&
                      formik.errors.eventCategory
                    }
                    {...formik.getFieldProps("eventCategory")}
                  >
                    {categoriesOptions.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Location *"
                    fullWidth
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    {...formik.getFieldProps("location")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Country *"
                    select
                    fullWidth
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                    {...formik.getFieldProps("country")}
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      formik.setFieldValue("country", selectedValue);
                      fetchStates(Number(selectedValue));
                    }}
                  >
                    {countryOptions.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="State *"
                    select
                    fullWidth
                    // error={formik.touched.state && Boolean(formik.errors.state)}
                    // helperText={formik.touched.state && formik.errors.state}
                    {...formik.getFieldProps("state")}
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      formik.setFieldValue("state", selectedValue);
                      fetchCity(Number(selectedValue));
                    }}
                  >
                    {stateOptions.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="City *"
                    select
                    fullWidth
                    // error={formik.touched.city && Boolean(formik.errors.city)}
                    // helperText={formik.touched.city && formik.errors.city}
                    {...formik.getFieldProps("city")}
                  >
                    {cityOptions.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Start Date *"
                    type="date"
                    fullWidth
                    inputProps={{
                      min: new Date().toISOString().split('T')[0]
                    }}
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                    {...formik.getFieldProps("startDate")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="End Date *"
                    type="date"
                    fullWidth
                    inputProps={{
                      min: new Date().toISOString().split('T')[0]
                    }}
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                    {...formik.getFieldProps("endDate")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Start Time *"
                    type="time"
                    fullWidth
                    error={
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime)
                    }
                    helperText={
                      formik.touched.startTime && formik.errors.startTime
                    }
                    {...formik.getFieldProps("startTime")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="End Time *"
                    type="time"
                    fullWidth
                    error={
                      formik.touched.endTime && Boolean(formik.errors.endTime)
                    }
                    helperText={formik.touched.endTime && formik.errors.endTime}
                    {...formik.getFieldProps("endTime")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Contact Info"
                    fullWidth
                    {...formik.getFieldProps("contactInfo")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Status *"
                    select
                    fullWidth
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                    helperText={formik.touched.status && formik.errors.status}
                    {...formik.getFieldProps("status")}
                  >
                    <MenuItem key={"Active"} value={"Active"}>
                      Active
                    </MenuItem>
                    <MenuItem key={"Inactive"} value={"Inactive"}>
                      Inactive
                    </MenuItem>
                    <MenuItem key={"Drafted"} value={"Drafted"}>
                      Drafted
                    </MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className="p-2">
              <Typography variant="h5" className="underline">
                {" "}
                Visualize Event Details:{" "}
              </Typography>
              <Grid container spacing={2} className="mt-5">
                <Grid item xs={12} sm={6} className="mt-3">
                  <div {...getRootProps({ className: "dropzone" })}>
                  <Typography variant="h6" className={`${
                        formik.touched.eventImages && formik.errors.eventImages
                          ? "text-red-500"
                          : ""
                      }`}>Add Images *</Typography>
                    <input {...getInputProps()} />
                    <div
                      className={`flex items-center flex-col w-[450px] h-[200px] p-2 border-dashed border-2 ${
                        formik.touched.eventImages && formik.errors.eventImages
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <Avatar variant="rounded" className="bs-12 is-12 mbe-9">
                        <i className="tabler-upload" />
                      </Avatar>
                      <Typography variant="h5" className="mbe-2.5">
                        Drop images here or click to upload.{" "}
                        <b>({formik.values.eventImages.length}/5)</b>
                      </Typography>
                      <Typography>Allowed image files</Typography>
                      <Typography>Max size 10 MB</Typography>
                    </div>
                  </div>
                  {formik.touched.eventImages && formik.errors.eventImages && (
                    <Typography color="error" className="mt-2">
                      {formik.errors.eventImages as string}
                    </Typography>
                  )}
                  <div className="images-preview flex flex-col gap-y-2 mt-4">
                    {formik.values.eventImages.map((file: FileProp) => (
                      <div
                        key={file.name}
                        className="file-details flex justify-between items-center w-[450px] p-2 border rounded"
                      >
                        {renderFilePreview(file)}
                        <Typography className="file-name p-3">
                          {file.name}
                        </Typography>
                        <IconButton
                          onClick={() => handleRemoveImage(file)}
                          size="small"
                        >
                          <i className="tabler-x text-xl" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
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
              p={2}
              display="flex"
              gap={2}
              justifyContent="end"
              bgcolor="background.paper"
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => setIsCancel(true)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      {isCancel && (
        <ConfirmationDialog
          handleSubmit={handleCancel}
          open={isCancel}
          setOpen={(arg1: boolean) => setIsCancel(arg1)}
        />
      )}
    </>
  );
}

export default EditEventForm;

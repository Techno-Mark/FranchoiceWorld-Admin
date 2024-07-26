import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { investorList } from "@/services/endpoint/investorList";
import { toast } from "react-toastify";
import { post } from "@/services/apiService";
import CustomTextField from "@/@core/components/mui/TextField";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { boolean } from "valibot";
import { brandList } from "@/services/endpoint/brandList";

type ConfirmationDialogProps = {
  approveUpdatingId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  setApproveUpdatingId: React.Dispatch<React.SetStateAction<number>>;
};

const ConfirmUpdateApprove = ({
  approveUpdatingId,
  open,
  setOpen,
  setApproveUpdatingId,
}: ConfirmationDialogProps) => {
  const [status, setStatus] = useState("true");

  const deleteContentBlock = async () => {
    try {
      console.log(approveUpdatingId);
      const result = await post(
        status === "true" ? brandList.approve : brandList.reject,
        {
          bandId: approveUpdatingId,
        }
      );
      if (result.ResponseStatus === "success") {
        toast.success(result.Message);
      } else {
        toast.error(result.Message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setApproveUpdatingId(-1);
      setOpen(false);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
      <DialogContent className="flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16">
        <Typography variant="h5" className="py-4">
          Are you sure you want to update Approval Status?
        </Typography>
        <CustomTextField
          select
          defaultValue="true"
          label=""
          id="custom-select"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={"true"}>Approve</MenuItem>
          <MenuItem value={"false"}>Reject</MenuItem>
        </CustomTextField>
      </DialogContent>
      <DialogActions className="justify-center pbs-0 sm:pbe-16 sm:pli-16">
        <Button variant="contained" onClick={deleteContentBlock}>
          Yes
        </Button>
        <Button
          variant="tonal"
          color="secondary"
          onClick={() => {
            setOpen(false);
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUpdateApprove;

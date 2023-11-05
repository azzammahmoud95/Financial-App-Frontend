import * as React from "react";
import Box from "@mui/material/Box";
// import Alert from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

export default function TransitionAlerts() {
  const [ setOpen] = React.useState(true);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
        border: "1px solid  #026FC2",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <Box>
        <LogoutIcon sx={{ fontSize: "80px", color: "#026FC2" }} />
      </Box>

      <Typography
        sx={{ color: "#9CA4AB", marginTop: "10px", marginBottom: "10px" }}
      >
        Are you sure you want to log out ?
      </Typography>

      {/* <Collapse in={open}>
        <Alert sx={{color:'#FDFDFD'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }} >
          Admin Edited Successfully
        </Alert>
      </Collapse> */}

      <Box sx={{ marginTop: "10px" }}>
        <Button
          sx={{ color: "#026FC2", marginRight: "10px" }}
          // disabled={open}
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Cancel
        </Button>

        <Button
          sx={{
            backgroundColor: "#026FC2",
            color: "#FDFDFD",
            marginLeft: "10px",
          }}
          // disabled={open}
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

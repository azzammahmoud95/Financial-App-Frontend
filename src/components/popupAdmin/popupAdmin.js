import * as React from "react";
import Box from "@mui/material/Box";
// import Alert from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
// import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

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
        <DoneAllOutlinedIcon sx={{ fontSize: "50px", color: "#026FC2" }} />
      </Box>

      <Typography>
        <h3>Success</h3>
      </Typography>

      <Typography
        sx={{ color: "#9CA4AB", marginTop: "10px", marginBottom: "10px" }}
      >
        Admin Edited Successfully
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
      <Button
        sx={{ backgroundColor: "#026FC2", color: "#FDFDFD" }}
        // disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

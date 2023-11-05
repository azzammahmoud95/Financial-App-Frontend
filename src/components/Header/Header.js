
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FaceIcon from "@mui/icons-material/Face";
import { Stack } from "@mui/system";
import "./Header.css";

export default function BasicTextFields({title="Dashboard"}) {
  return (
    <Box className="Header_container">
            <Stack className="Stack" direction="row" width="100%" justifyContent="space-between" alignItems="center">
              <h1 className="title">{title}</h1>
              <NotificationsNoneIcon fontSize="medium"/>
            </Stack>
          </Box>
          
      
  );
}

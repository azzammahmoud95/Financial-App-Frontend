import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState,useEffect } from "react";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddAdmin from '../AddAdmin/AddAdmin'
import axios from "axios";

export default function TotalAdminsCard() {
  const [totalAdmins, SetTotalAdmins] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/api/auth/admins',{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(response => {
        SetTotalAdmins(response.data.length);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },[]);
  return (
    <Stack spacing={3} paddingY={5} paddingX={4} 
      sx={{
        width: "100%",
        border: "1px solid rgba(109, 125, 147, 0.15)",
        boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        bgcolor:"white",
        maxHeight:"265px"
      }}
    >
      <Typography variant="body2" sx={{ color: "#6D7D93" }} >
        Total Admins
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{ fontSize:"28px" ,fontWeight: "bold", color: "#6D7D93" }}
          marginBottom={3}
        >
          {totalAdmins} Admins
        </Typography>
        <PermIdentityRoundedIcon fontSize="large" sx={{ color: "#6D7D93" }} />
      </Stack>
      {/* <Button
        variant="contained"
        size="large"
        sx={{
          borderRadius: "6px",
          textTransform: "none",
          padding: "14px 18px",
        }}
        startIcon={<AddRoundedIcon />}
      >
        Add New Admin
      </Button> */}
      <AddAdmin />
    </Stack>
  );
}

import { Box, Typography, LinearProgress } from "@mui/material";
import { Stack } from "@mui/system";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function ProfitBar({ realProfit, width }) {
  const [goalProfit, setGoalProfit] = useState({ amount: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/goal");
        setGoalProfit(response.data.goal[0]);
        setLoaded(true);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const progress = (realProfit / goalProfit.amount) * 100;

  return (
    <Box 
    width={width}
      sx={{ 
        padding: "24px",
        border: "1px solid rgba(109, 125, 147, 0.15)",
        boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" style={{ fontWeight: "bold" }} marginBottom={2}>
        Profit Goal
      </Typography>
      {loaded ? (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="primary"
            style={{ fontSize: "20px" }}
          >
            ${realProfit}/${goalProfit.amount}
          </Typography>
          <Stack direction="row" alignItems="center">
            <ArrowDropUpRoundedIcon color="primary" fontSize="large" />
            <Typography variant="subtitle1" fontWeight={600}>
              {progress.toFixed(2)}%
            </Typography>
          </Stack>
        </Stack>
      ) : ""}
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ width: "100%", height: "26px", borderRadius: "5px" }}
      />
    </Box>
  );
}



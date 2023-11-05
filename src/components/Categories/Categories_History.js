import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      label: "# of Votes",
      data: [50, 30, 20],
      backgroundColor: ["Blue", "Red", "Darkblue"],
      borderColor: ["white"],
      borderWidth: 4,
    },
  ],
};

export function CategoriesHistory() {
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        flexDirection: "column",
        // padding: "20px",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} marginBottom={1}>
          Categories History
        </Typography>
      </Box>
      <Box>
        <Tabs
          sx={{ margin: "30px" }}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Income" />
          <Tab value="two" label="Outcome" />
        </Tabs>
      </Box>
      <Doughnut data={data} />
    </Box>
  );
}

export default CategoriesHistory;

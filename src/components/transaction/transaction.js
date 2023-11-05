import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Item = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #E3E9ED",
  paddingBottom: theme.spacing(1),
  textAlign: "center",
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TransactionHistory({ transactions }) {
  const [value, setValue] = React.useState(0);

  const groupedTransactions = transactions.reduce((acc, curr) => {
    const category = curr.category_name;
    const amount = parseFloat(curr.amount);
    const type = curr.type_code;

    if (acc[category]) {
      acc[category].amount += amount;
    } else {
      acc[category] = {
        category_name: category,
        amount,
        type,
      };
    }

    return acc;
  }, {});

  const categoriesWithTotal = Object.values(groupedTransactions);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getIcon = (type) => {
    switch (type) {
      case "incomes":
        return <NorthRoundedIcon color="primary" />;
      case "expenses":
        return <SouthRoundedIcon style={{ color: "red" }} />;
    }
  };

  return (
    <Box
      sx={{
        width: ["100%", "67%"],
        padding:["10px", "32px"],
        border: "1px solid rgba(109, 125, 147, 0.15)",
        boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }} marginBottom={1}>
        Transactions Categories History
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          selectionFollowsFocus
        >
          <Tab label="Income" {...a11yProps(0)} />

          <Tab label="Outcome" {...a11yProps(1)} sx={{ marginLeft: "-20px" }} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}  >
        <Box className="test" sx={{ width: "100%" }}>
          <Stack spacing={2} sx={{ display: "flex" }}>
            {categoriesWithTotal.filter((item) => item.type === "incomes").map((categoryTotal, index) => (
              <Item
                sx={{ display: "flex", justifyContent: "space-between" }}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Stack direction="row" spacing={2} width={{base:"auto", md:"30%"}}>
                    <Box
                      sx={{
                        padding: ["8px", "12px", "16px"],
                        borderRadius: "12px",
                        maxWidth: ["auto", "56px"],
                        maxHeight: ["auto", "56px"],
                        bgcolor: "#E6F1F9",
                      }}
                    >
                      {getIcon(categoryTotal.type)}
                    </Box>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        alignSelf: "center",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {categoryTotal.category_name}
                    </Typography>
                  </Stack>
                  <Typography sx={{ alignSelf: "center", diplay:["none", ""] }}>
                    Type-{categoryTotal.type}
                  </Typography>

                  <Typography
                    sx={{ alignSelf: "center" }}
                    width="20%"
                    fontWeight="600"
                  >
                    $ {categoryTotal.amount}
                  </Typography>
                </Box>
              </Item>
            ))}
          </Stack>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2} sx={{ display: "flex" }}>
          {categoriesWithTotal.filter((item) => item.type === "expenses").map((categoryTotal, index) => (
              <Item
                sx={{ display: "flex", justifyContent: "space-between" }}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Stack direction="row" spacing={2} width={{base:"auto", md:"30%"}}>
                    <Box
                      sx={{
                        padding: ["8px", "12px", "16px"],
                        borderRadius: "12px",
                        maxWidth: ["auto", "56px"],
                        maxHeight: ["auto", "56px"],
                        bgcolor: "#E6F1F9",
                      }}
                    >
                      {getIcon(categoryTotal.type)}
                    </Box>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        alignSelf: "center",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {categoryTotal.category_name}
                    </Typography>
                  </Stack>
                  <Typography sx={{ alignSelf: "center", diplay:["none", ""] }}>
                    Type-{categoryTotal.type}
                  </Typography>

                  <Typography
                    sx={{ alignSelf: "center" }}
                    width="20%"
                    fontWeight="600"
                  >
                    $ {categoryTotal.amount}
                  </Typography>
                </Box>
              </Item>
            ))}
          </Stack>
        </Box>
      </TabPanel>
    </Box>
  );
}

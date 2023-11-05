import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { Box, Button, Typography, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import axios from "axios";

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

export default function TransactionList({ transactions, setTransactions }) {
  const [value, setValue] = React.useState(0);

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

  const handleDelete = (id, transaction_type, index) => {
    if (transaction_type === "fixed") {
      axios
        .delete(`http://localhost:8000/api/fixedtransaction/${id}`)
        .then((response) => {
          let newTransactions = [...transactions];
          newTransactions.splice(index, 1);
          setTransactions(newTransactions);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .delete(`http://localhost:8000/api/recurrings/${id}`)
        .then((response) => {
          let newTransactions = [...transactions];
          newTransactions.splice(index, 1);
          setTransactions(newTransactions);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box
      sx={{
        padding: ["10px", "32px"],
        border: "1px solid rgba(109, 125, 147, 0.15)",
        boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }} marginBottom={1}>
        Transaction History
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

      <TabPanel value={value} index={0}>
        <Box className="test" sx={{ width: "100%" }}>
          <Stack spacing={2} sx={{ display: "flex" }}>
            {transactions
              .filter((item) => item.type_code === "incomes")
              .filter((item) => item.is_paid === null || 1)
              .map((transaction, index) => (
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
                    <Stack
                      direction="row"
                      spacing={2}
                      width={{ base: "auto", md: "30%" }}
                    >
                      <Box
                        sx={{
                          padding: ["8px", "12px", "16px"],
                          borderRadius: "12px",
                          maxWidth: ["auto", "56px"],
                          maxHeight: ["auto", "56px"],
                          bgcolor: "#E6F1F9",
                        }}
                      >
                        {getIcon(transaction.type)}
                      </Box>
                      <Stack>
                        <Typography
                          sx={{
                            color: "gray",
                            fontWeight: "400",
                            fontSize: ["12px", "14px"],
                          }}
                        >
                          {transaction.start_date}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            alignSelf: "center",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {transaction.title}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      sx={{
                        alignSelf: "center",
                        diplay: ["none", ""],
                        textTransform: "capitalize",
                      }}
                    >
                      {transaction.category_name}
                    </Typography>

                    <Typography sx={{ alignSelf: "center" }} fontWeight="600">
                      {transaction.currency_name} {transaction.amount}
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
            {transactions
              .filter((item) => item.type_code === "expenses")
              .filter((item) => item.is_paid === null || 1)
              .map((transaction, index) => (
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
                    <Stack
                      direction="row"
                      spacing={2}
                      width={{ base: "auto", md: "30%" }}
                    >
                      <Box
                        sx={{
                          padding: ["8px", "12px", "16px"],
                          borderRadius: "12px",
                          maxWidth: ["auto", "56px"],
                          maxHeight: ["auto", "56px"],
                          bgcolor: "#E6F1F9",
                        }}
                      >
                        {getIcon(transaction.type_code)}
                      </Box>

                      <Stack>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            alignSelf: "center",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {transaction.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "gray",
                            fontWeight: "400",
                            fontSize: ["12px", "14px"],
                            textAlign: "center",
                          }}
                        >
                          {transaction.start_date}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack>
                      <Typography
                        sx={{ alignSelf: "center", fontWeight: "bold" }}
                      >
                        {transaction.category_name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "gray",
                          fontWeight: "400",
                          fontSize: ["12px", "14px"],
                          textAlign: "center",
                        }}
                      >
                        Category
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography
                        sx={{ alignSelf: "center" }}
                        
                        fontWeight="600"
                      >
                        {transaction.currency_name} {transaction.amount}
                      </Typography>
                      <Typography
                        sx={{
                          color: "gray",
                          fontWeight: "400",
                          fontSize: ["12px", "14px"],
                          textAlign: "center",
                        }}
                      >
                        Amount
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Button
                        sx={{
                          border: "2px solid #026FC2",
                          borderRadius: "6px",
                          minWidth: ["100%", "100px"],
                          maxHeight: ["auto", "40px"],
                          fontWeight: "600",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                        startIcon={<EditRoundedIcon />}
                        //   onClick={() => handleEdit(transaction.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#026FC2",
                          color: "white",
                          borderRadius: "6px",
                          minWidth: ["100%", "100px"],
                          maxHeight: ["auto", "40px"],
                          fontWeight: "600",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                        startIcon={<DeleteRoundedIcon />}
                        onClick={(e) =>
                          handleDelete(
                            transaction.id,
                            transaction.transaction_type,
                            index
                          )
                        }
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                </Item>
              ))}
          </Stack>
        </Box>
      </TabPanel>
    </Box>
  );
}

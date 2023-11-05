import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { React, useEffect, useState } from "react";
import axios from "axios";

export default function BillsCard({ transactions, setTransactions }) {
  const handlePay = async (id, index) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `http://localhost:8000/api/fixedtransaction/${id}`,
        data: {
          is_paid: 1,
        },
      });
      const newTransaction =[...transactions];
newTransaction[index].is_paid= 1;
setTransactions(newTransaction);
      // setTransactions((prevState) => ({
      //   ...prevState,
      //   transactions: prevState.transactions.map((transaction) =>
      //     transaction.transaction_type === "fixed" && transaction.id === id
      //       ? { ...transaction, is_paid: 1 }
      //       : transaction
      //   ),
      // }));
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: ["12px", "16px", "24px"],
        width: ["100%", "29%"],
        border: "1px solid rgba(109, 125, 147, 0.15)",
        boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }} mb={2}>
        Upcoming Bills
      </Typography>
      <Stack spacing={[1, 2]}>
        {transactions
          .filter((item) => item.is_paid === 0)
          .map((item, index) => {
            return (
              <Stack
                direction={"row"}
                justifyContent="space-between"
                alignItems="center"
                key={index}
                borderBottom="1px solid #E3E9ED"
                pb={[2, 1]}
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
                  <LocalGroceryStoreRoundedIcon color="primary" />
                </Box>
                <Stack
                // sx={{ flexGrow: 1 }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "gray",
                      fontWeight: "400",
                      fontSize: ["12px", "14px"],
                    }}
                  >
                    {item.start_date}
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    border: "2px solid #026FC2",
                    borderRadius: "6px",
                    maxWidth: ["100%", "70px"],
                    maxHeight: ["auto", "40px"],
                    fontWeight: "600",
                    fontSize: "14px",
                    textTransform: "none",
                  }}
                  onClick={() => handlePay(item.id, index)}
                >
                  Pay
                </Button>
              </Stack>
            );
          })}
      </Stack>
    </Box>
  );
}

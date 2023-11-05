import React from "react";
import { Card, Typography, Stack } from "@mui/material";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";

export default function InOutBalanceCard({ amount, typeCode, currency }) {
  const getIcon = () => {
    switch (typeCode) {
      case "Income":
        return <NorthRoundedIcon color="primary" />;
      case "Outcome":
        return <SouthRoundedIcon style={{ color: "red" }} />;
      default:
        return <ImportExportRoundedIcon color="primary" />;
    }
  };

  return (
    <Card sx={styles.card}>
      <Typography sx={styles.typeCodeTitle}>{typeCode}</Typography>
      <Stack direction="row" sx={styles.currencyAndAmountHolder}>
        <Stack direction="row">
        <Typography sx={styles.currency}>{currency}</Typography>
        <Typography sx={styles.amount}>{amount}</Typography>
        </Stack>
        {getIcon()}
      </Stack>
    </Card>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid rgba(109, 125, 147, 0.15)",
    boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: "24px",
    width: ["100%", "32%"],
    minHeight: "150px",
    bgcolor: "white",
  },
  typeCodeTitle: {
    color: "#6D7D93",
    fontSize: "16px",
    fontWeight: "400",
  },
  currencyAndAmountHolder: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  currency: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#026FC2",
  },
  amount: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#026FC2",
  },
};

import { Stack, Box } from "@mui/system";
import {React, useState, useEffect} from "react";
import InOutBalanceCard from "../../components/InOutBalanceCard/InOutBalanceCard";
import Layout from "../../components/layout/layout";
import ProfitBarCard from "../../components/profitBarCard/profitBarCard";
import { Typography, CircularProgress } from "@mui/material";
import BalanceChart from "../../components/charts/balanceBarChart/balanceBarChart";
import TransactionCart from "../../components/charts/transactionChart/transactionChart";
import CategoriesHistory from "../../components/Categories/Categories_History";
import axios from "axios";


export default function Statistics() {
  const [loaded, setLoaded] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance]=useState([]);
  const [incomes, setIncomes] = useState([]);
  const [outcomes, setOutcomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/alltransactions"
        );
        setTransactions(response.data.transactions.data);
        setBalance(response.data.totalBalance);
        setIncomes(response.data.totalIncome);
        setOutcomes(response.data.totalOutcome);
        setLoaded(true);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="statistics" style={{ backgroundColor: "#F8F9FD" }}>
      {loaded ? (
        <Layout title="Statistics">
          <Stack direction="row" justifyContent="space-between">
            <Stack
              paddingRight={2}
              style={{ width: "69%", overflow: "scroll", height: "88vh" }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <InOutBalanceCard
                  padding
                  typeCode="Income"
                  currency="$"
                  amount={incomes.current}

                />
                <InOutBalanceCard
                amount={outcomes.current}
                typeCode="Outcome"
                  currency="$"
                />
                <InOutBalanceCard
                amount={balance.current}
                typeCode="Balance"
                  currency="$"
                />
              </Stack>
              <Box
                sx={{
                  marginY: "16px",
                  padding: "32px",
                  border: "1px solid rgba(109, 125, 147, 0.15)",
                  boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  bgcolor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                  marginBottom={1}
                >
                  Balance History
                </Typography>
                <BalanceChart transactions={transactions}/>
              </Box>
              <Box
                sx={{
                  padding: "32px",
                  border: "1px solid rgba(109, 125, 147, 0.15)",
                  boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  bgcolor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                  marginBottom={1}
                >
                  Transaction History
                </Typography>
                <TransactionCart transactions={transactions}/>
              </Box>
            </Stack>
            <Stack spacing={2} style={{ width: "28%" }}>
              <ProfitBarCard realProfit={balance.current} goalProfit={30} width="100%" />
              <Box
                padding={3}
                sx={{
                  border: "1px solid rgba(109, 125, 147, 0.15)",
                  boxShadow: "4px 4px 20px -10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  bgcolor: "white",
                }}
              >
                <CategoriesHistory transactions={transactions}/>
              </Box>
            </Stack>
          </Stack>
        </Layout>
      ) : (
        <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="primary" />
        </Box>
      )}
    </div>
  );
}

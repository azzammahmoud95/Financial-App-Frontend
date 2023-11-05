import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import SelectMenu from "../../components/selectMenu/SelectMenu";
import InOutBalanceCard from "../../components/InOutBalanceCard/InOutBalanceCard";
import TransactionHistory from "../../components/transaction/transaction";
import ProfitBarCard from "../../components/profitBarCard/profitBarCard";
import BillsCard from "../../components/billsCard/billsCard";
import axios from "axios";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [balance, setBalance] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [timeframe, setTimeframe] = useState("current");

  const handleTimeChange = (event) => {
    setTimeframe(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/alltransactions"
        );
        setTransactions(response.data.transactions.data);
        setIncomes(response.data.totalIncome);
        setOutcomes(response.data.totalOutcome);
        setBalance(response.data.totalBalance);
        setLoaded(true);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeframe, transactions]);

  return (
    <div className="dashboard" style={{ backgroundColor: "#F8F9FD" }}>
      {loaded ? (
        <Layout title="Dashboard">
          <Stack direction="row">
            <SelectMenu
              handleTimeChange={handleTimeChange}
              timeframe={timeframe}
            />
            {/* <SelectMenu handleTimeChange={handleTimeChange}
              timeframe={timeframe}/> */}
          </Stack>
          <Stack direction={{base: "column-reverse", md: "row"}} justifyContent="space-between" pb={{base:"2", md:"0"}}>
            <Stack
              direction={{base: "column", md: "row"}}
              justifyContent="space-between"
              flexWrap="wrap"
              width={{base: "100%", md: "67%"}}
            >
              <InOutBalanceCard
                amount={incomes[timeframe]}
                typeCode="Income" direction={{base: "column", md: "row"}}
              justifyContent="space-between"
              flexWrap="wrap"
                currency="$"
              />
              <InOutBalanceCard
                amount={outcomes[timeframe]}
                typeCode="Outcome"
                currency="$"
              />
              <InOutBalanceCard
                amount={balance[timeframe]}
                typeCode="Balance"
                currency="$"
              />
            </Stack>
            <ProfitBarCard realProfit={balance[timeframe]} width={{base: "100%", md: "29%"}}/>
          </Stack>
          <Stack direction={{base: "column", md: "row"}} justifyContent="space-between">
            <TransactionHistory transactions={transactions} />
            <BillsCard transactions={transactions} setTransactions={setTransactions}/>
          </Stack>
        </Layout>
      ) : (<Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="primary" />

      </Box>
      )}
    </div>
  );
}

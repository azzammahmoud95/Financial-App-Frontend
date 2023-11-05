import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
// import transaction from '../../components/transaction/transaction';
import TransactionList from "../../components/transactionsList/transactionsList";
import axios from "axios";
import { Button, Typography, Stack } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import "../transaction/transaction.css";
export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/alltransactions"
        );
        setTransactions(response.data.transactions.data);
        setLoaded(true);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [transactions]);
  return (
    <div className="dashboard" style={{ backgroundColor: "#F8F9FD" }}>
      <Layout>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          
      {/* <Button
                  variant="contained"
                    sx={{
                      border: "2px solid #026FC2",
                      borderRadius: "6px",
                      width: "66px",
                      height: "37px",
                      fontWeight: "600",
                      fontSize: "14px",
                      textTransform: "none",
                    }}
                  
                    // onClick={() => handleDelete(item.id)}
                  ><AddRoundedIcon /></Button> */}
    
        </Stack>
        <TransactionList transactions={transactions} setTransactions={setTransactions}/>
      </Layout>
    </div>
  );
}

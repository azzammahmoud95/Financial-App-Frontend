import React from 'react'
import Layout from '../../components/layout/layout'
import AddTransactionForm from '../../components/AddTransactionForm/AddTransactionForm'
import { Stack } from '@mui/system'


export default function AddTransactionPage() {
  return (
    <div  style={{ backgroundColor: "#F8F9FD" }}>
     <Layout>
     <Stack direction="row" justifyContent="center" alignItems="center" style={{padding:"10px 200px"}}>
        <AddTransactionForm />
     </Stack>
     </Layout>      
    </div>
  )
}

import React from 'react'
import { Route, Routes} from 'react-router-dom';
import AddTransactionPage from '../../pages/AddTransactionPage/AddTransactionPage'
import Home from '../../pages/home/home'
import TransactionForm from '../../pages/transactionForm/transactionForm';
import Transaction from '../../pages/transaction/transaction';
import Admins from '../../pages/admins/admins';
import Help from '../../pages/help/help';
import Signin from '../../pages/signin/signin';
import Changepass from '../../pages/changepass/changepass';
import Statistics from '../../pages/statistics/statistics'
import { BrowserRouter } from 'react-router-dom';
export default function AllRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/admins" element={<Admins />} />
            <Route path="/changepass" element={<Changepass />} />
            <Route path="/transaction-form" element={<TransactionForm />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/help" element={<Help />} />
            <Route  path="/signin" element={<Signin />} />
            <Route  path="/statistics" element={<Statistics />} />
            <Route path="/addtransactionpage" element={<AddTransactionPage />} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

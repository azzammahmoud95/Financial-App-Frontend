import { Stack } from '@mui/system'
import React from 'react'
import AdminsCard from '../../components/adminsCard/adminsCard'
import Layout from '../../components/layout/layout'
import TotalAdminsCard from '../../components/totalAdminsCard/totalAdminsCard'
import AdminsFile from '../../assets/images/adminsFile.svg'
export default function Admins() {
  return (
    <div className="admins" style={{ backgroundColor: "#F8F9FD" }}>
      <Layout>
        <Stack direction="row" justifyContent="space-between">
       <AdminsCard/>
       <Stack direction="column" spacing={4} width="30%">
       <TotalAdminsCard/>
       <img src={AdminsFile}/>
       </Stack>
       </Stack>
      </Layout>
    </div>
  )
}

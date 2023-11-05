import { Stack } from '@mui/material'
import React from 'react'
import SignInForm from '../../components/SignInForm/SignInForm'
import signinImage from '../../images/Finance-leaders-rafiki.png'
import '../signin/signin.css'
export default function Signin() {
  return (
    <section className='signin-page'>
    <img src={signinImage} alt="SignInImage" className='signInImage'/>
    <SignInForm style={{width:"50%"}} />
    </section>
  )
}

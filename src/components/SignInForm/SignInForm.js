import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: formValues.email,
      password: formValues.password,
    };
    axios.post('http://localhost:8000/api/auth/login', data)
      .then(response => {
        // Handle success response
        console.log(response);

        // Save the token in local storage
        localStorage.setItem('access_token', response.data.access_token);
        
        // >> RESET THE INPUTS
        setFormValues({
          email: '',
          password: '',
        })
        window.location.href = '/';
      })
      .catch(error => {
        // Handle error response
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while logging in.Invalid username or password.');
        }
  
      });
  };

  return (
    <form method='post' className='signinFormWraping' onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={7}
      direction="column"
    >
      <Typography fontSize={50} letterSpacing={5} style={{color:"#394452", fontWeight:"500"}} textAlign={"center"}>
        Signin To the <Box display="inline" style={{color:'#026FC2'}}>App</Box>
      </Typography>
    
      <TextField
        id="email"
        type="email"
        label="Email"
        style={{ width: "calc(100% - 100px)" }}
        size="30"
        onChange={(event) =>  setFormValues({...formValues, email: event.target.value})} 
        required
        value={formValues.email}
      />
      <TextField
        id="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        style={{ width: "calc(100% - 100px)"}}
        variant="outlined"
        onChange={(event) =>  setFormValues({...formValues, password: event.target.value})} 
        required
        value={formValues.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        style={{ backgroundColor: "#026FC2",
        width: "170px",
        borderRadius: '10px',
        color:"#FFF",
        fontWeight:"600",
        padding:"10px",
       }}
        variant="outlined"
        type="submit"
      >
        Signin
      </Button>
    </Stack>
    </form>
  );
};

export default SignInForm;


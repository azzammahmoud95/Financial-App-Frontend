import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../AddAdmin/AddAdmin.css'
import  { useState } from 'react';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';

export default function AddAdmin() {
  const [open, setOpen] = React.useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    };
  
    axios.post('http://localhost:8000/api/auth/register', data)
      .then(response => {
        // Handle success response
        console.log(response);

        // >> RESET THE INPUTS
        setFormValues({
          name: '',
          email: '',
          password: '',
        })
        handleClose();
      })
      .catch(error => {
        // Handle error response
        console.error(error);
        if (error.response && error.response.status === 409) {
          alert('Email already taken, please use a different email.');
        } else {
          alert('Something went wrong. Please try to change the email.');
        }
  
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} 
        size="large"
        sx={{
          borderRadius: "6px",
          textTransform: "none",
          padding: "14px 18px",
          width:"100%",
          fontWeight:"600",
        }}
        startIcon={<AddRoundedIcon />}>

        Add New Admin
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{textAlign:"center", fontWeight:"600",color:"#394452"}}>Add New <Box display="inline" style={{color:'#026FC2'}}>Admin</Box></DialogTitle>
        <form action='post' onSubmit={handleSubmit}>
        <DialogContent style={{display:"flex",alignItems:"center",flexDirection:"column",margin:"20px 10px",width:"500px"}}>
          
        <TextField
            autoFocus
            margin="dense"
            id="fullName"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            size="30"
            required  
            onChange={(event) =>  setFormValues({...formValues, name: event.target.value})}     
            value={formValues.name}       
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            size="30"
            required
            onChange={(event) =>  setFormValues({...formValues, email: event.target.value})}   
            value={formValues.email
            }
          />
           <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"} // use the showPassword state to toggle the input type
              fullWidth
              variant="outlined"
              value={formValues.password}
              required
              size="30"    
              onChange={(event) =>  setFormValues({...formValues, password: event.target.value})}             
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
        </DialogContent>
        <DialogActions style={{display:"flex",flexDirection:"row", justifyContent:"space-around",marginBottom:"20px"}}>
        <Button onClick={handleClose} 
        style={{ backgroundColor: "#FFF", width: "160px",borderRadius: '10px',color:"#026FC2",fontWeight:"600" }}  variant="outlined">Cancel</Button>

        <Button type='submit'
        style={{ backgroundColor: "#026FC2", width: "160px",borderRadius: '10px',color:"#FFF",fontWeight:"600" }} variant="outlined">Add Account</Button>

        </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
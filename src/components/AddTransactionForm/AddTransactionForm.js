import * as React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem,TextField, Button,Typography,Box, Tabs, Tab} from '@mui/material';
import { useState, useEffect,useMemo } from 'react';
import { Stack } from '@mui/system';
import axios from 'axios';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AddTransactionForm() {
  const [value, setValue] = useState(0);
  const [typeCode, setTypeCode] = useState('');
  const [currencies,SetCurrencies] = useState([]);
  const [amount, setAmount] = useState(0);
  const [schedule, setSchedule] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // >>>>>>> Select From ComboBoxes

  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [fixedKey, setFixedKey] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleFixedSubmit(event) {
    event.preventDefault();

    // Create an object to store the form data
    const formData = {
      fixed_key_id: selectedTitle,
      schedule: schedule,
      start_date: formatDate(startDate),
      typeCode: typeCode,
      amount: amount,
      currency: selectedCurrency,
      category: selectedCategory,
      description: description,
      currency_id: selectedCurrency,
      category_id: selectedCategory,
    };
  
    // Send the form data to the server
    axios.post('http://localhost:8000/api/fixedtransaction', formData)
      .then((response) => {
        console.log(response.data);
        // Reset the form fields after successful submission
        setSelectedTitle('');
        setSchedule('');
        setStartDate('');
        setTypeCode('');
        setAmount('');
        setSelectedCurrency('');
        setSelectedCategory('');
        setDescription('');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // >>>>>> Submit Recurring Transaction
  const handleRecurringSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: title,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      type_code: typeCode,
      category_id: selectedCategory,
      amount: amount,
      currency_id: selectedCurrency,
      description: description,
    };
  
    axios.post('http://localhost:8000/api/recurrings', data)
      .then(response => {
        // Handle success response
        console.log(response);

        // >> RESET THE INPUTS
        setTitle([])
        setTypeCode('')
        SetCurrencies([])
        setEndDate('')
        setStartDate('')
        setEndDate('')
        setAmount(0);
        setSelectedCategory('');
        setSelectedCurrency('');
        setDescription('');
        
      })
      .catch(error => {
        // Handle error response
        console.error(error);
      });
  };
  
  // >>>>>>> Function to format date
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().slice(0,10);
    return formattedDate;
  };
  
  

//>>>>>>>>>>>>>> Fetching Currency
  useEffect(() => {
    axios.get('http://localhost:8000/api/currency')
      .then(response => {
        SetCurrencies(response.data.currencies);
        console.log(response.data.currencies);
      })
      .catch(error => {
        console.log(error);
      });
  },[]);


//>>>>>>>>>>>>>>>>>>>>> Fetching Categories
  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data.categories);
        console.log(response.data.categories);
      })
      .catch(error => {
        console.log(error);
      });
  },[]);


//>>>>>>>>>>>>>>>>>>>>> Fetching Key
useEffect(() => {
  axios.get('http://localhost:8000/api/key')
    .then(response => {
      setFixedKey(response.data.key);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

//  const key = [
//     {
//       id:"1",
//       name:"azzam",
//       description:"azzam description"
//     },
//     {
//       id:"2",
//       name:"hisham",
//       description:"hisham description"
//     }
//   ]
  // const categories = [
  //   {
  //     id: "1",
  //     name: "habibi",
  //     typeCode: "Incomes"
  //   },
  //   {
  //     id: "2",
  //     name: "azzam",
  //     typeCode: "Expenses"
  //   },
  //   {
  //     id: "3",
  //     name: "xyz",
  //     typeCode: "Incomes"
  //   },
  // ]
  

  return (
    <Box sx={{ width: '100%', backgroundColor:"white", borderRadius:"10px",padding:"10px",border: "1px solid rgba(109, 125, 147, 0.15)",
    boxShadow: "4px 4px 20px -1px rgba(0, 0, 0, 0.1)"}}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Typography style={{ fontWeight: '600', color: '#394452', fontSize: '27px',paddingTop:"6px",paddingLeft:"8px" }}>
      Add New <Box display="inline" style={{ color: '#026FC2' }}>Transaction</Box>
    </Typography>
    <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
      <Tab label="Fixed" {...a11yProps(0)} />
      <Tab label="Recurring" {...a11yProps(1)} />
    </Tabs>
  </Box>


  <TabPanel value={value} index={0} >
    <form action='post' onSubmit={handleFixedSubmit}>
    <Stack spacing={4} >
        <Stack  display="flex" flexDirection="row" justifyContent="space-between">
        {/* <TextField variant='outlined' label="Title" type="text" size="10" required style={{width:"70%"}}/> */}

        <FormControl style={{ width: '70%' }}>
      <InputLabel id="title-select-label">Title</InputLabel>
      <Select
        labelId="title-select-label"
        id="title-select"
        value={selectedTitle}
        label="title"
        onChange={(event) => {
          setSelectedTitle(event.target.value);
          setDescription(
            fixedKey.find((key) => key.id === event.target.value).description
          );
        }}
        required
      >
        {Array.isArray(fixedKey) && fixedKey.map((key) => (
          <MenuItem key={key.id} value={key.id}>
            {key.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

        <FormControl  style={{width:"25%" ,margin:"0"}}>
          <InputLabel id="schedule-select-label" >Schedule</InputLabel>
            <Select style={{margin:"0"}}
              labelId="schedule-select-label"
              id="schedule-select"
              value={schedule}
              label="Schedule"
              onChange={(event) =>{setSchedule(event.target.value)}}
              required >
                  
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
       </FormControl>
       </Stack>

       <Stack  display="flex" flexDirection="row" justifyContent="space-between">
          <TextField type="date" label="Start-Date" value={startDate} onChange={(event) =>setStartDate(event.target.value)} autoFocus required focused style={{width:"70%"}}/>
        <FormControl style={{width:"25%"}}> 
          <InputLabel>TypeCode</InputLabel>
          <Select
            labelId="TypeCode-select-label"
            id="TypeCode-select"
            value={typeCode}
             label="TypeCode"
             required
          onChange={(event) =>{  setTypeCode(event.target.value)}}>
            <MenuItem value="incomes">Income</MenuItem>
            <MenuItem value="expenses">Expenses</MenuItem>
            </Select>
        </FormControl>
        </Stack>

        <Stack  display="flex" flexDirection="row" justifyContent="space-between">
            <TextField required type="number" variant='outlined' value={amount} label='Amount'  onChange={(event) =>{  setAmount(event.target.value)}} inputProps={{steps:10 }} style={{width:"45%"}}/>  { /*set the increment/decrement step to 100*/}
            <FormControl style={{width:"25%"}}> 
             <InputLabel>Currency</InputLabel>
                <Select
                  required
                  labelId="Currency-select-label"
                  id="Currency-select"
                  value={selectedCurrency}
                  label="Currency"
                  onChange={(event) =>{  setSelectedCurrency(event.target.value)}}>
                  {Array.isArray(currencies) && currencies.map((currencies) => (
                  <MenuItem key={currencies.id} value={currencies.id}>
                    {currencies.name}
                  </MenuItem>
                ))}
                  </Select>
            </FormControl>
            <FormControl style={{width:"25%"}}>
            <InputLabel id="categories-select-label">Category</InputLabel>
              <Select
                labelId="categories-select-label"
                id="categories-select"
                value={selectedCategory}
                label="Category"
                onChange={(event) =>{setSelectedCategory(event.target.value)}}
                required
              >
                {Array.isArray(categories) && categories.filter(categories => categories.type_code === typeCode).map((categories) => (
                <MenuItem key={categories.id} value={categories.id}>
                  {categories.name}
                </MenuItem>
              ))}

                </Select>
            </FormControl>
        </Stack>      
            <TextField
              value={description}
              label="Description"
              autoFocus
              variant='outlined'
              multiline
              rows={4}
              rowsMax={8}
              InputProps={{readOnly: true}}
            />   

      <Stack display="flex" flexDirection="row" justifyContent="center">
            <Button 
            type="submit"
            style={{ backgroundColor: "#026FC2",
                    width: "200px",
                    borderRadius: '10px',
                    color:"#FFF",
                    fontWeight:"600",
                    padding:"10px" }}
                    variant="outlined"
                >Save
              </Button>
          </Stack>
             
    </Stack>
    </form>
  </TabPanel>






  <TabPanel value={value} index={1}>
    <form action='post' onSubmit={handleRecurringSubmit}>
  <Stack spacing={3} >
        
        <TextField variant='outlined' value={title} onChange={(event)=>setTitle(event.target.value)}  label="Title" type="text" size="10" required/>
          <Stack display="flex" flexDirection="row" justifyContent="space-between">
          <TextField
              type="date"
              value={startDate}
              onChange={(event) => {
                setStartDate(event.target.value);
                if (event.target.value > endDate) {
                  setEndDate(event.target.value);
                }
              }}
              required
              label="Start-Date"
              autoFocus
              focused
              style={{width:"48%"}}
            />

            <TextField
              type="date"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
                if (event.target.value < startDate) {
                  setStartDate(event.target.value);
                }
              }}
              required
              label="End-Date"
              autoFocus
              focused
              style={{width:"48%"}}
            />
          </Stack>

          <Stack display="flex" flexDirection="row" justifyContent="space-between"> 
        <FormControl sx={{ width:"48%" }}> 
        <InputLabel>TypeCode</InputLabel>
          <Select
            labelId="TypeCode-select-label"
            id="TypeCode-select"
            value={typeCode}
             label="TypeCode"
             required
          onChange={(event) =>{  setTypeCode(event.target.value)}}>
            <MenuItem value="incomes">Income</MenuItem>
            <MenuItem value="expenses">Expenses</MenuItem>
            </Select>
        </FormControl>

        <FormControl style={{width:"48%"}}>
        <InputLabel id="categories-select-label">Category</InputLabel>
              <Select
                labelId="categories-select-label"
                id="categories-select"
                value={selectedCategory}
                label="Category"
                onChange={(event) =>{setSelectedCategory(event.target.value)}}
                required
              >
                {Array.isArray(categories) && categories.filter(categories => categories.type_code === typeCode).map((categories) => (
                <MenuItem key={categories.id} value={categories.id}>
                  {categories.name}
                </MenuItem>
              ))}

                </Select>
          </FormControl>
                </Stack>

          <Stack display="flex" flexDirection="row" justifyContent="space-between">  
                  <TextField type="number" required  variant='outlined' value={amount} label='Amount'  onChange={(event) =>{  setAmount(event.target.value)}} inputProps={{steps:10 }} style={{width:"65%"}}/>  { /*set the increment/decrement step to 100*/}
              <FormControl style={{width:"30%"}}> 
                <InputLabel>Currency</InputLabel>
                <Select
                  required
                  labelId="Currency-select-label"
                  id="Currency-select"
                  value={selectedCurrency}
                  label="Currency"
                  onChange={(event) =>{  setSelectedCurrency(event.target.value)}}>
                  {Array.isArray(currencies) && currencies.map((currencies) => (
                  <MenuItem key={currencies.id} value={currencies.id}>
                    {currencies.name}
                  </MenuItem>
                ))}
                  </Select>
              </FormControl>
           </Stack>  
      
      
    <TextField value={description} required placeholder="Description" label="Description" onChange={(event) =>{  setDescription(event.target.value)}}  variant='outlined' multiline rows={4}  rowsMax={8}/>
         <Stack display="flex"  flexDirection="row" justifyContent="center">
            <Button 
            type="submit"
            style={{ backgroundColor: "#026FC2",
                    width: "200px",
                    borderRadius: '10px',
                    color:"#FFF",
                    fontWeight:"600",
                    padding:"10px" }}
                    variant="outlined"
                >Save</Button>
            </Stack>
      </Stack>
    </form>
      </TabPanel>
    </Box>

    );
  }
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function SelectMenu({handleTimeChange, timeframe}) {
 

  return (
    <FormControl sx={{ m: 1, minWidth: 10 , bgcolor:"white"}}>
      <InputLabel id="timeframe-select-label">Timeframe</InputLabel>
      <Select
        labelId="timeframe-select-label"
        id="timeframe-select"
        value={timeframe}
        label="Timeframe"
        onChange={handleTimeChange} >
            
        <MenuItem value="current">Current</MenuItem>
        <MenuItem value="this_day">Daily</MenuItem>
        <MenuItem value="this_month">Monthly</MenuItem>
        <MenuItem value="this_year">Yearly</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectMenu;

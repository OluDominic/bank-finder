import React from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const StateSelector = ({ states, selectedState, setSelectedState}) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="state-select-label">State</InputLabel>
      <Select
        labelId="state-select-label"
        value={selectedState}
        label="State"
        onChange={(e)=> setSelectedState(e.target.value)}
      >
        <MenuItem value=""><em>-- Select State --</em></MenuItem>
        {states.map((state, id) => (
          <MenuItem key={id} value={state}>{state}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default StateSelector

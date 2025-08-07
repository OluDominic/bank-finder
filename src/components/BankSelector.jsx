import React from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const BankSelector = ({ banks, selectedBank, setSelectedBank}) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="bank-select-label">Bank</InputLabel>
      <Select
        labelId="bank-select-label"
        value={selectedBank}
        label="Bank"
        onChange={(e)=> setSelectedBank(e.target.value)}
      >
        <MenuItem value=""><em>-- Choose Bank --</em></MenuItem>
        {banks.map((bank, id) => (
          <MenuItem key={id} value={bank}>{bank}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default BankSelector

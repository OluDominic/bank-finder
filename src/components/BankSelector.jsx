import React from 'react'

const BankSelector = ({ banks, selectedBank, setSelectedBank}) => {
  return (
    <div>
      <label>Selected Bank</label>
      <select value={selectedBank} onChange={(e)=> setSelectedBank(e.target.value)}>
        <option>-- Choose Bank --</option>
        {banks.map((bank, id) => (
            <option key={id} value={bank}>{bank}</option>
        ))}
      </select>
    </div>
  )
}

export default BankSelector

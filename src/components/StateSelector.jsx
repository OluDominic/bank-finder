import React from 'react'

const StateSelector = ({ states, selectedState, setSelectedState}) => {
  return (
    <div>
      <label>Select State</label>
      <select value={selectedState} onChange={(e)=> setSelectedState(e.target.value)}>
        <option>-- Select State --</option>
        {states.map((state, id) => (
            <option key={id} value={state}>{state}</option>
        ))}
      </select>
    </div>
  )
}

export default StateSelector

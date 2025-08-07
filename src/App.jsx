import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NaijaBanks from 'naija-banks-branches-sortcode';

import './App.css'
import BankSelector from './components/BankSelector';
import StateSelector from './components/StateSelector';
import ResultsTable from './components/ResultsTable';

function App() {
  const [banks, setBanks] = useState([]);
  const [states, setStates] = useState([
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
    'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ]);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [results, setResults] = useState([]);

  useEffect(()=> {
    const allBanks = NaijaBanks.all();
    console.log('allBanks:', allBanks); 
    setBanks(allBanks.map(b => b.bank))
  }, []);

  const handleSearch = () => {
    if (selectedBank && selectedState) {
      const branches = NaijaBanks.getBranchesByBankAndState(selectedBank, selectedState);
      console.log('Found branches:', branches); 
      setResults(branches.branches);
      
    }
  };

  console.log('Bank:', selectedBank, 'State:', selectedState);
  console.log('results: ', results)
  return (
    <div>
      <h1>🇳🇬 Nigerian Bank Finder</h1>
      <div>
        <BankSelector banks={banks} selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
        <StateSelector states={states} selectedState={selectedState} setSelectedState={setSelectedState} />

        <button
          onClick={handleSearch}
          disabled={!selectedBank || !selectedState}
        >
          Search Branches
        </button>
      </div>

      <div>
        <ResultsTable results={results} />
      </div>
    </div>
  )
}

export default App

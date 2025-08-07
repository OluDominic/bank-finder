import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

const ResultsTable = ({ results }) => {
    if (!results || results.length === 0) return null;
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Branch</th>
                <th>Code</th>
                <th>Address</th>
                <th>Copy</th>
            </tr>
        </thead>
        <tbody>
            {results.map((state, i) => (
                <tr key={i}>
                    <td>{state.branch}</td>
                    <td>{state.branchcode}</td>
                    <td>{state.branchaddress}</td>
                    <td>
                        <CopyToClipboard text={state.branchaddress}>
                            <button>
                                Copy Address
                            </button>
                        </CopyToClipboard>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResultsTable;

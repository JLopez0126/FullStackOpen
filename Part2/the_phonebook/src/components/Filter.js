import React from 'react'

const Filter = ({newFilter, setNewFilter}) => {
  return (
    <div>
       <input value={newFilter} onChange={(event) => setNewFilter(event.target.value)} />
    </div>
  )
}

export default Filter
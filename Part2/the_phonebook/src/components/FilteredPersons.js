import React from 'react'
import AllPersons from './AllPersons'

const FilteredPersons = ({filter, persons,removePerson}) => {
  return (
  <AllPersons persons={persons.filter(({name}) => name.toUpperCase().includes(filter.toUpperCase()))}
  removePerson={removePerson}/>
  
  )}

export default FilteredPersons
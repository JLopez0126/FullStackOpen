import React from 'react'

//Displaying Person Table
const AllPersons = ({ persons,removePerson }) => {
    return (
      <table>
        <tbody>
          {persons.map(({ name, phone, id }) =>
           <Person name={name} phone={phone} id={id} removePerson={removePerson} key={name}/>)}
        </tbody>
      </table>
    )
}


//Displaying individual person
const Person = ({name, phone, id ,removePerson }) => {

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td><button onClick={() => removePerson(id)}>delete</button></td>
        </tr>
    )
}

export default AllPersons
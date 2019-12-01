import React, { useState, useEffect } from 'react'
import FilteredPersons from './components/FilteredPersons'
import Filter from './components/Filter'
import noteService from './services/Persons'

const App = (props) => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [notification, setNotification] = useState({ text: "", type: undefined })

  const getPersonByName = name => {
    console.log("asked for", name);
    const result = persons.find(p => p.name.toUpperCase() === name.toUpperCase());
    console.log("found", result);
    return result;
  }


  //Notification message
  const message = (text, type) => {
    setNotification({ text, type })
    setTimeout(() => setNotification({}), 3000)
  }

  const Notification = ({text, type}) => {

    if (type === undefined) {
        return null;
    } else {
        return (
            <div className={type} id="notification">
                {text}
            </div>
        )
    }

}

  //Fetching the db.json 
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


    //Handling Onchange
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
  if(persons.some(person => person.name.toUpperCase() === newName.toUpperCase())) {
  //Updating Number
  const update = window.confirm(`${newName} already exists, update number?`)
  if(!update) return;

  const newPerson = { ...getPersonByName(newName), phone: newPhone };
  setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
  noteService.update(newPerson.id, newPerson)
    .then(() => message(`Updated number of ${newName}`, "success"))
      .catch(() => {
        message(`${newPerson.name} has already been removed`, "error")
        noteService.getAll().then(receivedPersons => setPersons(receivedPersons))
      })
    } else {
      //If Person Not Exists
      const noteObject = {
            name: newName,
            phone: newPhone,
            id: persons.length + 1,
        }
        noteService
        .create(noteObject)
        .then(response => {
          message(`Added ${newName}`, "success");
          setPersons(persons.concat(response))
          setNewName('')
          setNewPhone('')
    })
  }  
}

 //
  const getPersonById = id => {
    return persons.find(p => p.id === id);
  }
  //Delete Person
  const removePerson = id => {
    const NameToRemove = getPersonById(id);
    const confirmed = window.confirm(`Are you sure you want to remove ${NameToRemove.name}?`)
    if (!confirmed) return;

    setPersons(persons.filter(p => p.id !== id));
    noteService.deleteName(id)
      .then(() => message(`Removed ${NameToRemove.name}`, "success"))
      .catch(() => {
        message(`${NameToRemove.name}Name has already been removed `, "error");
        noteService.getAll().then(receivedPersons => setPersons(receivedPersons))
      })
  }


  return (
    <div>
      <h2>PhoneBook</h2>
      <div>
      <Notification text={notification.text} type={notification.type} />
      </div>
      filter shown with : <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h2>Add a New</h2>
      <form onSubmit={addName}>
        <div>
          name:  <input value={newName}
          onChange={handleNameChange} />
          name:  <input value={newPhone}
          onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <FilteredPersons filter={newFilter} persons={persons} removePerson={removePerson}/>
    </div>
  )
}

export default App
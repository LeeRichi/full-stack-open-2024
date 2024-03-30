import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import service from './service'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  // const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [errorFlag, setErrorFlag] = useState(false)

  useEffect(() => {
   service.getAll()
      .then(response =>
      {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) =>
  {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName);
    const id = persons.find(person => person.name === newName)?.id;

    const personObj = {
      name: newName,
      number: newNumber
    }

    if (nameExists)
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        service.update(id, personObj)
          .then(response =>
          {
            console.log('promise fulfilled')
            const updatedPersons = persons.map((person) =>
              person.name === newName ? response.data : person
            );
            setPersons(updatedPersons);
            setMessage(`User has been edited into name: ${newName}, number: ${newNumber}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error('Error occurred while updating data:', error);
            setErrorFlag(true);
            setMessage(`${newName} has already been deleted from the server`)
            setTimeout(() =>
            {
              setErrorFlag(false);
              setMessage(null)
            }, 5000)
          })
      }
    }
    else
    {
      service.create(personObj)
        .then(response =>
        {
          console.log('promise fulfilled')
          setPersons(persons.concat(response.data))
          setMessage(`User has been created, name: ${newName}, number: ${newNumber}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorFlag(true)
          setMessage(error.response.data.error)
          setTimeout(() =>
          {
            setErrorFlag(false);
            setMessage(null);
            setNewName('');
            setNewNumber('');
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNameChange = (event) => 
  {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => 
  {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorFlag={errorFlag} />
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App